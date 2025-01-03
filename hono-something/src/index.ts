import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import SampleComponent from './meta/index.jsx';
import HelloComponent from './meta/hello.jsx';
import CssComponent from './meta/css.js';
import GoodComponent from './meta/good.js';

const app = new Hono();

//pretty jsonというミドルウェア
app.use('*', prettyJSON());

app.route('/component', SampleComponent);
app.route('/hello', HelloComponent);
app.route('/css', CssComponent);
app.route('/good', GoodComponent);
app.get('/', (c) => {
    return c.text('Hello Hono!');
});

export default app;
