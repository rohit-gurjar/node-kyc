const axios = require('axios');
const { appConfig } = require('../db/config');
const config = appConfig;

// Send OTP via WhatsApp
const sendOTPViaWhatsApp = async (phoneNumber, otp) => {
  try {
    const payload = {
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'template',
      template: {
        name: 'otp_verification',
        language: {
          code: 'en_US'
        },
        components: [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: otp
              }
            ]
          }
        ]
      }
    };

    const response = await axios.post(
      `${config.whatsapp.apiUrl}`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${config.whatsapp.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      success: true,
      messageId: response.data.messages[0].id,
      message: 'OTP sent successfully'
    };
  } catch (error) {
    console.error('WhatsApp API Error:', error.message);
    return {
      success: false,
      message: 'Failed to send OTP via WhatsApp',
      error: error.message
    };
  }
};

module.exports = {
  sendOTPViaWhatsApp
};
