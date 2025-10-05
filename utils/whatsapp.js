import axios from 'axios';

export const sendWhatsAppMsg = async (phone, message) => {
  const apiUrl = process.env.WHATSAPP_API_URL;
  const token = process.env.WHATSAPP_API_KEY;

  try {
    await axios.post(apiUrl, {
      messaging_product: "whatsapp",
      to: phone,
      text: { body: message }
    }, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('WhatsApp Error:', err.message);
  }
};
