import { Github, Linkedin, Mail } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { sendMail } from "../../helpers/sendmail";
import { useState } from "react";

import { useTranslation } from "react-i18next";

const contactMethods = [
  { Icon: Mail, href: "mailto:vladpsico@gmail.com", label: "Gmail" },
  { Icon: Github, href: "https://github.com/HiVladius", label: "HiVladius" },
  {
    Icon: Linkedin,
    href: "https://linkedin.com/in/vladimirmoreno",
    label: "Vladimir Moreno",
  },
];

const { VITE_EMAIL, VITE_EMAIL_PASS } = import.meta.env;

export function ContactSection() {
  const { t } = useTranslation();

  const commonInputClass =
    "w-full px-4 py-2 bg-black/50 rounded-lg border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors";

  const [formData, setFormData] = useState({
    name: "",
    message: "",
    email: "",
  });

  const handleInputChange = (event: any) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const handleTextAreaChange = (event: any) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleEmailChange = (event: any) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const message = formData.get("message");
    const email = formData.get("email"); // Extract email from form data

    try {
      await sendMail({
        from: VITE_EMAIL_PASS,
        to: [VITE_EMAIL],
        subject: `New message from ${name}`,

        html: `<p>From email: ${email}</p><p>${message}</p>`,
      });
      toast.success(t("contact-section.send-message"));
      setFormData({ name: "", message: "", email: "" });
    } catch (error) {
      toast.error(t("contact-section.error-message"));
      console.error("Error al enviar el email", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-7xl font-bold mb-12 animate-fade-in text-center mt-8">
        {t("contact-section.contact")}
      </h1>
      <div className="max-w-2xl mx-auto bg-zinc-900/50 rounded-xl p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-2xl font-semibold mb-4">
              {t("contact-section.social-media")}
            </h2>
            {contactMethods.map(({ Icon, href, label }) => (
              <div key={label} className="flex items-center gap-4">
                <Icon className="text-red-500" size={24} />
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined}
                  className="hover:text-red-500 transition-colors"
                >
                  {label}
                </a>
              </div>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {[
              { id: "name", type: "text", label: t("contact-section.name") },
            ].map(({ id, type, label }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  {label}
                </label>
                <input
                  type={type}
                  name="name"
                  id={id}
                  className={commonInputClass}
                  required
                  minLength={10}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                {t("contact-section.email")}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={commonInputClass}
                value={formData.email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                {t("contact-section.message")}{" "}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`${commonInputClass} resize-none`}
                value={formData.message}
                onChange={handleTextAreaChange}
                required
              />
            </div>
            <Toaster
              toastOptions={{
                style: {
                  background: "#333",
                  color: "#fff",
                },
                success: {
                  duration: 5000,
                },
                error: {
                  duration: 5000,
                },
              }}
            />
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {t("contact-section.send")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
