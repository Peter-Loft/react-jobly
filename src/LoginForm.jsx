import React from "react";
import { useState } from "react";
import useMountedRef from "./useMountedRef";


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

  const mounted = useMountedRef();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  async function submitForm(evt) {
    evt.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    try {
      await handleLogin(formValues);
    } catch (err) {
      if (mounted.current) setError(err.message || "Unable to sign in. Please try again.");

    } finally {
      if (mounted.current) setIsSubmitting(false);
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
      <h1>Log in</h1>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        name="username"
        autoComplete="username"
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
        autoComplete="current-password"
        value={formValues.password}
        onChange={handleChange}
        required
      />
      <br />
      <button disabled={isSubmitting}>{isSubmitting ? "Logging in..." : "Log in"}</button>
      {error && <p role="alert">{error}</p>}
    </form>
  )
}

export default LoginForm;
