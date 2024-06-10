import { WorkerEntrypoint } from "cloudflare:workers";
import { Hono } from "hono";

const app = new Hono<{}>()

app.get("/hello", async (c) => {
	return c.json("hello from Hono!")
})

export default class extends WorkerEntrypoint {

	async fetch(request: Request): Promise<Response> {
		return app.fetch(request);	
	}

	async add(a: number, b: number): Promise<number> {
		console.log("calculator-hono add");
		return a + b;
	}

	minus(a: number, b: number): number {
		console.log("calculator-hono minus");
		return a - b;
	}
};

