import React from 'react'
import Logo from "./Logo"

function Header() {
  return (
    <div className="flex justify-start items-center w-screen">
        <Logo />
        <h1 className='text-[#DFD9FF] text-[26px] font-bold ml-[20px]'>AI Assistant</h1>
    </div>
  )
}

export default Header