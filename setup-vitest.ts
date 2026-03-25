import { expect } from 'vitest';

expect.extend({
  toBeOneOf(received: any, items: any[]) {
    const pass = items.includes(received);
    const message = () =>
      `expected ${received} to be contained in array [${items}]`;
    if (pass) {
      return {
        message,
        pass: true
      };
    }
    return {
      message,
      pass: false
    };
  }
});

interface CustomMatchers<R = unknown> {
    toBeOneOf(items: any[]): R;
}

declare module 'vitest' {
    interface Assertion<T = any> extends CustomMatchers<T> { }
    interface AsymmetricMatchersContaining extends CustomMatchers { }
}
