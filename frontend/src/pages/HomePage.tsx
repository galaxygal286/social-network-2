import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import Layout from "../components/Layout"
import CreatePost from "../components/CreatePost"
import Post from "../components/Post"
import usePostStore from '../store/postStore'
import { useEffect } from 'react'
import Spinner from '../components/Spinner'

const HomePage=()=>{
    const { posts,fetchPosts } = usePostStore();
    useEffect(()=>{
        fetchPosts(1,10)
    },[])
    return <>
        <Layout>
        <TabGroup>
            <TabList className='flex'>
                <Tab className='outline-none flex-1'>
                {({ hover,selected }) => (
                    <button
                    className={clsx('block w-full flex justify-center px-7 cursor-pointer', hover && 'bg-gray-200')}>
                        <div className={clsx('h-[53px] flex items-center border-[#1d9bf0] font-bold text-gray-400',selected && 'border-b-[4px] text-gray-700')}>
                            <span>For you</span>
                        </div>
                    </button>
                        )}
                </Tab>
                <Tab className='outline-none flex-1'>
                {({ hover,selected }) => (
                    <button
                    className={clsx('block w-full flex justify-center px-7 cursor-pointer', hover && 'bg-gray-200')}>
                        <div className={clsx('h-[53px] flex items-center border-[#1d9bf0] font-bold text-gray-400',selected && 'border-b-[4px] text-gray-700')}>
                            <span>Following</span>
                        </div>
                    </button>
                        )}
                </Tab>
            </TabList>
            <TabPanels className='pt-2'>
                <TabPanel>
                    <div>
                        <CreatePost/>
                    </div>
                    <div >
                        {posts.map((post:any)=><>
                            <Post data={post}/>
                        </>)}
                    </div>
                    {posts.length===0&&<>
                        <div className='flex items-center justify-center pt-5'>
                            <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </>}
                </TabPanel>
                <TabPanel></TabPanel>
            </TabPanels>
            </TabGroup>
        </Layout>
    </>
}

export default HomePage