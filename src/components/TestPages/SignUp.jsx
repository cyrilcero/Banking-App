// for testing useNavigate hook -- redirecting to another page

import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  
  const onSubmit = () => {
    navigate('/overview');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit">Register</button>
      </form>    
    </div>
  )
}

export default SignUp
