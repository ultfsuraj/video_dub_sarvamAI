'use client';

import AudioTrack, { Dimensions, SpeakerToggle } from '@/components/customUI/AudioTrack';
import Slider from '@/components/customUI/Slider';
import { updateDubClip } from '@/redux/features/appSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { forwardRef, useEffect } from 'react';

// eslint-disable-next-line react/display-name
const AudioContainer = forwardRef<
  HTMLDivElement,
  {
    activeId: number;
    isFileUploaded: boolean;
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
      activeId,
      isFileUploaded,

      sliderValue = 0,
      sliderMin = 0,
      sliderMax = 100,
      sliderStep = 0.001,
      onMouseUp,
      // onValueChange,
    },
    dubAudioTrackRef
  ) => {
    const dispatch = useAppDispatch();
    const isAudioLoading = useAppSelector((state) => state.appState.isAudioLoading);
    const clips = useAppSelector((state) => state.appState.clips);
    const dubClips = useAppSelector((state) => state.appState.dubClips);

    const updateClip = (index: number, dimensions: Dimensions) => {
      dispatch(updateDubClip({ index, dimensions }));
    };

    useEffect(() => {
      console.log('dub', dubClips);
    }, [dubClips]);

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
          <AudioTrack
            height={36}
            clips={dubClips}
            ref={dubAudioTrackRef}
            activeId={activeId}
            onDragStop={updateClip}
            onResizeStop={updateClip}
          />
          <AudioTrack height={36} clips={clips} classname="select-none pointer-events-none " activeId={-1} />
        </div>
      </div>
    );
  }
);

export default AudioContainer;
