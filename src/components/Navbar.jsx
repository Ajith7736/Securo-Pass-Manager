import React from 'react'
import { FaGithub } from "react-icons/fa";
function Navbar() {
  return (
    <div className='flex  p-3 justify-between items-center'>
        <div className="logo font-extrabold text-2xl">Securo</div>
        <div className="git flex items-center gap-3 text-black bg-white px-3 py-1 rounded-full hover:bg-transparent hover:text-white hover:outline hover:outline-3 hover:outline-white transition-bg ease-in-out">
            <div><FaGithub /></div>
           <div className='font-bold'>Github </div>
            </div>
    </div>
  )
}

export default Navbar