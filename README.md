# Telegram Notifier

Simple, zero-dependency TypeScript library for sending Telegram notifications via bot API.

## Features

- ✅ **Zero runtime dependencies** - uses native Node.js `https` module
- 🔒 **TypeScript native** - full type safety and IntelliSense support
- 📦 **Lightweight** - minimal footprint
- 🎨 **HTML formatting** - supports `<b>`, `<i>`, `<code>` tags
- ⚡ **Simple API** - one function to send notifications

## Installation

```bash
npm install @m6b9/telegram-notifier
```

## Quick Setup

### 1. Get your Telegram credentials

**Bot Token:**
- Talk to [@BotFather](https://t.me/BotFather) on Telegram
- Send `/newbot` to create a new bot
- Copy the token (format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

**Chat ID:**
- **For personal chat:**
  - **Option A:** Talk to [@userinfobot](https://t.me/userinfobot) - it will reply with your User ID
  - **Option B:** Manual method:
    1. Search for your bot in Telegram (e.g., `@your_bot_name`) or visit `https://t.me/YOUR_BOT_USERNAME`
    2. Click "Start" or send any message (e.g., `/start` or `hello`)
    3. Visit `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` in your browser
    4. Find `"from":{"id":123456789}` in the JSON response
- **For groups:**
  1. Add your bot to the group
  2. Send a message in the group
  3. Visit `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
  4. Find `"chat":{"id":-123456789}` in the response (note: group IDs are negative)

> **Important:** You must send at least one message to your bot (click "Start") before it can send you notifications. Otherwise, Telegram will block the messages.

### 2. Set environment variables

Create a `.env` file (see `.env.example`):

```bash
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

## Usage

### JavaScript (CommonJS)

```javascript
const { sendTelegramNotification } = require('@m6b9/telegram-notifier');

// Simple message
await sendTelegramNotification('Hello from Node.js!');

// With HTML formatting
await sendTelegramNotification('<b>Error:</b> Something went wrong!');
```

### TypeScript (ES Modules)

```typescript
import { sendTelegramNotification } from '@m6b9/telegram-notifier';

// Simple message
await sendTelegramNotification('Hello from TypeScript!');

// With HTML formatting
await sendTelegramNotification('<b>Success:</b> Deployment complete!');
```

### Advanced (override credentials)

```typescript
import { sendTelegramNotification } from '@m6b9/telegram-notifier';

await sendTelegramNotification('Custom message', {
  botToken: 'custom_token',
  chatId: 'custom_chat_id'
});
```

### Error handling

```typescript
try {
  const result = await sendTelegramNotification('Test message');
  console.log(result); // { success: true, message: 'Message sent successfully' }
} catch (error) {
  console.error('Failed:', error.message);
}
```

## API Reference

### `sendTelegramNotification(message, options?)`

Send a message to Telegram.

**Parameters:**
- `message` (string, required): Message to send (supports HTML tags: `<b>`, `<i>`, `<code>`)
- `options` (TelegramNotificationOptions, optional):
  - `botToken` (string): Override `TELEGRAM_BOT_TOKEN` env variable
  - `chatId` (string): Override `TELEGRAM_CHAT_ID` env variable

**Returns:** `Promise<TelegramNotificationResponse>`
- `success` (boolean): Whether the message was sent successfully
- `message` (string): Success or error message

**Throws:**
- Error if `TELEGRAM_BOT_TOKEN` is missing
- Error if `TELEGRAM_CHAT_ID` is missing
- Error if message is not a non-empty string
- Error if Telegram API request fails

## TypeScript Support

This package is written in TypeScript and includes complete type definitions:

```typescript
import {
  sendTelegramNotification,
  TelegramNotificationOptions,
  TelegramNotificationResponse
} from '@m6b9/telegram-notifier';
```

## Use Cases

Perfect for:
- 🚨 Error alerts and monitoring
- 📊 Deployment notifications
- ⏰ Scheduled reports and reminders
- 🤖 CI/CD pipeline notifications
- 📈 System health checks

## Why Zero Dependencies?

Uses native Node.js `https` module for maximum reliability and minimal footprint. No external packages means:
- Faster installation
- Smaller bundle size
- Better security (fewer attack vectors)
- No dependency conflicts

## License

MIT © Mathias Bradiceanu
