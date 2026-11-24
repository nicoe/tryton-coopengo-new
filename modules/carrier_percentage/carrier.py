# This file is part of Tryton.  The COPYRIGHT file at the top level of
# this repository contains the full copyright notices and license terms.
from decimal import Decimal

from trytond import tx
from trytond.model import fields
from trytond.pool import PoolMeta
from trytond.pyson import Eval


class Carrier(metaclass=PoolMeta):
    __name__ = 'carrier'
    percentage = fields.Numeric(
        "Percentage", digits=(None, 8),
        states={
            'invisible': Eval('carrier_cost_method') != 'percentage',
            },
        help="The percentage applied on the amount to compute the cost.")

    @classmethod
    def __setup__(cls):
        super().__setup__()
        selection = ('percentage', 'Percentage')
        if selection not in cls.carrier_cost_method.selection:
            cls.carrier_cost_method.selection.append(selection)

    def compute_percentage(self, amount, currency_id):
        "Compute price based on a percentage of amount"
        Currency = tx.pool.get('currency.currency')

        price = amount * self.percentage / Decimal(100)
        currency = Currency(currency_id)
        return currency.round(price), currency_id

    def get_sale_price(self):
        price, currency_id = super().get_sale_price()
        if self.carrier_cost_method == 'percentage':
            amount = tx.transaction.context.get('amount', Decimal(0))
            currency_id = tx.transaction.context.get('currency', currency_id)
            if currency_id is not None:
                return self.compute_percentage(amount, currency_id)
        return price, currency_id

    def get_purchase_price(self):
        price, currency_id = super().get_purchase_price()
        if self.carrier_cost_method == 'percentage':
            amount = tx.transaction.context.get('amount', Decimal(0))
            currency_id = tx.transaction.context.get('currency', currency_id)
            if currency_id is not None:
                return self.compute_percentage(amount, currency_id)
        return price, currency_id
