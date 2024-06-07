import { Hono } from "hono";
import { Account } from "./account";
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

export { Account };

type Bindings = {
	ACCOUNTS_DO: DurableObjectNamespace<Account>,
}

const app = new Hono<{
	Bindings: Bindings
}>();

const accountPostSchema = z.object({
	name: z.string(),
	tier: z.enum(['free', 'paid']),
})

app.post('/accounts',
	zValidator('json', accountPostSchema), async (c) => {
		let { name, tier } = c.req.valid('json');
		let id = c.env.ACCOUNTS_DO.idFromName('accounts')
		let stub = c.env.ACCOUNTS_DO.get(id)
		let accountID = await stub.create(name, tier)
		return c.json({
			id: accountID,
			name: name,
			tier: tier,
		});
	})

app.get('/accounts/:id',
	zValidator('param', z.object({
		id: z.string().uuid()
	})), async (c) => {
		let {id} = c.req.valid('param')
		let doID = c.env.ACCOUNTS_DO.idFromName('accounts')
		let stub = c.env.ACCOUNTS_DO.get(doID);
		let account = await stub.get(id)
		return c.json(account)
	})

app.get('/accounts', 
	zValidator('query', z.object({
		count: z.enum(['true', 'false'])
	})), async (c) => {
		let {count} = c.req.valid('query')
		if (!count) {
			return c.json({});
		}
		let doID = c.env.ACCOUNTS_DO.idFromName('accounts')
		let stub = c.env.ACCOUNTS_DO.get(doID)
		let total = await stub.count()
		return c.json({
			count: total
		})
	}, 
)
	
export default app;
