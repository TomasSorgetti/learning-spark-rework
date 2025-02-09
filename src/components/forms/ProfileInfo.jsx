"use client";

import { useLoading } from "@/features/loadingBar/context/loadingContext";
import useUserStore from "@/lib/store/userStore";
import { useState, useEffect } from "react";
import FormFieldInput from "../forms/inputs/FormFieldInput";

export default function ProfileInfo() {
  const { user } = useUserStore();
  const { isLoading, startLoading, finishLoading } = useLoading();
  const [form, setForm] = useState({
    password: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    startLoading();
    try {
      console.log("change password...");
    } catch (error) {
      console.log(error);
    } finally {
      finishLoading();
    }
  };

  return (
    <section className="flex flex-col gap-4 w-full">
      <h1 className="text-4xl">Profile Information</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[300px]">
        <span>Name: {user?.name}</span>
        <span>Email: {user?.email}</span>
        <p>
          Roles:{" "}
          {user?.roles?.map((role, index) => (
            <span key={index}>{role.name},</span>
          ))}
        </p>
        <div>
          <FormFieldInput
            label="Password:"
            type="password"
            name="password"
            placeholder="********"
            id="profile-password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            isPassword
          />
          <FormFieldInput
            label="New Password:"
            type="password"
            name="newPassword"
            placeholder="********"
            id="profile-new-password"
            value={form.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            isPassword
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer bg-red-500 text-white py-3 rounded-full transition-all duration-500 hover:bg-red-600"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Update password"}
        </button>
      </form>
    </section>
  );
}
