import { cn } from '@/lib/utils'
import React from 'react'
import SidebarItems from './SidebarItems'
const voacabularyIcon = {
    src: (
        <svg svg width="76" height="76" fill="#1665e3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
            <path d="M11.72 15.25h2.09l-5.11-13H6.84l-5.11 13h2.09l1.12-3h5.64l1.14 3Zm-6.02-5 2.07-5.52 2.07 5.52H5.7Zm15.16.59-8.09 8.09-3.67-3.68-1.41 1.41 5.09 5.09 9.49-9.5-1.41-1.41Z"></path>
        </svg >
    )
}
const Sidebar = () => {

    return (
        <div
            className={cn(
                "left-0 top-[7.8em] flex h-full flex-col border-r-2 px-4 lg:fixed w-[14em] shadow-lg",
            )}
        >
            <div className="flex flex-1 flex-col gap-y-2">
                <SidebarItems label="Learn" href="/learn" iconSrc="/learn.svg" />
                <SidebarItems
                    label="Leaderboard"
                    href="/leaderboard"
                    iconSrc="/leaderboard.svg"
                />
                <SidebarItems label="Live Programs" href="/live-programs" iconSrc="/live programs.svg" />
                <SidebarItems label="Events" href="/events" iconSrc="/Events.svg" />

                <p className='text-center text-xl text-gray-800 font-semibold'>Lessons</p>
                <SidebarItems label="Vocabulary" href="/vocabulary" iconSrc={
                    voacabularyIcon.src
                } />
                <SidebarItems label="Grammar" href="/grammar" iconSrc={
                    <svg width="76" height="76" fill="#1665e3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.72 15.25h2.09l-5.11-13H6.84l-5.11 13h2.09l1.12-3h5.64l1.14 3Zm-6.02-5 2.07-5.52 2.07 5.52H5.7Zm15.16.59-8.09 8.09-3.67-3.68-1.41 1.41 5.09 5.09 9.49-9.5-1.41-1.41Z"></path>
                    </svg>
                } />

            </div>
        </div>
    )
}

export default Sidebar