'use client';

import { Loader } from 'lucide-react';
import { cn } from '@/utils/cn';

const CustomLoader = ({
  className = '',
  text = '',
  spinnerClass = '',
}: {
  className?: string;
  text?: string;
  spinnerClass?: string;
  textClass?: string;
}) => {
  return (
    <div className={cn('w-full flex-center ', className)}>
      <Loader
        className={cn('animate-spin w-5 h-5 text-gray-700 mr-2', spinnerClass)}
      />
      {text}
    </div>
  );
};

export default CustomLoader;
