import React from "react";
import { useState } from "react";
import { Redirect } from 'react-router-dom'

/**
 * Login Form Component
 * 
 * state:
 * - control component for form
 * 
 * props:
 * - handleSave: Fn passed from app to set user in
 * localstorage and provide context.
 * 
 * Routes --> LoginForm
 */

function LoginForm({ handleLogin }) {

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

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
      />
      <button>Login!</button>
    </form>
  )
}

export default LoginForm;