'use client';

import { cn } from '../utils/cn';

function Boxes() {
  return (
    <>
      <div className="p-2 bg-svm-1 h-20 w-20">-</div>
      <div className="p-2 bg-svm-1 h-20 w-20">-</div>
      <div className="p-2 bg-svm-1 h-20 w-20">-</div>
      <div className="p-2 bg-svm-1 h-20 w-20">-</div>
      <div
        className={cn(
          'p-2 bg-svm-1 h-20 w-20',
          `border border-svm-${6} shadow-xl`
        )}
      >
        -
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
