'use client';

import { cn } from '@/utils/cn';
import { Pause, Play } from 'lucide-react';
import { useState, forwardRef } from 'react';

interface VideoImportProps {
  className?: string;
  setFileImported: (x: boolean) => void;
  setFileName: (x: string) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onTimeUpdate?: () => void;
}

// eslint-disable-next-line react/display-name
const VideoImport = forwardRef<HTMLVideoElement, VideoImportProps>(
  ({ className = '', setFileImported, setFileName, onPlay, onPause, onTimeUpdate }, videoRef) => {
    const [progress, setProgress] = useState(0);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
      if (onPlay) {
        onPlay();
      }
      setIsPlaying(true);
    };
    const handlePause = () => {
      if (onPause) {
        onPause();
      }
      setIsPlaying(false);
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setProgress(0);
      setUploading(true);
      setFileName(file.name);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'sarvamAI');

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.cloudinary.com/v1_1/dk0zrgo5i/video/upload', true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent - 1);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          console.log(res.secure_url);
          setVideoUrl(res.secure_url);
        } else {
          alert('❌ Upload failed.');
          window.location.reload();
        }
        setUploading(false);
        setFileImported(true);
      };

      xhr.onerror = () => {
        alert('❌ Upload error.');
        setUploading(false);
        setFileImported(false);
      };

      xhr.send(formData);
    };

    return (
      <div className={cn('w-full h-[50vh] flex flex-col ', className)}>
        <div className="grow flex-center">
          {videoUrl ? (
            <Video
              ref={videoRef}
              src={videoUrl}
              onPlay={handlePlay}
              onPause={handlePause}
              onTimeUpdate={onTimeUpdate}
            />
          ) : (
            <Import
              onUpload={handleUpload}
              text="Upload the Video you want to Dub"
              className={uploading ? 'pointer-events-none text-center' : 'text-center'}
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
                  const video = videoRef?.current;
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
                  <Pause className="w-5 h-5 text-white" stroke="none" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5 text-white" stroke="none" fill="currentColor" />
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
  }
);

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
    <div className={cn('w-full bg-svm-2 h-4 rounded-sm overflow-hidden', bgClass)}>
      <div className={cn('h-full bg-svm-8 transition-all', barClass)} style={{ width: `${progress}%` }} />
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
        <input type="file" accept="video/*" className="hidden" onChange={onUpload} />
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
  onPlay?: () => void;
  onPause?: () => void;
  onTimeUpdate?: () => void;
}

// eslint-disable-next-line react/display-name
export const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ className = '', src, onPlay, onPause, onTimeUpdate }, videoRef) => {
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
        onPlay={onPlay}
        onPause={onPause}
        onTimeUpdate={onTimeUpdate}
        className={cn('w-full aspect-video', className)}
      />
    );
  }
);

export default VideoImport;
