import * as http from 'http';
import * as pg from 'pg';

function createListener({
  pool,
}: {
  pool: pg.Pool,
}) {
  return async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const { method, url } = req;
    const client = await pool.connect();

    try {
      await client.query(`
        INSERT INTO logs(method, path)
        VALUES($1, $2)
      `, [method, url]);

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });

      if (method === 'GET') {
        const { rows: data } = await client.query(`
            SELECT method, path, timestamp
            FROM logs
            ORDER BY timestamp DESC
            LIMIT 10
        `);

        const body = JSON.stringify({
          kind: 'list',
          data,
        });

        res.write(body);
      }
    } catch (error) {
      console.error(error);
    } finally {
      client.release();
      res.end();
    }
  };
}

async function start() {
  const pool = new pg.Pool({
    user: 'interview_user',
    database: 'interview_db',
    password: 'interview_password',
  })

  const listener = createListener({ pool });
  const server = http.createServer(listener);
  server.listen(4322)
}

start().catch(e => console.error(e));
