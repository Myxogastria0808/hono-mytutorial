import { Hono } from 'hono';
import { html } from 'hono/html';
import { FC, memo } from 'hono/jsx';
import { css, keyframes, Style } from 'hono/css';

const router = new Hono();

type Meta = {
    lang: string;
    title: string;
    metaDescription: string;
    metaKeyword: string;
    ogTitle: string;
    ogDescription: string;
    ogWidth: number;
    ogHeight: number;
    ogImage: string;
    ogType: string;
    ogUrl: string;
};

type Component = {
    children: any;
};

//コンポーネントも使える
const Field = (props: { children: any }) => {
    return (
        <CardField {...props.children}>
            <Card />
            <Card />
            <Card />
        </CardField>
    );
};

const CardField = (props: { children: any }) => {
    return <div>{props.children}</div>;
};

const Card: FC = memo(() => {
    return (
        <>
            <Style />
            <div
                class={css`
                    font-weight: 100;
                    color: green;
                `}
            >
                This is a Card!
            </div>
        </>
    );
});

router.get('/', (c) => {
    const meta: Meta = {
        lang: 'ja',
        title: 'Hono 非公式ファンサイト',
        metaDescription: 'I love Hono!',
        metaKeyword: 'website 非公式ファンサイト',
        ogTitle: 'Hono 非公式ファンサイト',
        ogDescription: 'I love Hono!',
        ogWidth: 500,
        ogHeight: 500,
        ogImage: 'Web APIで取得',
        ogType: 'website',
        ogUrl: 'https://example.com/',
    };
    const card: any = {};
    const globalClass = css`
        :-hono-global {
            html,
            body {
                margin: 0;
                padding: 0;
            }
        }
    `;
    const baseClass = css`
        color: black;
    `;
    const fadeInAnimation = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;
    const titleClass = css`
        ${baseClass}
        animation-name: ${fadeInAnimation};
        animation-duration: 2s;
        font-size: 30px;
        text-align: center;
    `;
    const contentClass = css`
        ${baseClass}
        font-size: 20px;
        text-align: start;
    `;
    return c.html(
        <>
            {html`<!DOCTYPE html>`}
            <html lang={meta.lang}>
                <head>
                    <meta charset="UTF-8" />
                    <title>{meta.title}</title>
                    <meta name="description" content={meta.metaDescription} />
                    <meta name="keyword" content={meta.metaKeyword} />
                    <meta property="og:title" content={meta.ogTitle} />
                    <meta property="og:description" content={meta.ogDescription} />
                    <meta property="og:image:width" content={String(meta.ogWidth)} />
                    <meta property="og:image:height" content={String(meta.ogHeight)} />
                    <meta property="og:image" content={meta.ogImage} />
                    <meta property="og:type" content={meta.ogType} />
                    <meta property="og:url" content={meta.ogUrl} />
                    <Style />
                </head>
                <body>
                    <h1 class={titleClass}>Hello, World!</h1>
                    <Field {...card} />
                </body>
            </html>
        </>
    );
});

export default router;
