import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';

interface VerticalSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number, date?: string) => void;
  icon?: ReactElement;
  reverse?: boolean;
  className?: string;
  height?: number;
  date?: string;
}

const VerticalSlider = ({
  min,
  max,
  value,
  onChange,
  reverse = false,
  className = '',
  height = 300,
  date,
}: VerticalSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [sliderValue, setSliderValue] = useState(value);
  const sliderRef = useRef<HTMLDivElement>(null);

  // We use a the useCallback hook to update the slider value to prevent unnecessary re-renders.
  const updateValue = useCallback(
    (clientY: number) => {
      if (!sliderRef.current) return;

      // We get the bounding client rect (the position of the slider)
      const rect = sliderRef.current.getBoundingClientRect();
      // We calculate the percentage of the slider that the user is dragging.
      const percentage =
        1 - Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      // We calculate the new value based on the percentage.
      const newValue = Math.round(min + percentage * (max - min));
      setSliderValue(newValue);
      onChange(newValue, date);
    },
    [min, max, onChange, date]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      updateValue(e.clientY);
    },
    [updateValue]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      updateValue(e.clientY);
    },
    [isDragging, updateValue]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // This effect is used to add event listeners for mouse movement and mouse up.
  // It is used to update the slider value when the user is dragging the slider.
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const getColorClass = (value: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    if (percentage === 0) return 'bg-gray-600';
    if (percentage <= 25) return 'bg-green-500';
    if (percentage <= 50) return 'bg-yellow-400';
    if (percentage <= 75) return 'bg-orange-400';
    if (percentage <= 85) return 'bg-red-400';
    return 'bg-red-500';
  };

  const getReverseColorClass = (value: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    if (percentage === 0) return 'bg-red-black';
    if (percentage <= 25) return 'bg-gray-600';
    if (percentage <= 50) return 'bg-orange-400';
    if (percentage <= 75) return 'bg-yellow-400';
    if (percentage <= 85) return 'bg-green-500';
    return 'bg-red-600';
  };

  const getBorderColorClass = (value: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    if (percentage === 0) return 'border-gray-600';
    if (percentage <= 25) return 'border-green-600';
    if (percentage <= 50) return 'border-yellow-500';
    if (percentage <= 75) return 'border-orange-500';
    return 'border-red-600';
  };

  const getReverseBorderColorClass = (value: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    if (percentage === 0) return 'border-black';
    if (percentage <= 25) return 'border-gray-600';
    if (percentage <= 50) return 'border-yellow-500';
    if (percentage <= 75) return 'border-green-500';
    return 'border-red-600';
  };

  const percentage = ((sliderValue - min) / (max - min)) * 100;
  const currentColorClass = reverse
    ? getReverseColorClass(sliderValue)
    : getColorClass(sliderValue);
  const currentBorderColorClass = reverse
    ? getReverseBorderColorClass(sliderValue)
    : getBorderColorClass(sliderValue);

  return (
    <div
      ref={sliderRef}
      className={`relative cursor-grab ${
        isDragging ? 'cursor-grabbing' : ''
      } ${className}`}
      style={{ height, width: '16px' }}
      onMouseDown={handleMouseDown}
    >
      <div className="absolute w-full h-full rounded-lg bg-primary-light" />
      <div
        className={`absolute bottom-0 w-full rounded-lg transition-all duration-150 ${currentColorClass}`}
        style={{ height: `${percentage}%` }}
      />
      <div
        className={`absolute w-6 h-6 -translate-x-1/2 bg-white rounded-full shadow-md border-2 transition-all duration-150 ${currentBorderColorClass}`}
        style={{
          left: '50%',
          bottom: `calc(${percentage}% - 12px)`,
        }}
      />
    </div>
  );
};

export default VerticalSlider;
