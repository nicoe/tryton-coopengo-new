# This file is part of Tryton.  The COPYRIGHT file at the top level of
# this repository contains the full copyright notices and license terms.
from trytond import tx
from trytond.pool import PoolMeta


class ActWindow(metaclass=PoolMeta):
    __name__ = 'ir.action.act_window'

    def get_domains(self, name):
        domains = super().get_domains(name)
        if self.res_model == 'project.work':
            pool = tx.pool
            WorkStatus = pool.get('project.work.status')
            domains = WorkStatus.get_window_domains(self)
        return domains
