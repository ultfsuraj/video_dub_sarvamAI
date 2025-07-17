'use client';

import { delay } from '@/utils/delay';

import Text from '@/components/customUI/Text';
import CustomLoader from '@/components/customUI/Loader';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';

const clickDelay = async (val: string): Promise<void> => {
  await delay(2000);
  console.log(val);
};

const TranscriptContainer = ({ activeId = 0, isFileUploaded }: { activeId?: number; isFileUploaded: boolean }) => {
  const isScriptLoading = useAppSelector((state) => state.appState.isScriptLoading);
  const scripts = useAppSelector((state) => state.appState.scripts);
  const isTranslationLoading = useAppSelector((state) => state.appState.isTranslationLoading);
  const dubScripts = useAppSelector((state) => state.appState.dubScripts);

  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const refs = textRefs.current;
    if (refs) {
      refs[activeId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }, [activeId]);

  return (
    <div className="w-1/2 h-full flex flex-col justify-around grow drop-shadow-lg rounded-md invisible-scroll gap-2 p-x-2  ">
      {!isFileUploaded ? (
        <div className="flex justify-around  w-full grow gap-2">
          <div className="border border-svm-8 rounded-md w-1/2 text-gray-700 flex-center caption">
            Original Transcript
          </div>
          <div className="border border-svm-8 rounded-md w-1/2 text-gray-700 flex-center caption">
            Dubbed Translation
          </div>
        </div>
      ) : null}

      {isFileUploaded && isScriptLoading ? (
        <div className="flex justify-around  w-full grow gap-2">
          <div className="border border-svm-8 rounded-md w-1/2 text-gray-700 flex-center caption">
            <CustomLoader text="Loading..." spinnerClass="[animation-duration:1.5s]" />
          </div>
          <div className="border border-svm-8 rounded-md w-1/2 text-gray-700 flex-center caption">
            Dubbed Translation
          </div>
        </div>
      ) : null}

      {isFileUploaded && !isScriptLoading && isTranslationLoading ? (
        <div className="flex justify-around  w-full grow gap-2">
          <div className="rounded-md w-1/2 text-gray-700 flex justify-around flex-col gap-2 max-h-[50vh]">
            {scripts.map(({ id, text }) => (
              <Text key={id} text={text} />
            ))}
          </div>

          <div className="border border-svm-8 rounded-md w-1/2 text-gray-700 flex-center max-h-[50vh] caption">
            <CustomLoader text="Translating..." spinnerClass="[animation-duration:1.5s]" />
          </div>
        </div>
      ) : null}

      {isFileUploaded && !isScriptLoading && !isTranslationLoading
        ? scripts.map(({ id, text }, index) => (
            <div key={id} className="flex justify-around gap-2" ref={(el) => (textRefs.current[index] = el)}>
              <Text text={text} />
              {/* asuming dubscripts are returned in same order as original scripts are sent */}
              <Text
                text={dubScripts[index]?.text}
                buttonProps={{
                  btnText: 'Generate Audio',
                  loadingTxt: 'Generating...',
                  onClick: clickDelay,
                }}
                className={activeId === index ? 'bg-white' : ''}
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default TranscriptContainer;
