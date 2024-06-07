import { DurableObject } from "cloudflare:workers";
import { v4 as uuidv4 } from 'uuid';

export type Tier = "free" | "paid"

export type AccountSchema = {
	id: string,
	name: string,
	tier: Tier
}

export class Account extends DurableObject {

	async create(name: string, tier: Tier): Promise<string> {
		const accountID: string = uuidv4();
		await this.ctx.storage.put<AccountSchema>(accountID, {
			id: accountID,
			name: name,
			tier: tier,
		})
		let total = (await this.ctx.storage.get<number>("total")) || 0;
    total++;
    await this.ctx.storage.put("total", total);
		return accountID;
	}

	async get(id: string): Promise<AccountSchema | undefined> {
		return await this.ctx.storage.get<AccountSchema>(id)
	}

	async count(): Promise<number> {
		return (await this.ctx.storage.get<number>("total")) || 0;
	}
}
