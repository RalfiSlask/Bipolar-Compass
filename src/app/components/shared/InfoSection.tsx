interface InfoSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const InfoSection = ({ title, description, children }: InfoSectionProps) => {
  return (
    <div className="flex flex-col content-container">
      <h3 className="h-xs lg:text-xl text-primary-dark mb-4">{title}</h3>
      {description && <p className="mb-6 lg:text-lg">{description}</p>}
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
};

export default InfoSection;
