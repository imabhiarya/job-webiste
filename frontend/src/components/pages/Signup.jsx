import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setLoading } from '@/redux/authSlice'

function Signup() {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""

    })
    const nevigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector(store => store.auth);

    function changeHandler(event) {
        const {name, value, type} = event.target;
        setInput(prevFormData => {
            return {
                ...prevFormData,
                [name]: value

            }
        })
    }
    function changeFileHandler(event) {
        setInput({
            ...input,
            file: event.target.files[0]
        });
    }
    const submitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);
        if (input.file) {
            formData.append('file', input.file);
        }
        
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {    // ${USER_API_ENDPOINT}
                headers:{
                    'Content-Type': "multipart/form-data"
                },
                withCredentials:true,
            });
            if (res.data.success) {
                nevigate('/login')
                toast.success(res.data.message)
            }

        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.message)
            
        }
        finally{
            dispatch(setLoading(false))
        }
        setInput({
            fullname: "",
            email: "",
            phoneNumber: "",
            password: "",
            role: "",
            file: ""
        })
        
    }
    
    return (
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form action="" onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                <div className='my-2 '>
                    <Label>Full Name</Label>
                    <Input
                        className=""
                        type='text'
                        placeholder='Abhishek Kumar Arya'
                        name='fullname'
                        onChange={changeHandler}
                        value={input.fullname}
                    />
                </div>
                <div className='my-2 '>
                    <Label>Email</Label>
                    <Input
                        className=""
                        type='email'
                        name='email'
                        placeholder='abhishek@gmail.com'
                        onChange={changeHandler}
                        value={input.email}
                    />
                </div>
                <div className='my-2 '>
                    <Label>Phone Number</Label>
                    <Input
                        className=""
                        type='number'
                        name='phoneNumber'
                        placeholder='1234567890'
                        onChange={changeHandler}
                        value={input.phoneNumber}
                    />
                </div>
                <div className='my-2 '>
                    <Label>Password</Label>
                    <Input
                        className=""
                        type='password'
                        name='password'
                        placeholder='Enter password here'
                        onChange={changeHandler}
                        value={input.password}
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <RadioGroup className='flex items-center gap-4 my-5'>
                        <div className='flex items-center space-x-2'>
                            <Input
                                type="radio"
                                name='role'
                                value='student'
                                className="cursor-pointer"
                                checked= {input.role ==='student'}
                                onChange={changeHandler}
                            />
                            <Label htmlFor='r1'>Student</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Input
                                type="radio"
                                name='role'
                                value='recruiter'
                                className="cursor-pointer"
                                checked= {input.role ==='recruiter'}
                                onChange={changeHandler}
                            />
                            <Label htmlFor='r2'>Recruiter</Label>
                        </div>
                    </RadioGroup>
                    <div className='flex items-center gap-2'>
                        <Label>Profile</Label>
                        <Input
                            name='file'
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer"
                            // value={input.file}
                        />
                    </div>
                </div>
                {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>

            </form>
        </div>
    )
}

export default Signup