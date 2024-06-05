


export interface Env {
	ADDER: Service
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let sum: number = await env.ADDER.add(1,2);	
		return new Response(`Hello World! ${sum}`);
	},
};
