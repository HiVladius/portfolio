export interface MailData {
    from: string;
    to: [string];
    subject: string;
    html: string;
}

// Response from the send-mail API



export interface SendMailResponse {
    success: boolean;
    message: string;
}

export const sendMail = async (mailData: MailData): Promise<SendMailResponse> => {
    try {
        const response = await fetch('https://back-mail-coral.vercel.app/send-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mailData)
        });

        if (!response.ok) {
            throw new Error(`Failed to send mail: ${response.statusText}`);
        }

        const data = await response.json();
        return data as SendMailResponse;
    } catch (error) {
        console.error('Error sending mail:', error);
        throw error;
    }
};