const http = require('http');
const url = require('url');
const fs = require('fs');
const port = 5200;

const server = http.createServer((req, res) => {
    // Obtem o caminho da URL
    const q = url.parse(req.url);
    let pagina = q.pathname.substring(1);

    // Aponta url inicial para o index.html
    pagina = pagina === '' ? 'index.html' : pagina;

    // Verifica a extensão do arquivo
    if (!pagina.endsWith('.html')) {
        pagina += '.html';
    }

    console.log(pagina);

    if (fs.existsSync(pagina)) { // Verifica se o arquivo existe
        fs.readFile(pagina, function (err, data) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Erro interno.');
                return res.end();
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    } else {
        fs.readFile('404.html', function (err, data) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Erro interno.');
                return res.end();
            }
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
});

server.listen(port, () => {
    console.log(`Servidor rodando http://localhost:${port}`);
});
