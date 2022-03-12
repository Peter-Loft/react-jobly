import React from "react";
import { useState } from "react";
import { useHistory } from 'react-router-dom'


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
  console.log("LoginForm rendered");

  const history = useHistory();

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  async function submitForm(evt) {
    evt.preventDefault();
    try {
      await handleLogin(formValues);
      history.push('/');
    } catch (err) {
      alert(err);
      //CR Set error variable/state. Show in return.
    }
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
        required
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleChange}
        required
      />
      <br />
      <button>Login!</button>
    </form>
  )
}

export default LoginForm;