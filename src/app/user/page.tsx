'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import ModalAddMember from './ModalAddMember';
import Api from '@/service/api';

const UserPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const api = Api();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('user', {});
        setData(res.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="p-6 max-w-screen w-[1200px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Member List</h1>
        <ModalAddMember />
      </div>

      {error || data.length === 0 ? (
        <p className="text-red-500">{error || 'No data found.'}</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <th className="px-6 py-3 border-b">No</th>
                <th className="px-6 py-3 border-b">Username</th>
                <th className="px-6 py-3 border-b">Email</th>
                <th className="px-6 py-3 border-b">Role</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: number) => (
                <tr key={item._id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b">{index + 1}</td>
                  <td className="px-6 py-4 border-b">{item.username}</td>
                  <td className="px-6 py-4 border-b">{item.email}</td>
                  <td className="px-6 py-4 border-b">{item.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserPage;
