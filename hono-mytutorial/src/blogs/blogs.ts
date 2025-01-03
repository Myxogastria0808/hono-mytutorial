import { Hono } from 'hono';

//インスタンス化
const app = new Hono();

type Blog = {
    id: string;
    title: string;
    content: string;
};

let blogPosts: Blog[] = [
    {
        id: '1',
        title: 'Blog_1',
        content: 'Blog_1 Posts',
    },
    {
        id: '2',
        title: 'Blog_2',
        content: 'Blog_2 Posts',
    },
    {
        id: '3',
        title: 'Blog_3',
        content: 'Blog_3 Posts',
    },
];

app.get('/', (c) =>
    c.json({
        posts: blogPosts,
    })
);

//パスパラメータ
app.get('/:id', (c) => {
    const id = c.req.param('id');
    const post = blogPosts.find((p) => p.id === id);

    if (post) {
        return c.json(post);
    } else {
        return c.json({ 'Bad Request': 'Not found this page' }, 404);
    }
});

app.post('/', async (c) => {
    const { title, content } = await c.req.json<{ title: string; content: string }>();
    const newPost = { id: String(blogPosts.length + 1), title, content };
    blogPosts = [...blogPosts, newPost];
    return c.json(newPost, 201);
});

app.put('/:id', async (c) => {
    const id = c.req.param('id');
    const index = blogPosts.findIndex((p) => p.id === id);

    if (index === -1) {
        return c.json({ 'bad Request': 'Post not found' }, 404);
    }

    const { title, content } = await c.req.json();
    blogPosts[index] = { ...blogPosts[index], title, content };

    return c.json(blogPosts[index]);
});

app.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const index = blogPosts.findIndex((p) => p.id === id);

    if (index === -1) {
        return c.json({ 'bad Request': 'Post not found' }, 404);
    }

    blogPosts = blogPosts.filter((p) => p.id !== id);

    return c.json({ Message: 'blogPost deleted' });
});

export default app;
