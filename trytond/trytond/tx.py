from threading import local

from .pool import Pool
from .transaction import Transaction

_local = local()


def __getattr__(name):
    if name == 'pool':
        try:
            return _local.pool
        except AttributeError:
            _local.pool = Pool()
            return _local.pool
    elif name == 'transaction':
        try:
            return Transaction._local.transactions[-1]
        except IndexError:
            return Transaction()
    else:
        raise AttributeError(name)
