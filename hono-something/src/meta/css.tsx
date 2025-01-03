import { Hono } from 'hono';
import { css, keyframes, Style } from 'hono/css';

const router = new Hono();

router.get('/', (c) => {
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
        <html>
            <head>
                <Style />
            </head>
            <body class={globalClass}>
                <h1 class={titleClass}>Hello, World</h1>
                <p class={contentClass}>Coooooooool!!!!!!!!!!!!</p>
            </body>
        </html>
    );
});

export default router;
