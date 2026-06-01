# Google Maps Link Bot

Telegram bot that watches for `https://maps.app.goo.gl/` links and replies with a place name.

## Why?

Google Maps on iOS only share the short link without a place name.
Telegram doesn't generate previews for them.

This makes sharing more than 1 link frustrating and impossible to find it later in the history by place name.

## Setup

```sh
bun install
cp .env.example .env
```

Adjust `.env`, then run:

```sh
bun run dev
```

## Docker

This bot can run in a docker container. Dockerfile included.

## Webhooks

Set `BOT_POLL=0` and `WEBHOOK_SECRET` to something random and webhooks will be used instead of long polling.

Webhook endpoint is served under `http://0.0.0.0:8080/tg`.

See for more details: https://grammy.dev/guide/deployment-types#how-to-use-webhooks
