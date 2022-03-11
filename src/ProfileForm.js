import React from "react";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "./userContext";


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
  console.log("ProfileForm rendered");

  const { currentUser } = useContext(UserContext);

  const [formValues, setFormValues] = useState( () => 
    { return { ...currentUser }}
  );

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

  console.log("Profile Form has firing: ", currentUser);
  console.log("formValues: ", formValues);
  return (
    <div>
      {currentUser && <form onSubmit={submitForm}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          disabled="true"
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
          name="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />
        <br />
        <button>Save Changes!</button>
      </form>}
    </div>
  )
}

export default ProfileForm;