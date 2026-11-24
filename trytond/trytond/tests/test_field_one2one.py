# This file is part of Tryton.  The COPYRIGHT file at the top level of
# this repository contains the full copyright notices and license terms.

import re

from trytond import tx
from trytond.model.exceptions import (
    DomainValidationError, RequiredValidationError, SQLConstraintError)
from trytond.tests.test_tryton import (
    TestCase, activate_module, with_transaction)


class FieldOne2OneTestCase(TestCase):
    "Test Field One2One"

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        activate_module('tests')

    @with_transaction()
    def test_create_id(self):
        "Test create one2one with id"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one')
        target, = Target.create([{}])

        one2one, = One2One.create([{
                    'one2one': target.id,
                    }])

        self.assertEqual(one2one.one2one, target)

    @with_transaction()
    def test_create_instance(self):
        "Test create one2one with instance"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one')
        target, = Target.create([{}])

        one2one, = One2One.create([{
                    'one2one': target,
                    }])

        self.assertEqual(one2one.one2one, target)

    @with_transaction()
    def test_create_with_default(self):
        "Test create one2one with instance"
        pool = tx.pool
        One2One = pool.get('test.one2one')

        one2one, = One2One.create([{}])

        self.assertEqual(one2one.one2one, None)

    @with_transaction()
    def test_create_duplicate(self):
        "Test create one2one duplicate"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one')
        target, = Target.create([{}])
        One2One.create([{
                    'one2one': target,
                    }])

        with self.assertRaises(SQLConstraintError):
            One2One.create([{
                        'one2one': target,
                        }])

    @with_transaction()
    def test_create_required_with_value(self):
        "Test create one2one required with value"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one_required')
        target, = Target.create([{}])

        one2one, = One2One.create([{
                    'one2one': target.id,
                    }])

        self.assertEqual(one2one.one2one, target)

    @with_transaction()
    def test_create_required_without_value(self):
        "Test create one2one required without value"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one_required')
        target, = Target.create([{}])

        with self.assertRaises(RequiredValidationError):
            One2One.create([{}])

    @with_transaction()
    def test_create_with_domain_valid(self):
        "Test create one2one with domain valid"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one_domain')
        target, = Target.create([{
                    'name': "domain",
                    }])

        one2one, = One2One.create([{
                    'one2one': target.id,
                    }])

        self.assertEqual(one2one.one2one, target)

    @with_transaction()
    def test_create_with_domain_invalid(self):
        "Test create one2one with domain invalid"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one_domain')
        target, = Target.create([{
                    'name': "invalid domain",
                    }])

        with self.assertRaisesRegex(
                DomainValidationError,
                'The value "%s" for field "One2One" '
                'in record ".*" of "One2One Domain"' %
                re.escape(target.rec_name)):
            One2One.create([{
                        'one2one': target.id,
                        }])

    @with_transaction()
    def test_search_equals(self):
        "Test search one2one equals"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one')
        target, = Target.create([{'name': "Target"}])
        one2one, = One2One.create([{
                    'one2one': target,
                    }])

        one2ones = One2One.search([
                ('one2one.rec_name', '=', "Target"),
                ])

        self.assertListEqual(one2ones, [one2one])

    @with_transaction()
    def test_search_non_equals(self):
        "Test search one2one non equals"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one')
        target, = Target.create([{'name': "Target"}])
        one2one, = One2One.create([{
                    'one2one': target,
                    }])

        one2ones = One2One.search([
                ('one2one.rec_name', '!=', "Target"),
                ])

        self.assertListEqual(one2ones, [])

    @with_transaction()
    def test_search_equals_none(self):
        "Test search one2one equals None"
        pool = tx.pool
        One2One = pool.get('test.one2one')
        one2one, = One2One.create([{}])

        one2ones = One2One.search([
                ('one2one', '=', None),
                ])

        self.assertListEqual(one2ones, [one2one])

    @with_transaction()
    def test_search_non_equals_none(self):
        "Test search one2one non equals None"
        pool = tx.pool
        One2One = pool.get('test.one2one')
        one2one, = One2One.create([{}])

        one2ones = One2One.search([
                ('one2one', '!=', None),
                ])

        self.assertListEqual(one2ones, [])

    @with_transaction()
    def test_search_in(self):
        "Test search one2one in"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one')
        target, = Target.create([{'name': "Target"}])
        one2one, = One2One.create([{
                    'one2one': target,
                    }])

        one2ones = One2One.search([
                ('one2one', 'in', [target.id]),
                ])

        self.assertListEqual(one2ones, [one2one])

    @with_transaction()
    def test_search_not_in(self):
        "Test search one2one not in"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one')
        target, = Target.create([{'name': "Target"}])
        one2one, = One2One.create([{
                    'one2one': target,
                    }])

        one2ones = One2One.search([
                ('one2one', 'not in', [target.id]),
                ])

        self.assertListEqual(one2ones, [])

    @with_transaction()
    def test_search_in_none(self):
        "Test search one2one in [None]"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one')
        target, = Target.create([{'name': "Target"}])
        one2one, = One2One.create([{
                    'one2one': target,
                    }])

        one2ones = One2One.search([
                ('one2one', 'in', [None]),
                ])

        self.assertListEqual(one2ones, [])

    @with_transaction()
    def test_search_not_in_none(self):
        "Test search one2one not in [None]"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one')
        target, = Target.create([{'name': "Target"}])
        one2one, = One2One.create([{
                    'one2one': target,
                    }])

        one2ones = One2One.search([
                ('one2one', 'not in', [None]),
                ])

        self.assertListEqual(one2ones, [one2one])

    @with_transaction()
    def test_search_join(self):
        "Test search by one2one join"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one')
        target, = Target.create([{'name': "Target"}])
        one2one, = One2One.create([{
                    'one2one': target,
                    }])

        one2ones = One2One.search([
                ('one2one.name', '=', "Target"),
                ])

        self.assertListEqual(one2ones, [one2one])

    @with_transaction()
    def test_write_integer(self):
        "Test write one2one integer"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one')
        target, = Target.create([{}])
        one2one, = One2One.create([{}])

        One2One.write([one2one], {
                'one2one': target.id,
                })

        self.assertEqual(one2one.one2one, target)

    @with_transaction()
    def test_write_none(self):
        "Test write one2one None"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one')
        target, = Target.create([{}])
        one2one, = One2One.create([{
                    'one2one': target.id,
                    }])

        One2One.write([one2one], {
                'one2one': None,
                })

        self.assertEqual(one2one.one2one, None)

    @with_transaction()
    def test_write_duplicate(self):
        "Test write one2one duplicate"
        pool = tx.pool
        Target = pool.get('test.one2one.target')
        One2One = pool.get('test.one2one')
        target, = Target.create([{}])
        one2one1, one2one2 = One2One.create([{
                    'one2one': target,
                    }, {}])

        with self.assertRaises(SQLConstraintError):
            One2One.write([one2one2], {
                    'one2one': target.id,
                    })

    @with_transaction()
    def test_set_instance(self):
        "Test set instance"
        pool = tx.pool
        One2One = pool.get('test.one2one')
        Target = pool.get('test.one2one.target')

        record = One2One()
        record.one2one = target = Target()

        self.assertIs(record.one2one, target)

    @with_transaction()
    def test_set_dict(self):
        "Test set dictionary"
        pool = tx.pool
        One2One = pool.get('test.one2one')
        Target = pool.get('test.one2one.target')

        record = One2One()
        record.one2one = {'name': "Test"}

        self.assertIsInstance(record.one2one, Target)
        self.assertEqual(record.one2one.name, "Test")

    @with_transaction()
    def test_set_integer(self):
        "Test set integer"
        pool = tx.pool
        One2One = pool.get('test.one2one')
        Target = pool.get('test.one2one.target')

        target = Target(name="Test")
        target.save()
        record = One2One()
        record.one2one = target.id

        self.assertIsInstance(record.one2one, Target)
        self.assertEqual(record.one2one.name, "Test")

    @with_transaction()
    def test_context_attribute(self):
        "Test context on one2one attribute"
        pool = tx.pool
        One2One = pool.get('test.one2one_context')
        Target = pool.get('test.one2one_context.target')

        target, = Target.create([{}])
        record, = One2One.create([{
                    'one2one': target.id,
                    }])

        self.assertEqual(record.one2one.context, 'foo')

    @with_transaction()
    def test_context_read(self):
        "Test context on one2one read"
        pool = tx.pool
        One2One = pool.get('test.one2one_context')
        Target = pool.get('test.one2one_context.target')

        target, = Target.create([{}])
        record, = One2One.create([{
                    'one2one': target.id,
                    }])
        data, = One2One.read([record.id], ['one2one.context'])

        self.assertEqual(data['one2one.']['context'], 'foo')

    @with_transaction()
    def test_context_set(self):
        "Test context on one2one set"
        pool = tx.pool
        One2One = pool.get('test.one2one_context')
        Target = pool.get('test.one2one_context.target')

        target, = Target.create([{}])
        record = One2One(one2one=target.id)

        self.assertEqual(record.one2one.context, 'foo')
