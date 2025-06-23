import { ReactNode } from "react";

interface ITipCardProps {
  icon: ReactNode;
  title: string;
  text: string;
}

const TipCard = ({ icon, title, text }: ITipCardProps) => (
  <div className="bg-tertiary-light rounded-lg p-6 flex flex-col items-center text-center shadow-md">
    <div className="text-tertiary-dark text-3xl mb-4">{icon}</div>
    <h4 className="font-semibold text-lg text-tertiary-dark mb-2">{title}</h4>
    <p className="text-tertiary-dark text-base">{text}</p>
  </div>
);

export default TipCard;
