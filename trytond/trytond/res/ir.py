# This file is part of Tryton.  The COPYRIGHT file at the top level of
# this repository contains the full copyright notices and license terms.

from trytond import tx
from trytond.pool import PoolMeta


class Rule(metaclass=PoolMeta):
    __name__ = 'ir.rule'

    @classmethod
    def _get_context(cls, model_name):
        context = super()._get_context(model_name)
        if model_name in {
                'res.user.warning',
                'res.user.application',
                'res.notification',
                }:
            context['user_id'] = tx.transaction.user
        return context

    @classmethod
    def _get_cache_key(cls, model_names):
        key = super()._get_cache_key(model_names)
        if model_names & {
                'res.user.warning',
                'res.user.application',
                'res.notification',
                }:
            key = (*key, tx.transaction.user)
        return key
