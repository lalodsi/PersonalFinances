import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuthenticate } from '../../hooks/Login/useAuthenticate';
import { AuthenticationModel } from '../../models/users';
import bcrypt from 'bcryptjs';

const Login: React.FC = () => {

  const {register, watch, handleSubmit} = useForm<AuthenticationModel>()
  const {mutate: authenticate} = useAuthenticate()


  const handleLogin = (e: AuthenticationModel) => {
    authenticate({
      user: e.user,
      passphrase: e.passphrase
    })
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label>User:</label>
          <input
            {...register("user")}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            {...register("passphrase")}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
