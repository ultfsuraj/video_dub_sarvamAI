'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';

type SliderProps = {
  value: number;
  onMouseUp?: (value: number) => void;
  // onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  bgTrackClass?: string;
  bgRangeClass?: string;
  bgThumbClass?: string;
  bgThumbHoverClass?: string;
};

const Slider: React.FC<SliderProps> = ({
  value,
  onMouseUp,
  // onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  bgTrackClass = 'bg-svm-2',
  bgRangeClass = 'bg-svm-8',
  bgThumbClass = 'bg-slate-600 hover:bg-slate-900',
}) => {
  const [internalValue, setInternalValue] = useState<number>(value);
  const internalValueRef = useRef<number>(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleValueChange = (val: number[]) => {
    setInternalValue(val[0]);
    internalValueRef.current = val[0];
    // if (onValueChange) {
    //   onValueChange(val[0]);
    // }
  };

  const handlePointerUp = () => {
    console.log('mouse up');
    if (onMouseUp) {
      onMouseUp(internalValueRef.current);
    }
  };

  return (
    <SliderPrimitive.Root
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      min={min}
      max={max}
      step={step}
      value={[internalValue]}
      onValueChange={handleValueChange}
      onPointerUp={handlePointerUp}
    >
      <SliderPrimitive.Track className={cn('relative h-2 w-full grow overflow-hidden rounded-xs ', bgTrackClass)}>
        <SliderPrimitive.Range className={cn('absolute h-full ', bgRangeClass)} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          'block h-4 w-4 rounded-sm  shadow transition-colors duration-200  focus:outline-none',
          bgThumbClass
        )}
      />
    </SliderPrimitive.Root>
  );
};

export default Slider;
