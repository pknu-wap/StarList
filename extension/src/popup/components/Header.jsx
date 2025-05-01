import React from 'react'

// import Settings from "./Settings"
// import Userprofile from "./Userprofile"

function Header() {
    return (
        <header className='w-full h-16 flex items-center justify-between px-6 bg-white'>
            <div className='w-full col-span-2'>
                <p className='w-text-[70px] leading-none font-bold text-black'>Starlist</p>
            </div>
            <div className='w-full'>
                <Userprofile></Userprofile>
                <Settings></Settings>
            </div>
        </header>
    );
}

export default Header;