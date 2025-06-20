import { test } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../helper.js'

test('mock route', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/v1/mock',
    method: "POST",
    body: {
      qty: 2
    }
  })
  assert.deepStrictEqual(JSON.parse(res.payload), [ 0, 1 ]);
});
