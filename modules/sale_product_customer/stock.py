# This file is part of Tryton.  The COPYRIGHT file at the top level of
# this repository contains the full copyright notices and license terms.

from trytond import tx
from trytond.pool import PoolMeta
from trytond.tools import cached_property


class Move(metaclass=PoolMeta):
    __name__ = 'stock.move'

    @cached_property
    def product_name(self):
        pool = tx.pool
        SaleLine = pool.get('sale.line')
        name = super().product_name
        if (isinstance(self.origin, SaleLine)
                and self.origin.product_customer):
            name = self.origin.product_customer.rec_name
        return name
