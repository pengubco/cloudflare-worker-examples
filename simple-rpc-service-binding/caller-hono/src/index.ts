import { Hono } from 'hono'

type Bindings = {
  CALCULATOR: Service
}

const app = new Hono<{
  Bindings: Bindings
}>()

app.get('/:action', async (c) => {
  let action = c.req.param('action')
  if (action == 'add') {
    let result = await c.env.CALCULATOR.add(1,2);
    return new Response(`add ${result}`);
  } else if (action == 'minus') {
    let result = await c.env.CALCULATOR.minus(1,2);
    return new Response(`minus ${result}`);
  } else {
    return c.text('invalid')
  }
})

export default app
