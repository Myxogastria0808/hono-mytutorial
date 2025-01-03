import { Hono } from "hono";

type Bindings = {
  HONO_TEST_BUCKET: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();

app.post("/", async (c) => {
  await c.env.HONO_TEST_BUCKET.createMultipartUpload("Hello");
  return c.text(`Put successfully!`);
});

export default app;
