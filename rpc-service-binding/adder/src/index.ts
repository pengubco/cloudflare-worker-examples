import { WorkerEntrypoint } from "cloudflare:workers";

interface Env{}


export default class extends WorkerEntrypoint {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response('Hello World!');
	}

	async add(a: number, b: number): Promise<number> {
		return a + b;
	}
};
