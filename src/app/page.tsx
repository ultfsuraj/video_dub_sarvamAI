'use client';

import { useRef } from 'react';

import Slider from '@/components/customUI/Slider';
import AudioTrack, { SpeakerToggle } from '@/components/customUI/AudioTrack';
import VideoImport from '@/components/customUI/VideoImport';
import Text from '@/components/customUI/Text';

import { delay } from '@/utils/delay';
import DropDown from '@/components/customUI/DropDown';

const clickDelay = async (val: string): Promise<void> => {
  await delay(1500);
  console.log(val);
};

const CLIPS: { width: number; x: number }[] = [
  { width: 20, x: 5 },
  { width: 80, x: 30 },
  { width: 60, x: 120 },
  { width: 20, x: 205 },
  { width: 80, x: 230 },
  { width: 60, x: 310 },
  { width: 20, x: 400 },
  { width: 80, x: 430 },
];

const languages: string[] = [
  'Hindi',
  'Marathi',
  'Bangali',
  'Telugu',
  'Tamil',
  'Kannada',
  'Marwari',
  'Odia',
  'Punjabi',
  'Gujarati',
  'Malayalam',
  'Assamese',
  'Urdu',
  'English',
  'Bhojpuri',
  'Haryanvi',
  'Rajasthani',
  'Konkani',
  'Sindhi',
  'Dogri',
  'Santali',
  'Kashmiri',
  'Nepali',
  'Manipuri',
  'Bodo',
];

const App = () => {
  return (
    // main container
    <div className="h-[100vh] w-[100vw] px-10 py-2 flex flex-col justify-center gap-2 bg-slate-100">
      <div className="w-full flex-center h-10 flex heading-xl pt-6 pb-14 text-svm-10 ">
        Sarvam AI : Video Dubbing Tool
      </div>

      {/* top */}
      <div className="w-full h-10 flex body-strong">
        <div className="w-[31%] flex-center">English</div>
        <div className="w-[31%] flex-center">
          <DropDown
            items={languages}
            triggerClass="outline-none border-none h-6"
            dropdownContentClass="border border-svm-9 bg-slate-100"
          />
        </div>
        <div className="w-[38%] flex-center">unknown.mp4</div>
      </div>
      {/* middle */}
      <div className="w-full h-[50vh] flex growjustify-between gap-2 py-1">
        {/* left half */}
        <div className="w-1/2 h-full flex flex-col justify-around grow drop-shadow-lg rounded-md invisible-scroll gap-2 p-2  ">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <div key={index} className="flex justify-around gap-2">
              <Text text="lorem ipsum dolor sit amet, consectetur adipiscing elit.." />
              <Text
                text={index == 2 ? 'loading...' : 'lorem ipsum dolor sit amet'}
                buttonProps={{
                  btnText: 'Generate Audio',
                  loadingTxt: 'Generating...',
                  onClick: clickDelay,
                }}
              />
            </div>
          ))}
        </div>
        {/* right half */}
        <div className=" w-[38%] drop-shadow-lg rounded-md">
          <VideoImport className="h-full" />
        </div>
      </div>
      {/* bottom */}
      <div className="w-full h-[28vh] flex flex-col justify-center gap-6">
        <div className="w-full flex">
          <SpeakerToggle
            height={40}
            className="invisible pointer-events-none"
          />
          <Slider
            value={30}
            onMouseUp={(val: number) => {
              // setValue(val)
              console.log(val);
            }}
            min={0}
            max={100}
            step={0.5}
          />
        </div>
        <div className="flex-center flex-col gap-4 ">
          <AudioTrack height={40} clips={CLIPS} />
          <div className="w-full">
            <AudioTrack
              height={40}
              clips={[{ x: 0, width: '100.1%' }]}
              classname="select-none pointer-events-none "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
