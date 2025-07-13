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
    isFileUploaded: boolean;
    isAudioLoading: boolean;
    sliderMin?: number;
    sliderMax?: number;
    sliderStep?: number;
    onMouseUp: (x: number) => void;
  }
>(({ clips, dubClips, isFileUploaded, isAudioLoading, sliderMin = 0, sliderMax = 100, sliderStep = 0.00001, onMouseUp }, dubAudioTrackRef) => {
  return (
    <div className="w-full h-[28vh] flex flex-col justify-center gap-6">
      <div className="w-full flex">
        <SpeakerToggle height={40} className="invisible pointer-events-none" />
        {isFileUploaded && !isAudioLoading ? (
          <Slider value={0} onMouseUp={onMouseUp} min={sliderMin} max={sliderMax} step={sliderStep} />
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex-center flex-col gap-4 ">
        <AudioTrack height={40} clips={dubClips} ref={dubAudioTrackRef} />
        <AudioTrack height={40} clips={clips} classname="select-none pointer-events-none " />
      </div>
    </div>
  );
});

export default AudioContainer;
