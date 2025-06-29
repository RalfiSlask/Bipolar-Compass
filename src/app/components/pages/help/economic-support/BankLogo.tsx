'use client';

import FallbackLogo from '@/app/components/shared/FallbackLogo';
import { ColorType } from '@/app/types/colorTypes';
import { IBank } from '@/app/types/help/economic';
import Image from 'next/image';
import { useState } from 'react';
import { FaBuilding } from 'react-icons/fa';

interface IBankLogoProps {
  bank: IBank;
  type: ColorType;
}

const BankLogo = ({ bank, type }: IBankLogoProps) => {
  const { title, image } = bank;
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {image && !imageError && (
        <Image
          src={image}
          alt={`${title} logotyp`}
          width={250}
          height={80}
          className="w-[150px] h-20 object-contain"
          onError={() => setImageError(true)}
        />
      )}

      {(!image || imageError) && (
        <FallbackLogo
          type={type}
          icon={<FaBuilding className={`w-8 h-8 text-${type}-dark`} />}
        />
      )}
    </>
  );
};

export default BankLogo;
