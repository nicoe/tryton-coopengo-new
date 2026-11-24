# This file is part of Tryton.  The COPYRIGHT file at the top level of
# this repository contains the full copyright notices and license terms.
from trytond import tx
from trytond.pool import PoolMeta


class Party(metaclass=PoolMeta):
    __name__ = 'party.party'

    @property
    def account_payable_used(self):
        pool = tx.pool
        AccountRule = pool.get('account.account.rule')
        account = super().account_payable_used
        with tx.transaction.set_context(account_type='payable'):
            account = AccountRule.apply(account)
        return account

    @property
    def account_receivable_used(self):
        pool = tx.pool
        AccountRule = pool.get('account.account.rule')
        account = super().account_receivable_used
        with tx.transaction.set_context(account_type='receivable'):
            account = AccountRule.apply(account)
        return account
