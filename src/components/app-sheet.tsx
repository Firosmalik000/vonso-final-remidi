'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { MenuIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import Api from '@/service/api';

// ...

const AppSheet = ({ data }: any) => {
  const [createdAt, setCreatedAt] = React.useState('');
  React.useEffect(() => {
    const date = new Date(data.created_at);
    setCreatedAt(date.toLocaleDateString());
  }, [data.created_at]);

  const handleDelete = async (id: string) => {
    try {
      const res = await Api.delete(`project/${id}`);
      if (res) {
        window.location.reload();
      }
    } catch (err: any) {
      toast.error('Failed to fetch notes:', err);
    }
  };

  return (
    <>
      <Sheet key="right">
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{data.title}</SheetTitle>
          </SheetHeader>
          <div className="px-4">
            <div className="w-full h-[300px] overflow-y-auto border-white border rounded-2xl p-2">
              <SheetDescription>{data.desc}</SheetDescription>
            </div>
            <div className="flex justify-between flex-wrap">
              <div className="mt-4">
                <strong className="block mb-1">Player</strong>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-800 rounded text-sm">{data.programmer.username}</span>
                </div>
              </div>
              <div className="mt-4">
                <strong className="block mb-1">Status</strong>
                <span className={`px-2 py-1 ${data.status === 'done' ? 'bg-green-500' : data.status === 'progress' ? 'bg-yellow-500' : 'bg-red-500'} rounded text-sm`}>{data.status}</span>
              </div>
              <div className="mt-4">
                <strong className="block mb-1">Priority</strong>
                <span className={`px-2 py-1 bg-gray-800 rounded text-sm ${data.priority === 'high' ? 'bg-red-500' : data.priority === 'intermediate' ? 'bg-yellow-500' : 'bg-green-500'}`}>{data.priority}</span>
              </div>
            </div>{' '}
            <div className="mt-4">
              <strong className="block mb-1">Created At</strong>
              <span className="px-2 py-1 bg-gray-800 rounded text-sm">{createdAt}</span>
            </div>
          </div>
          <SheetFooter>
            <ModalChangeStatus data={data} />
            <button onClick={() => handleDelete(data._id)} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition">
              Delete
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AppSheet;

const ModalChangeStatus = ({ data }: { data: any }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const status = formData.get('status') as string;

    try {
      const res = await Api.put(`project/${data._id}`, { status });
      if (res) {
        window.location.reload();
      }
    } catch (err: any) {
      toast.error('Failed to update status:', err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Status</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="flex justify-between gap-x-2">
          <select name="status" className="border border-gray-300 rounded-md w-1/2" defaultValue={data.status}>
            <option value="running">Running</option>
            <option value="progress">In Progress</option>
            <option value="testing">Testing</option>
            <option value="done">Done</option>
          </select>
          <button type="submit" className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded w-1/2">
            Submit
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
