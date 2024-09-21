import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button';
import axios from 'axios';
import { RadioGroup } from '../ui/radio-group';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import store from '@/redux/store';
import { Loader2 } from 'lucide-react';

function Login() {
  const {loading} = useSelector(store => store.auth);
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  })
  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, formData, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        nevigate('/')
        toast.success(res.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      dispatch(setLoading(false));
    }
  }
  return (
    <div className='flex items-center justify-center max-w-7xl mx-auto'>
      <form action="" onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
        <div className='my-2 '>
          <Label>Email</Label>
          <Input
            className=""
            type='email'
            name='email'
            placeholder='abhishek@gmail.com'
            onChange={changeHandler}
            value={formData.email}
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
            value={formData.password}
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
                checked={formData.role === 'student'}
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
                checked={formData.role === 'recruiter'}
                onChange={changeHandler}
              />
              <Label htmlFor='r2'>Recruiter</Label>
            </div>
          </RadioGroup>
        </div>
        {
          loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> :
          <Button className="w-full my-4" >Submit</Button>

        }
      </form>
    </div>
  )
}

export default Login