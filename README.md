# gmapslinkbot

Telegram bot that watches text messages for `https://maps.app.goo.gl/` links, reads the first redirect without following it, extracts the `q` search parameter from the `Location` header, replaces `+` with spaces, and replies to the original message.

## Setup

```sh
bun install
cp .env.example .env
```

Set `BOT_TOKEN` in `.env`, then run:

```sh
bun run start
```
