'use client';

import Text from '@/components/customUI/Text';
import { delay } from '@/utils/delay';

const clickDelay = async (): Promise<void> => {
  await delay(1500);
};

function App() {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-3 border-2 bg-gray-100 border-black w-1/2  px-4 py-6 flex flex-wrap justify-around items-around">
      <Text text="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      <Text
        text="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        buttonProps={{
          btnText: 'Generate Audio',
          loadingTxt: 'Generating...',
          onClick: clickDelay,
        }}
      />
      <Text text="lorem ipsum dolor sit amet," />
      <Text
        text="lorem ipsum dolor sit amet,"
        buttonProps={{
          btnText: 'Generate Audio',
          loadingTxt: 'Generating...',
          onClick: clickDelay,
        }}
      />
      <Text text="lorem ipsum dolor sit amet, labore et dolore magna aliqua." />
      <Text
        text="lorem ipsum dolor sit amet,  labore et dolore magna aliqua."
        buttonProps={{
          btnText: 'Generate Audio',
          loadingTxt: 'Generating...',
          onClick: clickDelay,
        }}
      />
      <Text text="consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      <Text
        text="consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        buttonProps={{
          btnText: 'Generate Audio',
          loadingTxt: 'Generating...',
          onClick: clickDelay,
        }}
      />
    </div>
  );
}

export default App;
