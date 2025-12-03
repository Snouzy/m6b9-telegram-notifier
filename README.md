# Telegram Notifier

Simple, zero-dependency Telegram notification sender for Node.js.

## Installation

```bash
npm install @m6b9/telegram-notifier
```

## Setup

1. Create a Telegram bot via [@BotFather](https://t.me/botfather)
2. Get your chat ID (send a message to your bot, then visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`)
3. Set environment variables:

```bash
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## Usage

### Basic (uses env variables)

```javascript
const { sendTelegramNotification } = require('@m6b9/telegram-notifier');

// Simple message
await sendTelegramNotification('Hello from Node.js!');

// With HTML formatting
await sendTelegramNotification('<b>Error:</b> Something went wrong!');
```

### Advanced (override credentials)

```javascript
const { sendTelegramNotification } = require('@m6b9/telegram-notifier');

await sendTelegramNotification('Custom message', {
  botToken: 'custom_token',
  chatId: 'custom_chat_id'
});
```

### Error handling

```javascript
try {
  const result = await sendTelegramNotification('Test message');
  console.log(result); // { success: true, message: 'Message sent successfully' }
} catch (error) {
  console.error('Failed:', error.message);
}
```

## API

### `sendTelegramNotification(message, options)`

**Parameters:**
- `message` (string, required): Message to send (supports HTML tags: `<b>`, `<i>`, `<code>`)
- `options` (object, optional):
  - `botToken` (string): Override `TELEGRAM_BOT_TOKEN` env variable
  - `chatId` (string): Override `TELEGRAM_CHAT_ID` env variable

**Returns:** `Promise<{success: boolean, message: string}>`

**Throws:** Error if required params are missing or request fails

## Why no dependencies?

Uses native Node.js `https` module for maximum reliability and minimal footprint.

## License

MIT
