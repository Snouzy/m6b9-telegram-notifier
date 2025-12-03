/**
 * Simple test file
 * Run: ts-node test.ts or npm test (after building)
 */

import { config } from 'dotenv';
import { sendTelegramNotification } from './src/index';

config();

async function test(): Promise<void> {
  try {
    console.log('🚀 Sending test notification...');

    const result = await sendTelegramNotification(
      '✅ <b>Test successful!</b>\n\n' +
      'Your Telegram notifier is working perfectly.'
    );

    console.log('✅ Success:', result);
  } catch (error) {
    console.error('❌ Error:', (error as Error).message);
    process.exit(1);
  }
}

test();
