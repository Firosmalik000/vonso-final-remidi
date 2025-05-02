'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Api from '@/service/api';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const ModalAddMember = () => {
  const api = Api();
  async function createMember(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;

    const res = await api.post('user', {
      email,
      password,
      username,
    });
    if (res) {
      toast.success('Member created successfully');
    }
  }

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
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>Fill in the form to add a new member.</DialogDescription>
          </DialogHeader>
          <form className="space-y-4 mt-4">
            <div>
              <label htmlFor="username">Username</label>
              <Input id="username" name="username" type="text" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="flex justify-end">
              <button formAction={createMember} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalAddMember;
