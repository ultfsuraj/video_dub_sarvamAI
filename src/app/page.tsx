'use client';

import { cn } from '@/utils/cn';
import { delay } from '@/utils/delay';

async function handleBoxClick(boxNumber: number) {
  await delay(1000);
  alert(`Box ${boxNumber} clicked!`);
}

function Boxes() {
  return (
    <>
      <div onClick={() => handleBoxClick(1)} className="p-2 bg-svm-1 h-20 w-20">
        1
      </div>
      <div onClick={() => handleBoxClick(2)} className="p-2 bg-svm-1 h-20 w-20">
        2
      </div>
      <div onClick={() => handleBoxClick(3)} className="p-2 bg-svm-1 h-20 w-20">
        3
      </div>
      <div onClick={() => handleBoxClick(4)} className="p-2 bg-svm-1 h-20 w-20">
        4
      </div>
      <div
        onClick={() => handleBoxClick(5)}
        className={cn(
          'p-2 bg-svm-1 h-20 w-20',
          `border border-svm-${6} shadow-xl`
        )}
      >
        5
      </div>
      <div className="p-2 bg-svm-1 h-20 w-20">-</div>
      <div className="p-2 bg-svm-1 h-20 w-20">-</div>
      <div className="p-2 bg-svm-1 h-20 w-20">-</div>
      <div className="p-2 bg-svm-1 h-20 w-20">-</div>
    </>
  );
}

function App() {
  return (
    <div className="border-2 border-black w-2xs h-96 p-2 flex flex-wrap justify-around items-around">
      <Boxes />
    </div>
  );
}

export default App;
