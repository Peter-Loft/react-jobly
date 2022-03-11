import React from "react";
import { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom'


/**
 * Login Form Component
 * 
 * state:
 * - control component for form
 * 
 * props:
 * - handleLogin: Fn passed from app to set a new token.
 * 
 * Routes --> LoginForm
 */

function LoginForm({ handleLogin }) {

  const history = useHistory();
  const redirect = () => {
    history.push('/login');
  }

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  function submitForm(evt) {
    evt.preventDefault();
    handleLogin(formValues);
    return <Redirect to="/" />
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValues(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        name="username"
        value={formValues.username}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
      />
      <br />
      <button onClick={redirect}>Login!</button>
    </form>
  )
}

export default LoginForm;