'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { toast } from 'sonner';

const ModalAddMember = () => {
  async function createMember(formData: FormData) {
    const supabase = createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;

    if (!email || !password || !username) {
      toast.error('Please fill out all fields');
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError || !data.user) {
      toast.error(`Sign up failed: ${signUpError?.message || 'Unknown error'}`);
      return;
    }

    const { error: insertError } = await supabase.from('member').insert({
      id: data.user.id,
      username,
      email,
      role: 'user', // jangan simpan password secara langsung
    });

    if (insertError) {
      toast.error(`Failed to create member: ${insertError.message}`);
      return;
    }

    toast.success('Member created successfully');
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
