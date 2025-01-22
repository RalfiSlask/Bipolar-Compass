interface IAboutUsSectionProps {
    icon: React.ReactNode;
    title: string;
    content: React.ReactNode;
  }

const AboutUsSection = ({ icon, title, content }: IAboutUsSectionProps) => {
  return (
    <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <span className="text-2xl text-primary-medium">{icon}</span>
      <h3 className="text-xl font-semibold text-primary-dark">{title}</h3>
    </div>
    <div className="pl-9">{content}</div>
  </div>
  )
}

export default AboutUsSection