'use client';

import { delay } from '@/utils/delay';
import { useState } from 'react';
import Slider from '@/components/customUI/Slider';
import Text from '@/components/customUI/Text';
import AudioTrack from '@/components/customUI/AudioTrack';

const clickDelay = async (val: string): Promise<void> => {
  await delay(1500);
  console.log(val);
};

const clips: { width: number; x: number }[] = [
  { width: 150, x: 20 },
  { width: 90, x: 200 },
  { width: 200, x: 400 },
];

const page = () => {
  return (
    <div className="w-1/2 flex flex-col gap-4 ml-4 mt-4">
      {/* Text Component */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-3 border-1 bg-gray-100 border-black w-full  px-4 py-6">
        <Text text="lorem ipsum dolor sit amet, consectetur adipiscing elit.." />
        <Text
          text="lorem ipsum dolor sit amet"
          buttonProps={{
            btnText: 'Generate Audio',
            loadingTxt: 'Generating...',
            onClick: clickDelay,
          }}
        />
      </div>
      {/* Slider Component */}
      <div className=" border-1 bg-gray-100 border-black w-full  px-4 py-6">
        <Parent />
      </div>
      {/* AudioTrack Component */}
      <div className="border-1 bg-gray-100 border-black w-[900px] px-4 py-6 ">
        <AudioTrack height={40} clips={clips} />
      </div>
    </div>
  );
};

export default page;

function Parent() {
  const [value, setValue] = useState<number>(40);

  const handleDrag = (val: number) => {
    console.log('Slider released at:', val);
    setValue(val);
  };

  return (
    <div className="w-full">
      <Slider
        value={value}
        onMouseUp={handleDrag}
        min={0}
        max={100}
        step={0.5}
      />
      <button
        className="mt-4 text-sm bg-svm-9 text-white px-2 py-1 rounded hover:bg-svm-8"
        onClick={() => {
          setValue((v) => v + 0.5);
        }}
      >
        Increment externally
      </button>
    </div>
  );
}
