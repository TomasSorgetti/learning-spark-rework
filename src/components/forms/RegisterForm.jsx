"use client";

import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8080/v1/auth/signup", form)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-100">
      <label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
        />
      </label>
      <label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="cursor-pointer bg-red-500 text-white">
        Register
      </button>
    </form>
  );
}
