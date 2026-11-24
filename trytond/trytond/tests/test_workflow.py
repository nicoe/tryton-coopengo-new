# This file is part of Tryton.  The COPYRIGHT file at the top level of this
# repository contains the full copyright notices and license terms.

from trytond import tx
from trytond.tests.test_tryton import (
    TestCase, activate_module, with_transaction)


class WorkflowTestCase(TestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        activate_module('tests')

    # TODO add test for Workflow.transition
    @with_transaction()
    def test_transition(self):
        'Test transition'
        pool = tx.pool
        Workflowed = pool.get('test.workflowed')

        wkf, = Workflowed.create([{}])

        Workflowed.run([wkf])
        self.assertEqual(wkf.state, 'running')

        wkf.state = 'end'
        wkf.save()
        Workflowed.run([wkf])
        self.assertEqual(wkf.state, 'end')
