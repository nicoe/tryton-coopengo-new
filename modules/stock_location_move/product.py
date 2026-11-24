# This file is part of Tryton.  The COPYRIGHT file at the top level of
# this repository contains the full copyright notices and license terms.
import datetime

from trytond import tx
from trytond.pool import PoolMeta


class Product(metaclass=PoolMeta):
    __name__ = 'product.product'

    @classmethod
    def products_by_location(cls, *args, **kwargs):
        pool = tx.pool
        Location = pool.get('stock.location')
        context = tx.transaction.context
        forecast_location_move = context.get('forecast_location_move', False)
        if forecast_location_move:
            date = context.get('stock_date_end') or datetime.date.max
            restore = Location.forecast_location_move(date)
        quantities = super().products_by_location(*args, **kwargs)
        if forecast_location_move:
            restore()
        return quantities
