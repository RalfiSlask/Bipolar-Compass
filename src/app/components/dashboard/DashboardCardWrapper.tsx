import React from 'react';

const DashboardCardWrapper = ({
  children,
  title,
  icon: Icon,
  className = '',
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ElementType;
  className?: string;
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 min-h-32 ${className}`}
    >
      <div className="flex items-center mb-4">
        {Icon && <Icon className="mr-3 text-primary-accent text-2xl" />}
        <h2 className="text-xl font-semibold text-primary-dark">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default DashboardCardWrapper;
