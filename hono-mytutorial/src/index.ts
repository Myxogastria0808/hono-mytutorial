import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import posts from './blogs/blogs';
import auth from './auth/auth';
import { basicAuth } from 'hono/basic-auth';

//インスタンス化
const app = new Hono();

//pretty jsonというミドルウェア
app.use('*', prettyJSON());

//認証
app.use(
    '/auth/*',
    basicAuth({
        username: 'hono',
        password: 'hello',
    })
);

//モジュール化できる
app.route('/posts', posts);
app.route('/auth', auth);

app.get('/', (c) => {
    return c.text('Hello, Hono!');
});

export default app;
