import { config } from 'dotenv';
import express from "express";
import { Client } from "pg";

const { parsed } = config();

const PORT = parsed?.PORT || 3000;

const client = new Client({
  password: "postgres",
  user: "postgres",
  host: "postgres",
});

const app = express();

app.get("/ping", async (req, res) => {
  const database = await client
    .query("SELECT 1 + 1")
    .then(() => "up")
    .catch(() => "down");

  res.send({
    environment: parsed?.NODE_ENV,
    database
  });
});

(async () => {
  await client.connect();

  app.listen(PORT, () => {
    console.log(`Started at http://localhost:${PORT}`);
  });
})();