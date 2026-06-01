import { Bot } from "grammy";

const token = process.env.BOT_TOKEN;
const secret = process.env.WEBHOOK_SECRET;

if (!token) {
  throw new Error("Missing BOT_TOKEN environment variable");
}
if (!secret) {
  throw new Error("Missing WEBHOOK_SECRET environment variable");
}

const bot = new Bot(token);
if (process.argv.length != 3) {
    console.log('Usage: bun ./set-webhook.mjs <url>');
}
await bot.api.setWebhook(process.argv[2], {
    secret_token: secret,
});
console.log('Done!');
