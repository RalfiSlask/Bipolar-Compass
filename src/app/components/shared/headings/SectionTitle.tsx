interface SectionTitleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  type?: 'primary' | 'tertiary';
  extraClasses?: string;
  iconClasses?: string;
}

const SectionTitle = ({
  icon = null,
  children,
  type = 'primary',
  extraClasses = '',
  iconClasses = 'text-3xl',
}: SectionTitleProps) => (
  <h3
    className={`h-xs mb-4 flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left ${extraClasses} ${
      type === 'tertiary' ? 'text-tertiary-dark' : 'text-primary-dark'
    }`}
  >
    {icon && <span className={iconClasses}>{icon}</span>}
    {children}
  </h3>
);

export default SectionTitle;
