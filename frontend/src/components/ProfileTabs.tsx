import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'

const ProfileTabs=()=>{
    return <>
    <TabGroup>
      <TabList>
        <Tab className='outline-none'>
          {({ hover,selected }) => (
              <button
              className={clsx('flex justify-center px-7 cursor-pointer', hover && 'bg-gray-200')}>
                <div className={clsx('h-[53px] flex items-center border-[#1d9bf0] font-bold text-gray-400',selected && 'border-b-[4px] text-gray-700')}>
                    <span>Posts</span>
                </div>
            </button>
                )}
        </Tab>
        <Tab className='outline-none'>
          {({ hover,selected }) => (
              <button
              className={clsx('flex justify-center px-7 cursor-pointer', hover && 'bg-gray-200')}>
                <div className={clsx('h-[53px] flex items-center border-[#1d9bf0] font-bold text-gray-400',selected && 'border-b-[4px] text-gray-700')}>
                    <span>Media</span>
                </div>
            </button>
                )}
        </Tab>
        <Tab className='outline-none'>
          {({ hover,selected }) => (
              <button
              className={clsx('flex justify-center px-7 cursor-pointer', hover && 'bg-gray-200')}>
                <div className={clsx('h-[53px] flex items-center border-[#1d9bf0] font-bold text-gray-400',selected && 'border-b-[4px] text-gray-700')}>
                    <span>Likes</span>
                </div>
            </button>
                )}
        </Tab>
      </TabList>
      <TabPanels className='px-7 pt-2'>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </TabGroup>
    </>
}

export default ProfileTabs