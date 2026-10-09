import React from 'react'

const Navbar = () => {
  return (
    
      <nav className=' flex  justify-between  bg-slate-400  text-white p-5'>
        <div className='logo' >
            <span className='font-bold  text-xl mx-[50px]:'>Itask</span>
        </div>
        <ul className=' flex  gap-10 max-[50px]'>
            <li className=' cursor-pointer hover:font-bold '>home</li>
            <li className=' cursor-pointer hover:font-bold'>Your task</li>
        </ul>

      </nav>
  
  )
}

export default Navbar
