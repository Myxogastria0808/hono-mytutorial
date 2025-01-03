import { Hono } from 'hono';
import { html } from 'hono/html';
import { FC, memo } from 'hono/jsx';
import { css, keyframes, Style } from 'hono/css';

const router = new Hono();

type Meta = {
    lang: string;
    title: string;
    children?: any;
};
const Layout = (props: Meta) => {
    return (
        <>
            <html lang={props.lang}>
                <head>
                    <meta charset="UTF-8" />
                    <title>{props.title}</title>
                    <meta name="description" content="凪乃ましろ非公式ファンサイトです。" />
                    <meta name="keyword" content="凪乃ましろ 凪乃 ましろ ファンサイト 非公式ファンサイト おやつ" />
                    <meta property="og:description" content="凪乃ましろの非公式ファンサイトです。" />
                    <meta property="og:title" content="凪乃ましろ 非公式ファンサイト" />
                    <meta property="og:image:width" content="500" />
                    <meta property="og:image:height" content="500" />
                    <meta property="og:image" content="https://mashirono-oyatsu.web.app/img/FdfukuTUYAALmN0.webp" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://mashirono-oyatsu.web.app/" />
                </head>
                <body>{props.children}</body>
            </html>
        </>
    );
};

const Hello = () => {
    return (
        <>
            <Style />
            <h1
                class={css`
                    font-size: '30px';
                    color: red;
                `}
            >
                Hello!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            </h1>
        </>
    );
};

const Content = (props: { meta: Meta }) => {
    const Header: FC = memo(() => {
        return (
            <>
                <Style />
                <header
                    class={css`
                        font-weight: 100;
                        color: green;
                    `}
                >
                    Welcome to Hono
                </header>
            </>
        );
    });
    return (
        <Layout {...props.meta}>
            <Header />
            <Hello />
        </Layout>
    );
};

router.get('/', (c) => {
    const props = {
        meta: {
            lang: 'ja',
            title: 'Document',
        },
    };
    return c.html(
        <>
            {html`<!DOCTYPE html>`}
            <Content {...props} />
        </>
    );
});

export default router;
