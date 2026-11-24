# This file is part of Tryton.  The COPYRIGHT file at the top level of
# this repository contains the full copyright notices and license terms.
from trytond import tx
from trytond.pool import PoolMeta


class Product(metaclass=PoolMeta):
    __name__ = 'product.product'

    @classmethod
    def recompute_cost_price(cls, products, start=None):
        pool = tx.pool
        Move = pool.get('stock.move')
        Shipment = pool.get('stock.shipment.drop')
        shipments = set()
        domain = [
            ('unit_price_updated', '=', True),
            cls._domain_moves_cost(),
            ('product', 'in', products),
            ('shipment', 'like', 'stock.shipment.drop,%'),
            ]
        if start:
            domain.append(('effective_date', '>=', start))
        for move in Move.search(domain, order=[]):
            shipments.add(move.shipment)
        shipments = Shipment.browse(list(shipments))
        Shipment.set_cost(shipments)
        super().recompute_cost_price(products, start=start)
