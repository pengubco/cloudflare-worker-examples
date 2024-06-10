
A simple example of [JS native RPC](https://developers.cloudflare.com/workers/runtime-apis/rpc/). 
See the introduction blog [We've added JavaScript-native RPC to Cloudflare Workers](https://blog.cloudflare.com/javascript-native-rpc/). 

There are four folders, each containing a worker. 
- calculator. A calculator service exposes `add` and `minus`. 
- calculator-hono. Same functionality as calculator, but integrated with Hono. 
- caller-worker. A worker that proxy /add and /minus to calculator.  
- caller-hono. Same functionalities as caller-worker, but integrated with Hono. 

To run locally
```sh
cd calculator
npm run dev

cd caller-worker
npm run dev

# assume the port of the caller-worker is 37691
curl http://localhost:37691/add   # you should see "add 3".
curl http://localhost:37691/minus   # you should see "minus -1".

cd caller-hono
npm run dev
```

Note:
1. If you deploy those workers to your account, make sure to change the worker name, e.g. 
   `calculator-yellow-snow-a48d` to something people don't know. Otherwise, hackers may 
	 guess your workers.dev domain and DDOS your worker.  
2. To test calculator-hono, change the service bindings of caller-worker and caller-hono.
3. Start the RPC server (calculator), then the RPC client (caller-worker).
4. In local dev, if you find service bindings not working and cannot explain why. try stop 
   all workers and start them again. 
