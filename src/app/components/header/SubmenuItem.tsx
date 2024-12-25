'use client';

import Link from 'next/link';

interface ISubmenuItemProps {
  title: string;
  route: string;
}

const SubmenuItem = ({ title, route }: ISubmenuItemProps) => {
  return <Link href={route}>{title}</Link>;
};

export default SubmenuItem;
