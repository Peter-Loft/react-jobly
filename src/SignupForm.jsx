import React from "react";
import { useState } from "react";
import useMountedRef from "./useMountedRef";

/**
 *
 * state:
 * - control component for form;
 *
 * props:
 * - handleSignup: Fn passed from app to set user in
 * localstorage and provide context.
 *
 * Routes --> SignForm
 */
function SignupForm({ handleSignup }) {

  const mounted = useMountedRef();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  async function submitForm(evt) {
    evt.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    try {
      await handleSignup(formValues);
    } catch (err) {
      if (mounted.current) setError(err.message || "Unable to create your account. Please try again.");
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
      <h1>Create an account</h1>
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
        autoComplete="new-password"
        value={formValues.password}
        onChange={handleChange}
        required
      />
      <br />
      <label htmlFor="firstName">First:</label>
      <input
        id="firstName"
        name="firstName"
        value={formValues.firstName}
        onChange={handleChange}
        required
      />
      <br />
      <label htmlFor="lastName">Last:</label>
      <input
        id="lastName"
        name="lastName"
        value={formValues.lastName}
        onChange={handleChange}
        required
      />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email" type="email"
        value={formValues.email}
        onChange={handleChange}
        required
      />
      <br />
      <button disabled={isSubmitting}>{isSubmitting ? "Creating account..." : "Sign up"}</button>
      {error && <p role="alert">{error}</p>}
    </form>
  )

}

export default SignupForm;
