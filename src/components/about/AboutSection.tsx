import { useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { ModalProfile } from "./ModalProfile";
import image from "../../assets/cartoon-me.jpg";
import hobbie from "../../assets/hobbie.jpg";
import goals from "../../assets/colisión.jpeg";

export function AboutSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [isHobbiesModalOpen, setIsHobbiesModalOpen] = useState(false);
  const [isHobbiesHovered, setIsHobbiesHovered] = useState(false);

  const [goalsHovered, setGoalsHovered] = useState(false);
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-black text-white p-8 gap-8 items-center">
        <div className="flex-1 w-full max-w-6xl">
          <h1 className="text-9xl font-bold mb-12 animate-fade-in text-center">
            About Me
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mx-auto justify-items-center">
            <div className="flex justify-center animate-fade-in">
              <ProfileCard
                onOpenModal={() => setIsModalOpen(true)}
                onHoverChange={setIsHovered}
                image={image}
                isHovered={isHovered}
                title="Resumen Profesional"
                description="Profesional con más de 3 años de experiencia en el desarrollo de software, especializado en JavaScript/TypeScript y React. Experiencia en proyectos de telecomunicaciones, incluyendo desarrollo de IVR, CRM y sistemas de envío de SMS personalizados para la difusión de campañas comerciales. Abordamiento en Carrier de telecomunicación como Twilio, que es un sistema de números virtuales, capaces de enlazar llamadas web con clientes y servicios internos."
              />
              <ModalProfile
                isOpen={isModalOpen}
                image={image}
                onClose={() => setIsModalOpen(false)}
                title="Resumen Profesional"
                firstLine="Profesional con más de 3 años de experiencia en el desarrollo de software, especializado en JavaScript/TypeScript y React. Experiencia en proyectos de telecomunicaciones, incluyendo desarrollo de IVR, CRM y sistemas de envío de SMS personalizados para la difusión de campañas comerciales. Abordamiento en Carrier de telecomunicación como Twilio, que es un sistema de números virtuales, capaces de enlazar llamadas web con clientes y servicios internos."
                secondLine="Liderazgo efectivo de equipos de desarrollo con resultados satisfactorios para clientes y empleadores. Apasionado por la programación y comprometido con la entrega de soluciones de alta calidad. Desarrollo de endpoints para el manejo de backend que el proyecto solicita"
                thirdLine="Como Project Manager, he logrado liderar a un grupo de 6 personas para el desarrollo de soluciones, e integraciones de telecomunicaciones que han sido satisfactorias para el cliente, por su eficacia y prontitud al momento de la entrega. Sabiendo manejar emergencias y delegando las responsabilidades correspondientes que el cliente solicita."
              />
            </div>
            <div className="flex justify-center">
              <ProfileCard
                onOpenModal={() => setIsHobbiesModalOpen(true)}
                onHoverChange={setIsHobbiesHovered}
                image={hobbie}
                isHovered={isHobbiesHovered}
                title="Mis Hobbies"
                description="Soy una persona proactiva y siempre busco formas de mejorar mis habilidades y conocimientos. Por ejemplo, me encanta leer y aprender sobre las últimas tendencias en programación. También soy paciente y perseverante, lo que me ha ayudado a superar desafíos complejos en proyectos anteriores. Además, mi experiencia tocando música clásica en ensambles de cuerdas me ha enseñado a trabajar en equipo y a comunicarme eficazmente con otros."
              />
              <ModalProfile
                isOpen={isHobbiesModalOpen}
                onClose={() => setIsHobbiesModalOpen(false)}
                title="Mis Hobbies"
                image={hobbie}
                firstLine="Soy una persona proactiva y siempre busco formas de mejorar mis habilidades y conocimientos. Por ejemplo, me encanta leer y aprender sobre las últimas tendencias en programación. También soy paciente y perseverante, lo que me ha ayudado a superar desafíos complejos en proyectos anteriores. Además, mi experiencia tocando música clásica en ensambles de cuerdas me ha enseñado a trabajar en equipo y a comunicarme eficazmente con otros."
                secondLine={
                  <>
                    <h3 className="text-lg font-semibold mb-2">
                      Habilidades interpersonales y de comunicación:
                    </h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>
                        <strong>Lectura y aprendizaje continuo:</strong>{" "}
                        Disfruto leyendo y manteniéndome al día con las últimas
                        tendencias en programación, lo cual me ayuda a adquirir
                        nuevos conocimientos.
                      </li>
                      <li>
                        <strong>Paciencia:</strong>{" "}
                        Mi capacidad para enfrentar desafíos complejos me
                        permite trabajar de forma constante en proyectos a largo
                        plazo.
                      </li>
                      <li>
                        <strong>Proactividad:</strong>{" "}
                        Tomo la iniciativa para identificar problemas y
                        encontrar soluciones creativas que impulsan la mejora
                        continua.
                      </li>
                    </ul>
                  </>
                }
                thirdLine={
                  <>
                    <h3>
                      Habilidades de trabajo en equipo y liderazgo:
                    </h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>
                        <strong>Música en ensambles de cuerdas:</strong>{" "}
                        Mi participación en ensambles de cuerdas de música
                        clásica fomenta mi capacidad de colaboración,
                        comunicación y coordinación dentro de un equipo.
                      </li>
                    </ul>

                    <h3>
                      Otras habilidades valiosas:
                    </h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>
                        <strong>Aprecio por la naturaleza:</strong>{" "}
                        Disfruto de pasar tiempo en áreas boscosas, lo que me
                        ayuda a mantener un equilibrio entre mi vida personal y
                        profesional, además de fomentar mi creatividad y
                        capacidad de reflexión.
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
              title="Mis Metas"
              description="Me gustaría seguir creciendo como desarrollador de software y aprender nuevas tecnologías. También me gustaría trabajar en proyectos de código abierto y colaborar con la comunidad de desarrollo."
              />

              <ModalProfile
              isOpen={isGoalsModalOpen}
              image={goals}
              onClose={() => setIsGoalsModalOpen(false)}
              title="Mis Metas"
              firstLine="Me gustaría seguir creciendo como desarrollador de software y aprender nuevas tecnologías."
              secondLine="También me gustaría trabajar en proyectos de código abierto y colaborar con la comunidad de desarrollo."
              thirdLine="Mi objetivo es convertirme en un desarrollador full-stack y trabajar en proyectos que tengan un impacto positivo en la sociedad."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
