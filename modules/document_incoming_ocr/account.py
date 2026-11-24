# This file is part of Tryton.  The COPYRIGHT file at the top level of
# this repository contains the full copyright notices and license terms.

from trytond import tx
from trytond.model import ModelView, Workflow
from trytond.pool import PoolMeta


def send_feedback(invoices):
    pool = tx.pool
    Document = pool.get('document.incoming')
    documents = [d for i in invoices for d in i.documents_incoming]
    with tx.transaction.set_context(queue_batch=1):
        Document.__queue__.ocr_send_feedback(documents)


class Invoice(metaclass=PoolMeta):
    __name__ = 'account.invoice'

    @classmethod
    @ModelView.button
    @Workflow.transition('validated')
    def validate_invoice(cls, invoices):
        super().validate_invoice(invoices)
        send_feedback(invoices)

    @classmethod
    def _post(cls, invoices):
        super()._post(invoices)
        send_feedback(invoices)
