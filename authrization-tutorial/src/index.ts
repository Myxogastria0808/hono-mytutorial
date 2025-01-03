import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { basicAuth } from "hono/basic-auth";

const app = new Hono();

//** Bearer認証 **//
const token = "hoge";

app.use("/bearer/*", bearerAuth({ token }));

app.get("/bearer/hello", (c) => {
  return c.json({ auth: "Authorized!", message: "Hello, Hono!" }, 200);
});

//特定のルートとメソッドに制限を掛ける
app.get("/independent-bearer", bearerAuth({ token }), (c) => {
  return c.json({ auth: "Authorized!" }, 200);
});

//** Basic認証 **//
app.use(
  "/basic/*",
  basicAuth({
    username: "hoge",
    password: "hogehoge",
  })
);

app.get("/basic/hello", (c) => {
  return c.json({ auth: "Authorized!", message: "Hello, Hono!" }, 200);
});

//特定のルートとメソッドに制限を掛ける
app.get(
  "/independent-basic",
  basicAuth({ username: "hoge", password: "hogehoge" }),
  (c) => {
    return c.json({ auth: "Authorized!" }, 200);
  }
);

export default app;
