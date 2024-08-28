/**
 * AssertionConcern implement IAssert for object assertion
 */
import { IAssertion } from './interface/assertion.interface'
import {
    notStrictEqual,
    ok,
    strictEqual,
} from 'assert'
import exp = require('constants')

export class AssertionConcern implements IAssertion {
    assertEqual(actual: any, expect: any, message?: string): void {
        strictEqual(actual, expect, message)
    }

    assertFalse(value: boolean, message?: string): void {
        ok(!value, message)
    }

    assertNotEqual(actual: any, expect: any, message?: string): void {
        notStrictEqual(actual, expect, message)
    }

    assertTrue(value: boolean, message?: string): void {
        ok(!!value, message)
    }

}
