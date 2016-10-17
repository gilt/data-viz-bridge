import bodyParser from 'koa-bodyparser';
import colors from 'colors';
import cors from 'koa-cors';
import Koa from 'koa';
import routes from './routes';
import serve from 'koa-static';
import sockets from './sockets';

const app = new Koa(),
  socket = sockets(app),
  router = routes(socket);

app.use(cors());
app.use(bodyParser());
app.use(serve(`${__dirname}/public`));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(80, () => {
  console.log('Server running'.green + ' at ' + 'http://localhost:'.grey + '80'.blue);
});

export default app;
