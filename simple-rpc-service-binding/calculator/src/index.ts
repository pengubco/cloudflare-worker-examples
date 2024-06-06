import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {

	async fetch(request: Request): Promise<Response> {
		return new Response("Hello World!")	
	}

	async add(a: number, b: number): Promise<number> {
		return a + b;
	}

	minus(a: number, b: number): number {
		return a - b;
	}
};
