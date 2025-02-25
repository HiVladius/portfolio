import { Code, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2-removebg.png";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import i18n from "i18next";

interface ProfileOption {
  id: string;
  title: string;
  icon: JSX.Element;
}

export function ProfileSelector() {
  const { t } = useTranslation();

  const profiles: ProfileOption[] = [
    {
      id: "about",
      title: t("profile-selection.sobre-mi"),
      icon: <User size={32} />,
    },
    {
      id: "projects",
      title: t("profile-selection.proyectos"),
      icon: <Code size={32} />,
    },
    {
      id: "contact",
      title: t("profile-selection.contacto"),
      icon: <Mail size={32} />,
    },
  ];

  const changeLenguage = () => {
    const newLanguage = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  // Load language from local storage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      i18n.changeLanguage("es");
    }
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <motion.div
          className="img"
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={logo} alt="Logo" className="w-32 h-32 mb-8" />
        </motion.div>

        <h1 className="text-4xl font-bold mb-12">
          {t("profile-selection.quien-esta-viendo-ahora")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => navigate(`/${profile.id}`)}
              className="group flex flex-col items-center transition-transform duration-200 hover:scale-110"
            >
              <div className="w-32 h-32 rounded bg-gray-800 flex items-center justify-center mb-4 group-hover:border-2 border-white">
                {profile.icon}
              </div>
              <span className="text-gray-400 group-hover:text-white">
                {profile.title}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={i18n.language === "en"}
            onChange={changeLenguage}
          />
          <div className="w-11 h-6 bg-gray-800 rounded-full peer-checked:bg-gray-400 
        peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-600 
        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
        after:bg-white after:border-gray-600 after:border after:rounded-full 
        after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          <span className="ml-3 text-sm font-medium text-gray-300">
            ES / EN
          </span>
        </label>
      </div>
    </>
  );
}
