import React, { useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
// import profile from '../assets/react.svg'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJob from './AppliedJob'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'

// const skills = ["HTML", 'CSS', 'JavaScript', 'React Js'];
const isResume = true;



function Profile() {
    const {user} = useSelector(store => store.auth)
    const [open, setOpen] = useState(false);
    // const skills = user?.profile?.skills;

    return (
        <div>
            <div className='max-w-7xl mx-auto border border-gray-200 rounded-2xl my-5 p-8' >
                <div className='flex justify-between items-center' >
                    <div className='flex items-center gap-4'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={user?.profile?.profilePhoto} alt='profile pic' />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p className='italic'> {user?.profile?.bio} </p>
                        </div>
                    </div>
                    <Button variant='outline' onClick={() => setOpen(true)} ><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-medium'>Skills</h1>
                    <div className='flex items-center gap-1 my-2'>
                        {
                            user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge className={`px-4`} key={index} >{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer' >{user?.profile?.resumeOriginalName}</a> : <p>NA</p>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto rounded-2xl'>
                <p className='capitalize font-bold '>{'applied job'}</p>
                {/* Appliedjob */}
                <AppliedJob />

            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}  />
        </div>

    )
}

export default Profile