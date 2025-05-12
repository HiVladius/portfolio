import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { OptimizedImage } from "../common/OptimizedImage";

interface ProfileCardProps {
    onOpenModal: () => void;
    onHoverChange: (hovered: boolean) => void;
    image: string;
    isHovered: boolean;
    title: string;
    description: string;
}

export function ProfileCard(
    { onOpenModal, onHoverChange, isHovered, title, description, image }:ProfileCardProps,) 
{
    const { t } = useTranslation();
    return (
        <div
            className="relative w-96 rounded-xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:shadow-red-500/20"
            onMouseEnter={() => onHoverChange(true)}
            onMouseLeave={() => onHoverChange(false)}
            onClick={onOpenModal}
        >
            <OptimizedImage
                src={image}
                alt={title}
                width={384}
                height={384}
                className="w-full h-96"
            />

            <div
                className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-[2px] p-6 flex flex-col justify-end transition-all duration-300 ${
                    isHovered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                }`}
            >
                <h3 className="text-2xl font-bold mb-2 text-white/90">
                    {title}
                </h3>
                <p className="text-white/80 line-clamp-3 mb-4 text-sm leading-relaxed">
                    {description}
                </p>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal();
                    }}
                    className="flex items-center gap-2 text-white/90 hover:text-red-500 transition-colors group"
                >
                    <span>{t("more-info.info")}</span>
                    <ChevronDown
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        size={20}
                    />
                </button>
            </div>
        </div>
    );
}
