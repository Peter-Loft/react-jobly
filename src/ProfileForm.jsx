import React, { useContext, useState } from "react";
import UserContext from "./userContext";
import useMountedRef from "./useMountedRef";

function ProfileForm({ handleSave }) {
  const mounted = useMountedRef();
  const { currentUser } = useContext(UserContext);
  const [formValues, setFormValues] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function submitForm(event) {
    event.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    setError("");
    setSaved(false);
    try {
      await handleSave(formValues);
      if (mounted.current) setSaved(true);
    } catch (error) {
      if (mounted.current) setError(error.message || "Unable to save your profile. Please try again.");
    } finally {
      if (mounted.current) setIsSaving(false);
    }
  }

  function handleChange({ target: { name, value } }) {
    setFormValues(values => ({ ...values, [name]: value }));
    setSaved(false);
  }

  return (
    <form onSubmit={submitForm}>
      <h1>Your profile</h1>
      <label htmlFor="username">Username</label>
      <input id="username" value={currentUser.username} disabled />
      <fieldset disabled={isSaving}>
        <label htmlFor="firstName">First name</label>
        <input id="firstName" name="firstName" value={formValues.firstName} onChange={handleChange} required />
        <label htmlFor="lastName">Last name</label>
        <input id="lastName" name="lastName" value={formValues.lastName} onChange={handleChange} required />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={formValues.email} onChange={handleChange} required />
        <button type="submit">{isSaving ? "Saving..." : "Save changes"}</button>
      </fieldset>
      {error && <p role="alert">{error}</p>}
      {saved && <p role="status">Profile saved.</p>}
    </form>
  );
}

export default ProfileForm;
