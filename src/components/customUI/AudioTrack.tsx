import { useState } from 'react';
import { Rnd, RndDragCallback, RndResizeCallback } from 'react-rnd';
import { cn } from '@/utils/cn';

interface Dimensions {
  width: number;
  x: number;
}

interface AudioTrackProps {
  height: number;
  clips: Array<{ width: number; x: number }>;
}

// return new x and width of clip
function getBounds(
  clips: Array<{ width: number; x: number }>,
  id: number,
  x: number,
  width: number
): {
  x: number;
  width: number;
} {
  return { x: x, width: width };
}

const AudioTrack: React.FC<AudioTrackProps> = ({ height, clips }) => {
  return (
    <div
      id="container"
      className={cn(
        'w-full border border-gray-400 relative overflow-hidden p-2 min-h-[20px]'
      )}
      style={{ height: `${height}px` }}
    >
      {/* calculate x and width for each clip */}
      {clips.map((_, index) => (
        <Clip id={index} key={index} height={height} clips={clips} />
      ))}
    </div>
  );
};

// Clip component that represents the draggable and resizable audio track

interface ClipProps {
  id: number;
  height: number;
  clips: Array<{ width: number; x: number }>;
  onDragStop?: () => void;
  onResizeStop?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  bgClass?: string;
  bgHoverClass?: string;
  borderClass?: string;
}

const Clip = ({
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
    const bounds = getBounds(clips, id, d.x, dimensions.width);

    setDimensions((prev) => ({ ...prev, x: bounds.x }));
    if (onDragStop) {
      onDragStop();
    }
  };

  const handleResizeStop: RndResizeCallback = (
    e,
    direction,
    ref,
    delta,
    position
  ) => {
    const bounds = getBounds(clips, id, position.x, ref.offsetWidth);

    setDimensions({
      width: bounds.width,
      x: bounds.x,
    });
    if (onResizeStop) {
      onResizeStop();
    }
    console.log('width', ref.offsetWidth);
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
        ' border-l-2 border-r-2  rounded-md text-center content-center min-h-[20px] min-w-0',
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
    ></Rnd>
  );
};

export default AudioTrack;
