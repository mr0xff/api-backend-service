import { test } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../helper.js'

test('ping route', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/v1/ping'
  })
  assert.deepStrictEqual(JSON.parse(res.payload), { icmp: "pong" })
});
