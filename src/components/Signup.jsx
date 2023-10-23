import React from "react";

export const Signup = () => {
  return (
    <div>
      <div>logo</div>
      <div>
        <Form>
          <h2>Create Account</h2>
          <label htmlFor="firstName"></label>
          <input type="text" />
          <label htmlFor="lastName"></label>
          <input type="text" />
          <label htmlFor="email"></label>
          <input type="email" />
          <label htmlFor="contact"></label>
          <input type="number" />
          <label htmlFor="password"></label>
          <input type="password" />
          <button>Sign up</button>
        </Form>
        <div></div>
      </div>
    </div>
  );
};
