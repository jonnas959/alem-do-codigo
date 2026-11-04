// Servidor local simples para testar a versão web (sem dependências). Uso: node testar_web.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const root = __dirname;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".wasm": "application/wasm", ".pck": "application/octet-stream", ".png": "image/png", ".json": "application/json", ".css": "text/css" };
http.createServer((req, res) => {
	let file = decodeURIComponent(req.url.split("?")[0]);
	if (file === "/") file = "/index.html";
	const full = path.join(root, file);
	if (!full.startsWith(root) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
		res.writeHead(404); res.end("nao encontrado"); return;
	}
	res.writeHead(200, {
		"Content-Type": types[path.extname(full)] || "application/octet-stream",
		"Cross-Origin-Opener-Policy": "same-origin",
		"Cross-Origin-Embedder-Policy": "require-corp",
	});
	fs.createReadStream(full).pipe(res);
}).listen(8060, () => console.log("Jogo em http://localhost:8060  (Ctrl+C para parar)"));
