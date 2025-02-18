import { Github, Linkedin, Mail } from "lucide-react";
import useSendMail from "../hooks/useSendMail";

const contactMethods = [
  { Icon: Mail, href: "mailto:vladpsico@gmail.com", label: "Gmail" },
  { Icon: Github, href: "https://github.com/HiVladius", label: "HiVladius" },
  {
    Icon: Linkedin,
    href: "https://linkedin.com/in/vladimirmoreno",
    label: "Vladimir Moreno",
  },
];

export function ContactSection() {
  const { sendMail } = useSendMail();

  const commonInputClass =
    "w-full px-4 py-2 bg-black/50 rounded-lg border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const from = formData.get("from") as string;
    const message = formData.get("message") as string;

    await sendMail({ from:"onboarding@resend.dev", to: "vladpscio@gmail.com", html: message });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-12 animate-fade-in">Contact Me</h1>
      <div className="max-w-2xl mx-auto bg-zinc-900/50 rounded-xl p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Get in touch</h2>
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
              { id: "name", type: "text", label: "Name" },
              { id: "email", type: "email", label: "Email" },
            ].map(({ id, type, label }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  {label}
                </label>
                <input type={type} id={id} className={commonInputClass} />
              </div>
            ))}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className={`${commonInputClass} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
