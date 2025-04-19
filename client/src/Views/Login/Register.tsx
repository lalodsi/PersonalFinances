// src/Register.tsx
import React, { useState } from 'react';
import bcrypt from 'bcryptjs'
import { useForm } from 'react-hook-form';
import { useRegistration } from '../../hooks/Login/useRegistration';

interface RegistrationForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {

  const {register, handleSubmit, watch} = useForm<RegistrationForm>()

  const {mutate: registerUser} = useRegistration()

  console.log(watch());
  

  const handleRegister = (e: RegistrationForm) => {
    if (e.password === e.confirmPassword) {
      console.log('Registering with', e);
      registerUser({
        name: e.name,
        email: e.email,
        passphrase: e.password
      })
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div>
          <label>Name:</label>
          <input
            {...register('name')}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            {...register('email')}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            {...register('password')}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            {...register('confirmPassword')}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
