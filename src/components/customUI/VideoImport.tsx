'use client';

import { cn } from '@/utils/cn';
import { Pause, Play } from 'lucide-react';
import { useState, useRef, forwardRef } from 'react';

const VideoImport = ({ className = '' }: { className?: string }) => {
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProgress(0);
    setUploading(true);
    setFileName(file.name);

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        const uploadedPath = `/uploads/${res.file}`;
        setVideoUrl(uploadedPath);
      } else {
        alert('❌ Upload failed.');
      }
      setUploading(false);
    };

    xhr.onerror = () => {
      alert('❌ Upload error.');
      setUploading(false);
    };

    xhr.send(formData);
  };

  return (
    <div className={cn('w-full h-[50vh] flex flex-col ', className)}>
      <div className="grow flex-center">
        {videoUrl ? (
          <Video ref={videoRef} src={videoUrl} />
        ) : (
          <Import
            onUpload={handleUpload}
            text="Upload the Video you want to Dub"
            className={uploading ? 'pointer-events-none' : ''}
          />
        )}
      </div>
      <div className="h-8">
        {videoUrl ? (
          <div className="caption text-center content-center flex justify-between">
            <button
              className={cn(
                'flex body-sm justify-between items-center gap-1 px-3 py-1 rounded text-white bg-svm-9 hover:bg-svm-8 outline-none'
              )}
            >
              Delete
            </button>
            <button
              className={cn(
                'flex body-sm  justify-between items-center gap-1  px-3 py-1 rounded text-white bg-svm-9 hover:bg-svm-8 outline-none'
              )}
              onClick={() => {
                const video = videoRef.current;
                if (video) {
                  if (video.paused) {
                    video.play();
                    setIsPlaying(true);
                  } else {
                    video.pause();
                    setIsPlaying(false);
                  }
                }
              }}
            >
              {isPlaying ? (
                <Pause
                  className="w-5 h-5 text-white"
                  stroke="none"
                  fill="currentColor"
                />
              ) : (
                <Play
                  className="w-5 h-5 text-white"
                  stroke="none"
                  fill="currentColor"
                />
              )}
            </button>
            <button
              className={cn(
                'flex body-sm  justify-between items-center gap-1  px-3 py-1 rounded text-white bg-svm-9 hover:bg-svm-8 outline-none'
              )}
            >
              Export
            </button>
          </div>
        ) : (
          <ProgressBar progress={progress} bgClass="h-8" />
        )}
      </div>
    </div>
  );
};

export const ProgressBar = ({
  progress,
  bgClass = '',
  barClass = '',
}: {
  progress: number;
  bgClass?: string;
  barClass?: string;
}) => {
  return (
    <div
      className={cn('w-full bg-svm-2 h-4 rounded-sm overflow-hidden', bgClass)}
    >
      <div
        className={cn('h-full bg-svm-8 transition-all', barClass)}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export const Import = ({
  onUpload,
  text,
  themeClass = '',
  className = '',
}: {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  themeClass?: string;
  className?: string;
}) => {
  return (
    <div className={cn('flex-center flex-col h-full w-full', className)}>
      {/* Import button */}
      <label className="mb-2">
        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={onUpload}
        />
        {/* Circle with plus icon */}
        <div
          className={cn(
            'w-16 h-16 rounded-full text-svm-8 hover:text-svm-2 bg-svm-2 hover:bg-svm-8 flex items-center justify-center mb-4',
            themeClass
          )}
        >
          <span className="text-4xl">+</span>
        </div>
      </label>
      {/* Instruction text */}
      <p className="caption text-gray-700 mb-2">{text}</p>
    </div>
  );
};

interface VideoProps {
  className?: string;
  src: string;
}

// eslint-disable-next-line react/display-name
export const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ className = '', src }, videoRef) => {
    return (
      <video
        ref={videoRef}
        src={src}
        controls
        controlsList="nodownload nofullscreen"
        disablePictureInPicture
        disableRemotePlayback
        onRateChange={() => {
          if (typeof videoRef !== 'function' && videoRef?.current) {
            const video = videoRef.current;
            if (video.playbackRate !== 1) {
              video.playbackRate = 1;
            }
          }
        }}
        className={cn('w-full aspect-video', className)}
      />
    );
  }
);

export default VideoImport;
