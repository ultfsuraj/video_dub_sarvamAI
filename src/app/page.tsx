'use client';

import { useEffect, useRef, useState } from 'react';

import VideoImport from '@/components/customUI/VideoImport';
import TranscriptContainer from '@/containers/TranscriptContainer';

import DropDown from '@/components/customUI/DropDown';
import CustomLoader from '@/components/customUI/Loader';
import { LANGUAGES } from '@/utils/constants';

import AudioContainer from '@/containers/AudioContainer';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchAudioClip,
  fetchDubAudioClips,
  fetchDubScripts,
  fetchScripts,
  resetDubClips,
} from '@/redux/features/appSlice';

//  user flow

const App = () => {
  const dispatch = useAppDispatch();
  const dubClips = useAppSelector((state) => state.appState.dubClips);
  const isScriptLoading = useAppSelector((state) => state.appState.isScriptLoading);

  const [isFileImported, setFileImported] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('Unknown.mp4');
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [activeId, setActiveId] = useState<number>(-1);
  const [dubLang, setDubLang] = useState<string>(LANGUAGES[0]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const dubAudioTrackRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const uploadFlow = async () => {
    dispatch(fetchScripts());
    dispatch(fetchDubScripts(dubLang));
    dispatch(fetchAudioClip());
    dispatch(fetchDubAudioClips(dubLang));
  };

  useEffect(() => {
    if (isFileImported) {
      uploadFlow();
    }
  }, [isFileImported]);

  return (
    // main container
    <div className="h-[100vh] w-[100vw] px-10 py-2 flex-center flex-col gap-2 bg-neutral-50 text-center">
      <div className="w-full flex-center h-10 flex heading-xl pt-6 pb-14 text-svm-10 ">
        Sarvam AI : Video Dubbing Tool
      </div>

      {/* top */}
      <div className="w-full h-10 flex body-strong">
        <div className="w-[31%] flex-center ">
          {isScriptLoading ? (
            <CustomLoader
              text="Detecting Language..."
              spinnerClass="[animation-duration:1.5s]"
              className="caption text-gray-700"
            />
          ) : (
            'English'
          )}
        </div>
        <div className="w-[31%] flex-center">
          <DropDown
            items={LANGUAGES}
            triggerClass="outline-none border-none h-6"
            dropdownContentClass="border border-svm-9 bg-neutral-50"
            onSelect={(lang) => {
              if(!isFileImported)return;
              setDubLang(lang);
              dispatch(resetDubClips());
              dispatch(fetchDubScripts(lang));
              dispatch(fetchDubAudioClips(lang));
            }}
          />
        </div>
        <div className="w-[38%] flex-center text-gray-600 text-center ">{fileName}</div>
      </div>
      {/* middle */}
      <div className="w-full h-[50vh] flex growjustify-between gap-2 ">
        {/* left half */}
        <TranscriptContainer ref={textRefs} isFileUploaded={isFileImported} activeId={activeId} />
        {/* right half */}
        <div className=" w-[38%] drop-shadow-lg rounded-md">
          <VideoImport
            ref={videoRef}
            setFileImported={(val) => setFileImported(val)}
            setFileName={(val) => setFileName(val)}
            onTimeUpdate={() => {
              const video = videoRef.current;

              if (video && video.duration) {
                // set slide
                setSliderValue((video.currentTime / video.duration) * 100);

                // filter Dub audio clips to play and highlight
                const dubAudio = dubAudioTrackRef.current;
                let activeIndex = -1;
                if (dubAudio) {
                  const pos = (sliderValue / 100) * dubAudio.offsetWidth;
                  for (let i = 0; i < dubClips.length; i++) {
                    const { x, width } = dubClips[i];
                    if (pos > x && pos < x + width) {
                      activeIndex = i;
                      break;
                    }
                  }
                }
                // text highlighted based on activeindex
                setActiveId(activeIndex);
              }
            }}
            className="h-full"
          />
        </div>
      </div>
      {/* bottom */}
      <AudioContainer
        ref={dubAudioTrackRef}
        activeId={activeId}
        isFileUploaded={isFileImported}
        sliderValue={sliderValue}
        onMouseUp={(val: number) => {
          console.log('slider', val);
          setSliderValue(val);
          const video = videoRef.current;
          if (video && video.duration) {
            video.currentTime = (val / 100) * video.duration;
          }
          const dubAudio = dubAudioTrackRef.current;
          let activeIndex = -1;
          if (dubAudio) {
            const pos = (sliderValue / 100) * dubAudio.offsetWidth;
            for (let i = 0; i < dubClips.length; i++) {
              const { x, width } = dubClips[i];
              if (pos > x && pos < x + width) {
                activeIndex = i;
                break;
              }
            }
          }
          // text highlighted based on activeindex
          setActiveId(activeIndex);
        }}
        // onValueChange={(val) => {
        //   setSliderValue(val);
        // }}
      />
    </div>
  );
};

export default App;
