import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

function UpdateProfileDialog({ open, setOpen }) {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    })

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("input", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
        setOpen(false)
        console.log(input);

    }

    return (
        <div>
            <Dialog open={open} >
                <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)} >

                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                        <DialogDescription>
                            This will update your profile
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className='text-right' >Name</Label>
                                <Input
                                    id='name'
                                    name='name'
                                    onChange={changeEventHandler}
                                    value={input.fullname}
                                    className='col-span-3'
                                    type='text'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className='text-right' >Email</Label>
                                <Input
                                    id='email'
                                    name='email'
                                    onChange={changeEventHandler}
                                    type='email'
                                    value={input.email}
                                    className='col-span-3'
                                    placeholder='Enter email here'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className='text-right' >Number</Label>
                                <Input
                                    id='number'
                                    name='number'
                                    onChange={changeEventHandler}
                                    value={input.phoneNumber}
                                    className='col-span-3'
                                    type='number'

                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className='text-right' >Bio</Label>
                                <Input
                                    id='bio'
                                    name='bio'
                                    onChange={changeEventHandler}
                                    value={input.bio}
                                    className='col-span-3'
                                    type='text'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className='text-right' >Skills</Label>
                                <Input
                                    id='skills'
                                    name='skills'
                                    onChange={changeEventHandler}
                                    value={input.skills}
                                    className='col-span-3'
                                    type='text'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className='text-right' >Resume</Label>
                                <Input
                                    id='file'
                                    name='file'
                                    onChange={fileChangeHandler}
                                    value={input.resume}
                                    className='col-span-3'
                                    type='file'
                                    accept='application/pdf'
                                />
                            </div>

                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> :
                                    <Button className="w-full my-4" >Update</Button>

                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog