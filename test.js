/**
 * Simple test file
 * Run: node test.js
 */

require('dotenv').config();
const { sendTelegramNotification } = require('./src/index');

async function test() {
  try {
    console.log('🚀 Sending test notification...');

    const result = await sendTelegramNotification(
      '✅ <b>Test successful!</b>\n\nYour Telegram notifier is working perfectly.'
    );

    console.log('✅ Success:', result);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

test();
