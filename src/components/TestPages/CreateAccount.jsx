// Test Create Account Page -- louise

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import schema from './schema';
// import './create-account.css';

const CreateAccount = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const userAccount = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobileNumber: data.mobileNumber,
      birthday: data.birthday,
      password: data.password,
      accountBalance: '10000.00',
      createdAt: new Date(),
    };
  
    const existingUserAccounts = JSON.parse(localStorage.getItem('UserAccounts')) || [];
  
    // Generate the unique accountID
    const uniqueRandomDigits = generateUniqueRandomDigits(existingUserAccounts);
    userAccount.accountID = `000${uniqueRandomDigits}`;
  
    existingUserAccounts.push(userAccount);
    localStorage.setItem('UserAccounts', JSON.stringify(existingUserAccounts));
    console.log(existingUserAccounts);
  
    // Reset the form fields using setValue
    setValue('firstName', '');
    setValue('lastName', '');
    setValue('email', '');
    setValue('mobileNumber', '');
    setValue('birthday', '');
    setValue('password', '');
    setValue('confirmPassword', '');
  
    navigate('/login');
  };
  
  // Function to generate unique random 9-digit numbers
  const generateUniqueRandomDigits = (existingAccounts) => {
    let randomDigits;
    let isUnique = false;
  
    while (!isUnique) {
      randomDigits = generateRandomDigits();
      const isDuplicate = existingAccounts.some((account) => account.accountID === `000${randomDigits}`);
      if (!isDuplicate) {
        isUnique = true;
      }
    }
  
    return randomDigits;
  };
  
  const generateRandomDigits = () => {
    let result = '';
    for (let i = 0; i < 9; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  };


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name</label>
          <Controller name="firstName" control={control} render={({ field }) => <input {...field} />} />
          <p>{errors.firstName?.message}</p>
        </div>

        <div>
          <label>Last Name</label>
          <Controller name="lastName" control={control} render={({ field }) => <input {...field} />} />
          <p>{errors.lastName?.message}</p>
        </div>

        <div>
          <label>Email Address</label>
          <Controller name="email" control={control} render={({ field }) => <input {...field} />} />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label>Mobile Number</label>
          <Controller name="mobileNumber" control={control} render={({ field }) => <input {...field} />} />
          <p>{errors.mobileNumber?.message}</p>
        </div>

        <div>
          <label>Birthday</label>
          <Controller name="birthday" control={control} render={({ field }) => <input type="date" {...field} />} />
          <p>{errors.birthday?.message}</p>
        </div>

        <div>
          <label>Password</label>
          <Controller name="password" control={control} render={({ field }) => <input type="password" {...field} />} />
          <p>{errors.password?.message}</p>
        </div>

        <div>
          <label>Confirm Password</label>
          <Controller name="confirmPassword" control={control} render={({ field }) => <input type="password" {...field} />} />
          <p>{errors.confirmPassword?.message}</p>
        </div>

        <button className='register-btn' type="submit">Register</button>
      </form>
    </div>
  );
};

export default CreateAccount;
