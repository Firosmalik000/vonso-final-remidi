/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

type User = {
  id: string;
  username: string;
  // Tambahkan field lain jika perlu
};

const ModalAddProject = () => {
  const [users, setUsers] = useState<User[]>([]);
  const supabase = createClient();
  async function createProject(formData: FormData) {
    const supabase = createClient();

    // Ambil user login
    const { data: dataUserLog, error: authError } = await supabase.auth.getUser();

    if (authError || !dataUserLog?.user) {
      toast.error('User not authenticated');
      return;
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const programmer = formData.get('programmer') as string;
    const status = formData.get('status') as string;
    const priority = formData.get('priority') as string;

    const { error: insertError } = await supabase.from('project').insert({
      title,
      description,
      programmer,
      status,
      priority,
      is_active: 1,
    });

    if (insertError) {
      toast.error(`Failed to create project: ${insertError.message}`);
      return;
    }

    toast.success('Project created successfully');
    window.location.reload();
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('member').select('*');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data as User[]);
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
            Add Member
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
                  <option key={user.id} value={user.username}>
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
