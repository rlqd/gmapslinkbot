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
