const express = require("express");
const app = express();
const http = require("http");
const https = require("https");

const next = require("next");
const dev = process.env.NODE_ENV == "production";
const appNext = next({dev});
const handle = appNext.getRequestHandler();

appNext.prepare().then(()=>{
	app.get("*", (req, res)=>{
		return handle(req, res);
	})

	//const httpServer = http.createServer(app);
	//const httpsServer = https.createServer(app);
	app.listen(5000, ()=>console.log("> App on port 5000"));
	//httpServer.listen(5000, ()=>console.log("> Http on port 5000"));
	//httpsServer.listen(5001, ()=>console.log("> Https on port 5001"));
})
