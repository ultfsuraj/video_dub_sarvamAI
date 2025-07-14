'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';

type ButtonProps = {
  btnText: string;
  loadingTxt: string;
  onClick: (val: string) => void;
};

interface TextProps {
  text: string;
  className?: string;
  buttonProps?: ButtonProps;
  btnClass?: string;
  btnContainerClass?: string;
}

type AutoTextAreaProps = {
  value: string;
  onChange: (val: string) => void;
  readOnly?: boolean;
  className?: string;
};

const AutoTextArea: React.FC<AutoTextAreaProps> = ({ value, onChange, readOnly = false, className = '' }) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const textarea = ref.current;
      textarea.style.height = '0px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      readOnly={readOnly}
      className={cn(
        `resize-none overflow-hidden bg-transparent border-none p-0 m-0 w-full text-base leading-relaxed focus:outline-none focus:ring-0`,
        readOnly ? 'select-none pointer-events-none' : '',
        className
      )}
      style={{ height: 'auto' }}
      rows={1}
    />
  );
};

const Text = ({ text, className, buttonProps, btnClass = '', btnContainerClass = '' }: TextProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dubText, setDubText] = useState<string>(text);
  return (
    <div
      className={cn(
        'px-2 py-1 w-full flex flex-col flex-center rounded-md border border-svm-7 bg-svm-1 hover:bg-white drop-shadow-sm',
        className,
        isLoading ? 'select-none pointer-events-none bg-white' : ''
      )}
    >
      <AutoTextArea
        value={dubText}
        onChange={setDubText}
        readOnly={buttonProps ? false : true}
        className="w-full text-center content-center body-sm px-2 py-1 grow"
      />

      <div className={cn('h-5.5 self-end mb-2', btnContainerClass)}>
        {buttonProps && (
          <button
            className={cn(
              'h-full w-25 rounded-sm bg-svm-9 body-xs text-white text-center',
              isLoading ? 'bg-svm-8 cursor-not-allowed' : '',
              btnClass
            )}
            onClick={async () => {
              setIsLoading(true);
              await buttonProps.onClick(dubText);
              setIsLoading(false);
            }}
            disabled={isLoading}
          >
            {isLoading ? buttonProps.loadingTxt : buttonProps.btnText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Text;
