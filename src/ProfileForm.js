import React from "react";
import { useState } from "react";

/**
 * Profile Form, all fields editable except for username
 * 
 * state:
 * - control component for form;
 * 
 * props:
 * - handleSave: Fn passed from app to set user in
 * localstorage and provide context.
 * 
 * Routes --> ProfileForm
 */

function ProfileForm({ handleSave }) {

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });  

  //useEffect
  //API call getting username from context

  function submitForm(evt) {
    evt.preventDefault();
    handleSave(formValues);
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
        disabled="true"
      />

      <label htmlFor="firstName">First:</label>
      <input
        id="firstName"
        name="firstName"
        value={formValues.firstName}
        onChange={handleChange}
      />

      <label htmlFor="lastName">Last:</label>
      <input
        id="lastName"
        name="lastName"
        value={formValues.lastName}
        onChange={handleChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
      />
      <button>Save Changes!</button>
    </form>
  )
}

export default ProfileForm;