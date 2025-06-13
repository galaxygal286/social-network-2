import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return <>
        <div className='min-h-screen flex justify-center'>
            <div className='flex w-full max-w-[1300px] px-6'>
                <div className='w-full max-w-[275px]'>
                    <div className='fixed top-0 w-full max-w-[275px] border-r border-gray-100 '>
                        <Header/>
                    </div>
                </div>
                <main className='w-full max-w-[600px]'>
                    {children}
                </main>
            </div>
        </div>
    </>
};

export default Layout;