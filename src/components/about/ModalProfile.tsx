import { X } from 'lucide-react';
import { OptimizedImage } from '../common/OptimizedImage';

interface ModalProfileProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    firstLine: React.ReactNode;
    secondLine?: React.ReactNode;
    thirdLine?: React.ReactNode;
    image: string;
}

export function ModalProfile({ isOpen, onClose, title, firstLine, secondLine, thirdLine, image }: ModalProfileProps) {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="bg-zinc-900/90 backdrop-blur-md max-w-2xl w-full rounded-xl p-8 relative shadow-xl animate-slide-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors hover:rotate-90 duration-200"
                >
                    <X size={24} />
                </button>
                
                <div className="flex flex-col md:flex-row gap-6">
                    <OptimizedImage 
                        src={image} 
                        alt={title} 
                        width={192}
                        height={192}
                        className="w-48 h-48 rounded-lg shadow-xl ring-2 ring-white/10"
                    />
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-4 text-white/90">{title}</h2>
                        <div className="space-y-4 text-white/80">
                            <p className="leading-relaxed">
                                {firstLine}
                            </p>
                            <p className="leading-relaxed">
                                {secondLine}
                            </p>
                            <p className="leading-relaxed">
                                {thirdLine}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}