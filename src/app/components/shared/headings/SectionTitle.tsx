interface SectionTitleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  type?: 'primary' | 'tertiary';
  extraClasses?: string;
}

const SectionTitle = ({
  icon = null,
  children,
  type = 'primary',
  extraClasses = '',
}: SectionTitleProps) => (
  <h3
    className={`h-xs mb-4 flex flex-col sm:flex-row items-center gap-3 ${extraClasses} ${
      type === 'tertiary' ? 'text-tertiary-dark' : 'text-primary-dark'
    }`}
  >
    {icon}
    {children}
  </h3>
);

export default SectionTitle;
