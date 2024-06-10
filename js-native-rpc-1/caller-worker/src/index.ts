import CalculatorService from '../../calculator/src/index'

export interface Env {
	CALCULATOR: Service<CalculatorService>
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let url = new URL(request.url)
		console.log(url.pathname)
		if (url.pathname == "/add") {
			let result = await env.CALCULATOR.add(1,2);	
			return new Response(`add ${result}`);
		} else if (url.pathname == "/minus") {
			let result = await env.CALCULATOR.minus(1,2);
			return new Response(`minus ${result}`);
		} else {
			return new Response("invalid")
		}
	},
};
