'use client';

import AudioTrack, { SpeakerToggle } from '@/components/customUI/AudioTrack';
import Slider from '@/components/customUI/Slider';
import type { ClipType } from '@/utils/constants';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const AudioContainer = forwardRef<
  HTMLDivElement,
  {
    clips: Array<ClipType>;
    dubClips: Array<ClipType>;
    activeId: number;
    isFileUploaded: boolean;
    isAudioLoading: boolean;
    sliderValue?: number;
    sliderMin?: number;
    sliderMax?: number;
    sliderStep?: number;
    onMouseUp: (x: number) => void;
    // onValueChange: (x: number) => void;
  }
>(
  (
    {
      clips,
      dubClips,
      activeId,
      isFileUploaded,
      isAudioLoading,
      sliderValue = 0,
      sliderMin = 0,
      sliderMax = 100,
      sliderStep = 0.001,
      onMouseUp,
      // onValueChange,
    },
    dubAudioTrackRef
  ) => {
    return (
      <div className="w-full h-[28vh] flex flex-col justify-center gap-6">
        <div className="w-full flex">
          <SpeakerToggle height={36} className="invisible pointer-events-none" />
          {isFileUploaded && !isAudioLoading ? (
            <Slider
              value={sliderValue}
              onMouseUp={onMouseUp}
              // onValueChange={onValueChange}
              min={sliderMin}
              max={sliderMax}
              step={sliderStep}
            />
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex-center flex-col gap-4 ">
          <AudioTrack height={36} clips={dubClips} ref={dubAudioTrackRef} activeId={activeId} />
          <AudioTrack height={36} clips={clips} classname="select-none pointer-events-none " activeId={-1} />
        </div>
      </div>
    );
  }
);

export default AudioContainer;
