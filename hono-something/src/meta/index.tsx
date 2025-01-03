import { Hono } from 'hono';
import { FC, Fragment } from 'hono/jsx';
import { css, keyframes, Style } from 'hono/css';

const router = new Hono();

const Root: FC = (props) => {
    return (
        // Fragmenじゃなくても、<></>でよい
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
            </head>
            <body>{props.children}</body>
        </html>
    );
};

const CardField: FC = (props) => {
    return (
        //<></>でも<Fragment></Fragment>でもよい
        <Fragment>
            <h3>Hello, World!</h3>
            {props.children}
        </Fragment>
    );
};

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

const Card: FC<{ message: string[] }> = (props: { message: string[] }) => {
    return (
        <Root>
            <CardField>
                {/* <Style>{css`
                    @keyframes nyoki {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }
                    .hello {
                        animation-name: nyoki;
                        animation-duration: 2s;
                        color: black;
                        font-size: 30px;
                        text-align: center;
                    }
                `}</Style> */}
                <h3 class={titleClass}>Text!!!!!!!!!!!!!!!</h3>
                <ul>
                    {props.message.map((msg, i) => {
                        return <li key={i}>{msg}</li>;
                    })}
                </ul>
            </CardField>
        </Root>
    );
};

router.get('/', (c) => {
    const msg = ['Good Morning', 'good Evening', 'Good Night'];
    return c.html(<Card message={msg} />);
});

export default router;
