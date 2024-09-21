import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

function HeroSection() {
  return (
    <div >
        <div className='flex mx-auto max-w-fit items-center justify-center  text-[#F83002] px-4 py-2 rounded-full bg-gray-100 font-semibold'>
            No. 1 Job Hunt Website
        </div>
        <div className='flex flex-col items-center justify-center text-center my-16'>
            <h1 className='text-5xl font-bold my-5'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span> </h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia nobis perferendis enim unde fugiat aperiam molestias hic minima? Voluptatibus, aliquam.</p>
        </div>
        <div className='flex mx-auto  w-[40%] items-center justify-center shadow-lg rounded-full pl-2 '>
            <input 
                type='text'
                placeholder='Find your dream jobs'
                className='outline-none border-none  w-full rounded-full font-medium text-lg px-5'
            />
            <Button className='rounded-r-full bg-[#6A38C2]'> 
                <Search className='h-5 w-5 ' />
            </Button>
        </div>
    </div>

  )
}

export default HeroSection