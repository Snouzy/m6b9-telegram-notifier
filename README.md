# Telegram Notifier

> Zero-dependency TypeScript library for sending Telegram notifications via bot API

[![npm version](https://img.shields.io/npm/v/@m6b9/telegram-notifier)](https://www.npmjs.com/package/@m6b9/telegram-notifier)
[![npm downloads](https://img.shields.io/npm/dm/@m6b9/telegram-notifier)](https://www.npmjs.com/package/@m6b9/telegram-notifier)
[![license](https://img.shields.io/npm/l/@m6b9/telegram-notifier)](https://github.com/m6b9/telegram-notifier/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)

<div align="center">
  <img src="https://raw.githubusercontent.com/m6b9/telegram-notifier/main/.github/
  assets/hero.jpeg" alt="Telegram Notifier - Send notifications from Node.js" width="800">
  <p><i>Send Telegram notifications from your Node.js app in seconds</i></p>
</div>

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Quick Setup](#quick-setup)
- [Usage](#usage)
- [API Reference](#api-reference)
- [TypeScript Support](#typescript-support)
- [Use Cases](#use-cases)
- [Why Zero Dependencies?](#why-zero-dependencies)
- [License](#license)

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
- Search and open the conversation with [@BotFather](https://t.me/BotFather) on Telegram
- Send `/newbot` to create a new bot
- Copy the generated token (format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

**Chat ID:**

> **Important:** You must **always** send `/start` to your bot first, otherwise Telegram will block all messages from the bot!

- **IF you want to send notification to a personal chat:**
  1. Search for your bot in Telegram (e.g., `@your_bot_name`) or visit `https://t.me/YOUR_BOT_USERNAME`
  2. Click "Start" or send `/start` to the bot
  3. **Option A:** Search and talk to [@userinfobot](https://t.me/userinfobot) : it will reply with your User ID. Copy the ID.
  4. **Option B:** Manual method:
     - Visit `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` in your browser
     - Find `"from":{"id":123456789}` in the JSON response

- **IF you want to send notification to a group:**
  1. Add your bot to the group
  2. Send `/start` in the group (or any message)
  3. Visit `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
  4. Find `"chat":{"id":-123456789}` in the response (note: group IDs are negative)

### 2. Set environment variables

Create a `.env` file (see `.env.example`):

```bash
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

> **Note:** Environment variables are optional. You can also pass credentials directly in the function call (see [Advanced usage](#advanced-override-credentials)).

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
