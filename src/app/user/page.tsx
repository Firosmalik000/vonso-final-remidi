/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import ModalAddMember from './ModalAddMember';
import Api from '@/service/api';
import { Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';

const UserPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<any | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await Api.get('user');
      setData(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
      console.error(err);
    }
  };

  const handleEdit = (item: any) => {
    setPayload(item);
    setOpenModal(true);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await Api.delete(`user/${id}`);
      if (response) {
        toast.success('Member deleted successfully');
        fetchUser();
      }
    } catch (err) {
      toast.error(`Failed to delete member: ${err}`);
    }
  };

  return (
    <div className="p-6 max-w-screen w-[1200px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Member List</h1>
        <button
          onClick={() => {
            setPayload(null); // kosongkan untuk tambah baru
            setOpenModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Add Member
        </button>
      </div>

      <ModalAddMember open={openModal} setOpen={setOpenModal} payload={payload} onSuccess={fetchUser} />

      {error || data.length === 0 ? (
        <p className="text-red-500">{error || 'No data found.'}</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <th className="px-6 py-3 border-b">No</th>
                <th className="px-6 py-3 border-b">Action</th>
                <th className="px-6 py-3 border-b">Username</th>
                <th className="px-6 py-3 border-b">Email</th>
                <th className="px-6 py-3 border-b">Role</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b">{index + 1}</td>
                  <td className="px-6 py-4 border-b flex gap-x-2">
                    <button onClick={() => handleEdit(item)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      <Trash size={16} />
                    </button>
                  </td>
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
