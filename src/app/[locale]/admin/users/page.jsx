"use client";

import useUsersStore from "@/lib/store/usersStore";
import { getAllUsers } from "@/queries/users";
import { useEffect } from "react";

export default function AdminUsers() {
  const { setUsers, users } = useUsersStore();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (!response.error && response !== users) {
        setUsers(response);
      }
    };
    fetchUsers();
  }, []);

  return (
    <main className="h-screen flex flex-col items-start p-20 w-full">
      <h1 className="text-3xl font-bold mt-20">Admin Users</h1>
      <section className="w-full h-full flex flex-col gap-4">
        <div className="flex justify-between gap-10 w-full">
          {/* TODO: Implement search for name && email */}
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300"
          />
          <div>
            <select name="roles" id="roles">
              <option value="all">All</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <select name="state" id="state">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
              <option value="deleted">Deleted</option>
              <option value="unvalidated">Unvalidated</option>
            </select>
            {/* date, verificado, suscripción(?), país, order A-Z Z-A */}
          </div>
        </div>
        <div className="flex gap-10">
          <p>name</p>
          <p>email</p>
        </div>
        <div className="bg-gray-100 rounded-[8px] w-full h-full py-1">
          {users?.map((user) => (
            <div
              key={user._id}
              className="p-2 bg-white rounded-[4px] mx-2 my-1 flex justify-start gap-10"
            >
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
