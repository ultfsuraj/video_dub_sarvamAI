'use client';

import AudioTrack, { SpeakerToggle } from '@/components/customUI/AudioTrack';
import Slider from '@/components/customUI/Slider';
import type { ClipType } from '@/utils/constants';

const AudioContainer = ({
  clips,
  dubClips,
  isFileUploaded,
  isAudioLoading,
  isDubAudioLoading,
}: {
  clips: Array<ClipType>;
  dubClips: Array<ClipType>;
  isFileUploaded: boolean;
  isAudioLoading: boolean;
  isDubAudioLoading: boolean;
}) => {
  return (
    <div className="w-full h-[28vh] flex flex-col justify-center gap-6">
      <div className="w-full flex">
        <SpeakerToggle height={40} className="invisible pointer-events-none" />
        {isFileUploaded && !isAudioLoading ? (
          <Slider
            value={0}
            onMouseUp={(val: number) => {
              // setValue(val)
              console.log(val);
            }}
            min={0}
            max={100}
            step={0.5}
          />
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex-center flex-col gap-4 ">
        <AudioTrack height={40} clips={dubClips} />
        <AudioTrack height={40} clips={clips} classname="select-none pointer-events-none " />
      </div>
    </div>
  );
};

export default AudioContainer;
