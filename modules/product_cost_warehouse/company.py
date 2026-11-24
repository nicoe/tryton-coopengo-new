# This file is part of Tryton.  The COPYRIGHT file at the top level of
# this repository contains the full copyright notices and license terms.
import copy

from trytond import tx
from trytond.model import fields
from trytond.pool import PoolMeta

from .product import cost_price_warehouse


class Company(metaclass=PoolMeta):
    __name__ = 'company.company'

    cost_price_warehouse = fields.Function(
        copy.deepcopy(cost_price_warehouse), 'get_cost_price_warehouse')

    def get_cost_price_warehouse(self, name, **pattern):
        pool = tx.pool
        Configuration = pool.get('product.configuration')
        config = Configuration(1)
        pattern['company'] = self.id
        return config.get_multivalue('cost_price_warehouse', **pattern)
