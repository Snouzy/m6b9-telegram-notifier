/**
 * Simple Telegram notification sender
 * Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID env variables
 */

import * as https from 'https';

/**
 * Options for sending a Telegram notification
 */
export interface TelegramNotificationOptions {
  /** Override env TELEGRAM_BOT_TOKEN */
  botToken?: string;
  /** Override env TELEGRAM_CHAT_ID */
  chatId?: string;
}

/**
 * Response from sending a notification
 */
export interface TelegramNotificationResponse {
  success: boolean;
  message: string;
}

/**
 * Send a message to Telegram
 * @param message - Message to send
 * @param options - Optional configuration
 * @returns Promise with success status and message
 */
export async function sendTelegramNotification(
  message: string,
  options: TelegramNotificationOptions = {}
): Promise<TelegramNotificationResponse> {
  const botToken = options.botToken || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = options.chatId || process.env.TELEGRAM_CHAT_ID;

  // Validate required params
  if (!botToken) {
    throw new Error('TELEGRAM_BOT_TOKEN is required (env or options)');
  }
  if (!chatId) {
    throw new Error('TELEGRAM_CHAT_ID is required (env or options)');
  }
  if (!message || typeof message !== 'string') {
    throw new Error('message must be a non-empty string');
  }

  const payload = JSON.stringify({
    chat_id: chatId,
    text: message,
    parse_mode: 'HTML', // Supports <b>, <i>, <code> tags
  });

  const requestOptions: https.RequestOptions = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${botToken}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(requestOptions, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (res.statusCode === 200 && response.ok) {
            resolve({
              success: true,
              message: 'Message sent successfully',
            });
          } else {
            reject(new Error(response.description || 'Failed to send message'));
          }
        } catch (error) {
          reject(new Error(`Invalid response: ${(error as Error).message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Network error: ${error.message}`));
    });

    req.write(payload);
    req.end();
  });
}
