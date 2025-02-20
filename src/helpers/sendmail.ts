export interface MailData {
    from: string;
    to: [string];
    subject: string;
    html: string;
}

let mailEndPoint = import.meta.env.VITE_MAIL_ENDPOINT;

export const sendMail = async (mailData: MailData): Promise<any> => {
    try {
        const response = await fetch(mailEndPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mailData)
        });

        if (!response.ok) {
            throw new Error(`Failed to send mail: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending mail:', error);
        throw error;
    }
};

// Example usage
// (async () => {
//   const data: MailData = {
//     from: "onboarding@resend.dev",
//     to: "vladpsico@gmail.com",
//     subject: "Contacto",
//     html: "<p>me interesa conocerte y saber mas sobre tu trabajo</p>"
//   }
//   const result = await sendMail(data);
//   console.log(result);
// })();