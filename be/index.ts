import * as http from 'http';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  const { method, url } = req;
  console.log(method, url);

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  if (method === 'GET') {
    res.write(JSON.stringify({ kind: 'noop' }));
  }

  res.end();
});

server.listen(4322);
