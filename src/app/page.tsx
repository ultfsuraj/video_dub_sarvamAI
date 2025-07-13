'use client';

import { useEffect, useRef, useState } from 'react';

import Slider from '@/components/customUI/Slider';
import AudioTrack, { SpeakerToggle } from '@/components/customUI/AudioTrack';
import VideoImport from '@/components/customUI/VideoImport';
import TranscriptContainer from '@/containers/TranscriptContainer';

import { delay } from '@/utils/delay';
import DropDown from '@/components/customUI/DropDown';
import CustomLoader from '@/components/customUI/Loader';
import { SCRIPT_CLIPS, DUB_CLIPS, DUB_SCRIPTS, LANGUAGES, SCRIPTS } from '@/utils/constants';

import type { ClipType, ScriptType } from '@/utils/constants';
import AudioContainer from '@/containers/AudioContainer';

//  user flow

const App = () => {
  const [isTranscriptLoading, setTranscriptLoading] = useState<boolean>(false);
  const [isTranslationLoading, setTranslationLoading] = useState<boolean>(false);
  const [isAudioLoading, setAudioLoading] = useState<boolean>(false);
  const [isDubAudioLoading, setDubAudioLoading] = useState<boolean>(false);

  const [isFileUploaded, setFileUploaded] = useState<boolean>(false);
  const [scripts, setScripts] = useState<Array<ScriptType>>([]);
  const [dubScripts, setDubScripts] = useState<Array<ScriptType>>([]);
  const [clips, setClips] = useState<Array<ClipType>>([]);
  const [dubClips, setDubClips] = useState<Array<ClipType>>([]);

  const uploadFlow = async () => {
    await delay(1000);
    setFileUploaded(true);
    setTranscriptLoading(true);
    setAudioLoading(true);
    await delay(2000);
    setClips(SCRIPT_CLIPS);
    setAudioLoading(false);
    await delay(700);
    setScripts(SCRIPTS);
    setTranscriptLoading(false);
    setTranslationLoading(true);
    setDubAudioLoading(true);
    await delay(2000);
    setDubScripts(DUB_SCRIPTS);
    setTranslationLoading(false);
    await delay(800);
    setDubClips(DUB_CLIPS);
    setDubAudioLoading(false);
  };

  useEffect(() => {
    uploadFlow();
  }, []);

  return (
    // main container
    <div className="h-[100vh] w-[100vw] px-10 py-2 flex-center flex-col gap-2 bg-slate-100">
      <div className="w-full flex-center h-10 flex heading-xl pt-6 pb-14 text-svm-10 ">Sarvam AI : Video Dubbing Tool</div>

      {/* top */}
      <div className="w-full h-10 flex body-strong">
        <div className="w-[31%] flex-center ">
          {isTranscriptLoading ? (
            <CustomLoader text="Detecting Language..." spinnerClass="[animation-duration:1.5s]" className="caption text-gray-700" />
          ) : (
            'English'
          )}
        </div>
        <div className="w-[31%] flex-center">
          <DropDown items={LANGUAGES} triggerClass="outline-none border-none h-6" dropdownContentClass="border border-svm-9 bg-slate-100" />
        </div>
        <div className="w-[38%] flex-center text-gray-600">Unknown.mp4</div>
      </div>
      {/* middle */}
      <div className="w-full h-[50vh] flex growjustify-between gap-2 ">
        {/* left half */}
        <TranscriptContainer
          scripts={scripts}
          dubScripts={dubScripts}
          isFileUploaded={isFileUploaded}
          isTranscriptLoading={isTranscriptLoading}
          isTranslationLoading={isTranslationLoading}
        />
        {/* right half */}
        <div className=" w-[38%] drop-shadow-lg rounded-md">
          <VideoImport className="h-full" />
        </div>
      </div>
      {/* bottom */}
      <AudioContainer
        clips={clips}
        dubClips={dubClips}
        isFileUploaded={isFileUploaded}
        isAudioLoading={isAudioLoading}
        isDubAudioLoading={isDubAudioLoading}
      />
    </div>
  );
};

export default App;
