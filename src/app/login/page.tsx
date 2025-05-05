'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import { toast } from 'sonner';
import React from 'react';

export default function LoginPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await axios.post("vonso-final-remidi-backend-production.up.railway.app/api/user/login", {
			email,
			password,
		});
      console.log({ res });
      if (res) {
        const token = res.data.token;
        window.localStorage.setItem('token', token);
        toast.success(res.data.message);
        window.location.href = '/private';
      }
    } catch (error: any) {
      toast.error(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="bg-gray-700 p-8 rounded-2xl shadow-md w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-semibold text-center text-white">Log In</h2>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input id="email" name="email" type="email" required className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <input id="password" name="password" type="password" required className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex justify-between space-x-4">
          <button type="submit" className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md transition">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
