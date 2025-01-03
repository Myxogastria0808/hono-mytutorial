import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";

const app = new Hono();

app.get("/", (c) => {
  //シンプルなクッキー
  setCookie(c, "normal-cookie", "normal-value", {
    path: "/",
    secure: true,
    domain: "127.0.0.1",
    httpOnly: false,
    maxAge: 1024,
    expires: new Date(Date.UTC(2024, 3, 22, 12, 0, 0, 0)),
    sameSite: "Strict",
  });
  //接頭辞をつけたクッキー
  setCookie(c, "prefix-cookie", "prefix-value", {
    path: "/",
    secure: true,
    domain: "127.0.0.1",
    httpOnly: false,
    maxAge: 1024,
    expires: new Date(Date.UTC(2024, 3, 22, 12, 0, 0, 0)),
    sameSite: "Strict",
    //__Secure-という接頭辞が付く
    //__Host-にしたい場合は、prefix: 'host'にすればよい
    prefix: "secure",
  });
  //HttpOnlyの属性をつけたもの
  setCookie(c, "httpOnly-cookie", "httpOnly-value", {
    path: "/",
    secure: true,
    domain: "127.0.0.1",
    httpOnly: true,
    maxAge: 1024,
    expires: new Date(Date.UTC(2024, 3, 22, 12, 0, 0, 0)),
    sameSite: "Strict",
    prefix: "secure",
  });
  return c.text("Hello Hono!");
});

app.get("/cookie", (c) => {
  //シンプルなクッキー
  const getNormal = getCookie(c, "normal-cookie");
  console.log(`cookie_value: ${getNormal}`);
  //接頭辞をつけたクッキー
  const getPrefix = getCookie(c, "prefix-cookie", "secure");
  console.log(`cookie_value: ${getPrefix}`);
  //HttpOnlyの属性をつけたもの
  const getHttpOnly = getCookie(c, "httpOnly-cookie");
  console.log(`cookie_value: ${getHttpOnly}`);
  return c.text("Get cookie data!");
});

const port = 8000;
console.log(`Server is running: http://127.0.0.1:${port}`);

serve({
  fetch: app.fetch,
  port,
});
