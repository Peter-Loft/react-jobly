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

  const history = useHistory();

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  //CR look at making this async so we can handle form problems
  //history.push happenign no matter what right now
  function submitForm(evt) {
    evt.preventDefault();
    handleLogin(formValues);
    history.push('/');
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValues(fData => ({
      ...fData,
      [name]: value,
    }));
  }
  //CR form type for password so its blanked out

  //CR add 'require' prop on inputs for front end validation
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
        value={formValues.password}
        onChange={handleChange}
      />
      <br />
      <button>Login!</button>
    </form>
  )
}

export default LoginForm;