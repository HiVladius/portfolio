import { useCallback, useState } from "react";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.VITE_RESEND_KEY);

interface SendMailProps {
    from: "onboarding@resend.dev";
    to: "vladpscio@gmail.com";
    html: string;
}

const useSendMail = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const sendMail = useCallback(async (email: SendMailProps) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${resend.key}`,
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error("Failed to send email");
            }
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { sendMail, loading, error };
};

export default useSendMail;
