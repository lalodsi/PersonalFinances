import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuthenticate } from '../../hooks/Login/useAuthenticate';
import { AuthenticationModel } from '../../models/users';
import styles from "./Login.module.css"
import InputStyled from '@/components/Forms/Input/Input';

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
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label>User:</label>
          <InputStyled
            {...register("user")}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <InputStyled
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
