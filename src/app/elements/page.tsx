'use client';

import Text from '@/components/customUI/Text';
import { delay } from '@/utils/delay';

const clickDelay = async (val: string): Promise<void> => {
  await delay(1500);
  console.log(val);
};

const page = () => {
  return (
    <div className="w-1/2">
      {/* Text Component */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-3 border-1 bg-gray-100 border-black w-full  px-4 py-6 flex flex-wrap justify-around items-around">
        <Text text="lorem ipsum dolor sit amet, consectetur adipiscing elit.." />
        <Text
          text="lorem ipsum dolor sit amet"
          buttonProps={{
            btnText: 'Generate Audio',
            loadingTxt: 'Generating...',
            onClick: clickDelay,
          }}
        />
      </div>
    </div>
  );
};

export default page;
