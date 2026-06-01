import { Bot, webhookCallback } from "grammy";
import { Hono } from "hono";

const token = Bun.env.BOT_TOKEN;

if (!token) {
  throw new Error("Missing BOT_TOKEN environment variable");
}

const bot = new Bot(token);
const mapsAppUrlPattern = /^https:\/\/maps\.app\.goo\.gl\/[^\s<>"')]+$/i;

function extractQueryFromLocation(location: string, baseUrl: string): string | null {
  const redirectUrl = new URL(location, baseUrl);
  const queryParams = redirectUrl.search.slice(1).split("&");
  const rawQuery = queryParams.find((param) => param.split("=", 1)[0] === "q");

  if (!rawQuery) {
    return null;
  }

  const value = rawQuery.slice(rawQuery.indexOf("=") + 1);

  return decodeURIComponent(value.replaceAll("+", " "));
}

async function resolveMapsAppQuery(url: string): Promise<string | null> {
  const response = await fetch(url, {
    method: "GET",
    redirect: "manual"
  });

  const location = response.headers.get("location");

  if (!location) {
    return null;
  }

  return extractQueryFromLocation(location, url);
}

bot.command("start", (ctx) => ctx.reply("Send me short Google Maps links or add me to the group"));

bot.on("message:text", async (ctx) => {
  const links = ctx.message.text.match(mapsAppUrlPattern);

  if (!links) {
    return;
  }

  for (const link of links) {
    try {
      const query = await resolveMapsAppQuery(link);

      if (query) {
        await ctx.reply(query, {
          reply_parameters: { message_id: ctx.message.message_id }
        });
      }
    } catch (error) {
      console.error(`Failed to resolve Google Maps link: ${link}`, error);
    }
  }
});

bot.catch((error) => {
  console.error("Bot error:", error);
});

if (process.env.BOT_POLL === '1') {
  bot.start();
  console.log('Bot started in poll mode');
} else {
  const http = new Hono();
  http.get('/healthcheck', c => c.text('OK'));
  http.use('/tg', webhookCallback(bot, 'hono', {
    secretToken: process.env.WEBHOOK_SECRET,
  }));

  const port = parseInt(process.env.HTTP_PORT ?? '8080');
  Bun.serve({
    hostname: '0.0.0.0',
    port,
    fetch: http.fetch,
  });
  console.log(`Listening on 0.0.0.0:${port}`);
}