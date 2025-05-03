/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import Api from '@/service/api';

type User = {
  _id: string;
  username: string;
};

const ModalAddProject = () => {
  const [users, setUsers] = useState<User[]>([]);
  async function createProject(formData: FormData) {
    const title = formData.get('title') as string;
    const desc = formData.get('description') as string;
    const programmer = formData.get('programmer') as string;
    const status = formData.get('status') as string;
    const priority = formData.get('priority') as string;

    const postData = await Api.post('project', {
      title,
      desc,
      programmer,
      status,
      priority,
    });

    if (!postData) {
      toast.error('User not authenticated');
      return;
    }

    toast.success('Project created successfully');
    window.location.reload();
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await Api.get('user');
        setUsers(res.data);
      } catch (err: any) {
        toast.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>Fill in the form to add a new member.</DialogDescription>
          </DialogHeader>

          <form className="space-y-4 mt-4">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Title</label>
              <Input id="title" name="title" type="text" required />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label htmlFor="description">Description</label>
              <Input id="description" name="description" type="text" required />
            </div>

            {/* Programmer */}
            <div className="flex flex-col gap-1">
              <label htmlFor="programmer">Programmer</label>
              <select name="programmer" required>
                <option value="">Select Programmer</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1">
              <label htmlFor="status">Status</label>
              <select name="status" required>
                <option value="running">Running</option>
                <option value="progress">Progress</option>
                <option value="testing">Testing</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Priority */}
            <div className="flex flex-col gap-1">
              <label htmlFor="priority">Priority</label>
              <select name="priority" required>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button formAction={createProject} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalAddProject;
