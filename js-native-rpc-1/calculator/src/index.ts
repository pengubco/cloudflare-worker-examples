import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {

	// A dummy fetch handler is required to deploy in Cloudflare Worker. Missing it would cause
	// following error. 
	// The uploaded script has no registered event handlers. [code: 10068]
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
