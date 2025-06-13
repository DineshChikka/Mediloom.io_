import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// META API scripts START FROM HERE

export async function sendCustomTemplateMessage(phoneNumber, customerName) {
    try {
        const response = await axios({
            url: 'https://graph.facebook.com/v22.0/539385529266685/messages',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                messaging_product: 'whatsapp',
                to: `${phoneNumber}`,
                type: 'template',
                template: {
                    name: 'welcome',
                    language: {
                        code: 'en'
                    },
                    components: [
                        {
                            type: 'header',
                            parameters: [
                                {
                                    type: 'text',
                                    parameter_name: "customer_name",
                                    text: `${customerName}`
                                }
                            ]
                        }
                    ]
                }
            })
        });
        console.log('WhatsApp message sent:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending WhatsApp message:', error.response?.data || error.message);
        throw error;
    }
}


export async function sendOtpMessage(phoneNumber, otp) {
    try {
        console.log('Original OTP:', otp);

        const response = await axios({
            url: 'https://graph.facebook.com/v22.0/539385529266685/messages',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                messaging_product: 'whatsapp',
                to: `${phoneNumber}`,
                type: 'text',
                text: {
                    body: `Your OTP for gaining access to your documents is: ${otp}`
                }
            })
        });

        console.log('WhatsApp OTP message sent:', response.data);
        // return response.data;
    } catch (error) {
        console.error('Error sending WhatsApp OTP message:', error.response?.data || error.message);
        throw error;
    }
}
