'use client';

import { forwardRef, useEffect, useState } from 'react';
import { Rnd, RndDragCallback, RndResizeCallback } from 'react-rnd';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/utils/cn';

export type Dimensions = {
  width: number;
  x: number;
};

export type AudioTrackProps = {
  height: number;
  activeId?: number;
  classname?: string;
  clips: Array<{ width: number; x: number }>;
  onDragStop?: (id: number, dimentions: Dimensions) => void;
  onResizeStop?: (id: number, dimentions: Dimensions) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  bgClass?: string;
  bgHoverClass?: string;
  borderClass?: string;
};

// eslint-disable-next-line react/display-name
const AudioTrack = forwardRef<HTMLDivElement, AudioTrackProps>(
  ({ height, activeId = 0, clips, classname, onDragStop, onResizeStop }, ref) => {
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {}, [activeId]);

    return (
      <div className="w-full flex-center">
        <SpeakerToggle height={height} onClick={() => setIsMuted(!isMuted)} />
        <div
          ref={ref}
          className={cn(
            'relative w-full border-l-1 border-r-1 rounded-md border-gray-400 relative overflow-hidden p-2 min-h-[20px]',
            isMuted ? 'opacity-60 pointer-events-none' : '',
            classname
          )}
          style={{ height: `${height}px` }}
        >
          <div className="absolute top-1/2 left-0 w-full border-t border-gray-400" />
          {/* calculate x and width for each clip */}
          {clips.map((_, index) => (
            // if activeid and not muted then highlight
            <Clip
              id={index}
              key={index}
              height={height}
              clips={clips}
              bgClass={!isMuted && activeId === index ? 'bg-svm-3' : 'bg-svm-2'}
              onDragStop={onDragStop}
              onResizeStop={onResizeStop}
            />
          ))}
        </div>
      </div>
    );
  }
);

// Clip component that represents the draggable and resizable audio track

export type ClipProps = { id: number } & AudioTrackProps;
// return new x and width of clip
function getBounds(
  clips: Array<{ width: number; x: number }>,
  id: number,
  x: number,
  width: number,
  drag: boolean
): {
  x: number;
  width: number;
} {
  if (clips.length === 1) {
    return { x, width };
  }
  let left = x;
  let right = x + width;
  const prevRight = id > 0 ? clips[id - 1].x + clips[id - 1].width : 0;
  const nextLeft = id < clips.length - 1 ? clips[id + 1].x : Infinity;

  if (left <= prevRight) {
    left = prevRight;
    if (drag) {
      right = left + width - 1;
    }
  }
  if (right >= nextLeft) {
    right = nextLeft;
    if (drag) {
      left = right - width + 1;
    }
  }

  // clips[id].x = left;
  // clips[id].width = right - left + 1;

  // return clips[id];
  return { x: left, width: right - left + 1 };
}

export const Clip = ({
  id,
  height,
  clips,
  onDragStop,
  onResizeStop,
  onMouseEnter,
  onMouseLeave,
  bgClass = 'bg-svm-2',
  bgHoverClass = 'hover:bg-svm-3',
  borderClass = 'border-svm-9',
}: ClipProps) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: clips[id].width,
    x: clips[id].x,
  });

  const handleDragStop: RndDragCallback = (e, d) => {
    const bounds = getBounds(clips, id, d.x, dimensions.width, true);

    setDimensions((prev) => ({ ...prev, x: bounds.x }));
    if (onDragStop) {
      onDragStop(id, bounds);
    }
  };

  const handleResizeStop: RndResizeCallback = (e, direction, ref, delta, position) => {
    const bounds = getBounds(clips, id, position.x, ref.offsetWidth, false);

    setDimensions({
      width: bounds.width,
      x: bounds.x,
    });
    if (onResizeStop) {
      onResizeStop(id, bounds);
    }
  };

  return (
    <Rnd
      size={{ width: dimensions.width, height }}
      position={{ x: dimensions.x, y: 0 }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      bounds="parent"
      enableResizing={{
        left: true,
        right: true,
        top: false,
        bottom: false,
        topLeft: false,
        topRight: false,
        bottomLeft: false,
        bottomRight: false,
      }}
      dragAxis="x"
      disableDragging={false}
      style={{}}
      className={cn(
        ' border-l-2 border-r-2 rounded-md text-center content-center min-h-[20px] min-w-0',
        bgClass,
        bgHoverClass,
        borderClass
      )}
      onMouseEnter={() => {
        if (onMouseEnter) {
          onMouseEnter();
        }
      }}
      onMouseLeave={() => {
        if (onMouseLeave) {
          onMouseLeave();
        }
      }}
    >
      <div className="w-full h-1/2 bg-repeat-x bg-center bg-[url('/sound.svg')] bg-[length:auto_100%]"></div>
    </Rnd>
  );
};

interface SpeakerToggleProps {
  height: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export const SpeakerToggle = ({ height, color = 'text-svm-9', className, onClick }: SpeakerToggleProps) => {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
        setIsMuted(!isMuted);
      }}
      className={cn('mr-2', className)}
      aria-label={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? (
        <VolumeX className={cn(color)} style={{ height: `${0.6 * height}px`, width: `${0.6 * height}px` }} />
      ) : (
        <Volume2 className={cn(color)} style={{ height: `${0.6 * height}px`, width: `${0.6 * height}px` }} />
      )}
    </button>
  );
};

export default AudioTrack;
