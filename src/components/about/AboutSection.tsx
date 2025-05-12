import { useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { ModalProfile } from "./ModalProfile";
import image from "../../assets/cartoon-me.jpg";
import hobbie from "../../assets/hobbie.jpg";
import goals from "../../assets/colisión.jpeg";
import { useTranslation } from "react-i18next";

export function AboutSection() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [isHobbiesModalOpen, setIsHobbiesModalOpen] = useState(false);
  const [isHobbiesHovered, setIsHobbiesHovered] = useState(false);

  const [goalsHovered, setGoalsHovered] = useState(false);
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-black text-white p-8 gap-8 items-center justify-center w-full mx-auto text-center">
        <div className="flex-1 w-full max-w-6xl ">
          <h1 className="text-9xl font-bold mb-12 animate-fade-in text-center mt-9">
            {t("about-section.sobre_mi")}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mx-auto justify-items-center">
            <div className="flex justify-center animate-fade-in">
              <ProfileCard
                onOpenModal={() => setIsModalOpen(true)}
                onHoverChange={setIsHovered}
                image={image}
                isHovered={isHovered}
                title={t("about-section.resumen_profesional")}
                description={t("about-section.res-1")}
              />
              <ModalProfile
                isOpen={isModalOpen}
                image={image}
                onClose={() => setIsModalOpen(false)}
                title={t("about-section.resumen_profesional")}
                firstLine={t("about-section.res-2")}
                secondLine={t("about-section.res-2.1")}
                thirdLine={t("about-section.res-2.2")}
              />
            </div>
            <div className="flex justify-center">
              <ProfileCard
                onOpenModal={() => setIsHobbiesModalOpen(true)}
                onHoverChange={setIsHobbiesHovered}
                image={hobbie}
                isHovered={isHobbiesHovered}
                title={t("hobbies-section.my hobbies")}
                description={t("hobbies-section.hobbies")}
              />
              <ModalProfile
                isOpen={isHobbiesModalOpen}
                onClose={() => setIsHobbiesModalOpen(false)}
                title={t("hobbies-section.my hobbies")}
                image={hobbie}
                secondLine={
                  <>
                    <h3 className="text-lg font-semibold mb-2">
                    {t("hobbies-section.hobbies-1")}
                    </h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>
                        <strong>{t("hobbies-section.hobbies-1.1")}</strong>{" "}
                        {t("hobbies-section.hobbies-1.2")}
                      </li>
                      <li>
                        <strong>{t("hobbies-section.hobbies-2")}:</strong>{" "}
                        {t("hobbies-section.hobbies-2.1")}
                      </li>
                      <li>
                        <strong>{t("hobbies-section.hobbies-3")}</strong>{" "}
                        {t("hobbies-section.hobbies-3.1")}
                      </li>
                    </ul>
                  </>
                }
                thirdLine={
                  <>

                    <h3>
                      {t("hobbies-section.hobbies-4")}
                    </h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>
                      {t("hobbies-section.hobbies-4.1")}
                      </li>
                    </ul>
                  </>
                }
              />
            </div>
            <div className="flex justify-center">
              <ProfileCard
              onOpenModal={() => setIsGoalsModalOpen(true)}
              onHoverChange={setGoalsHovered}
              image={goals}
              isHovered={goalsHovered}
              title={t("goals-section.my goals")}
              description={t("goals-section.goals")}
              />

              <ModalProfile
              isOpen={isGoalsModalOpen}
              image={goals}
              onClose={() => setIsGoalsModalOpen(false)}
              title={t("goals-section.my goals")}
              firstLine={t("goals-section.goals")}
              secondLine={t("goals-section.goals-1")}
              thirdLine={t("goals-section.goals-2")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
