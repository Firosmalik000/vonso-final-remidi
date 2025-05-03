/* eslint-disable @typescript-eslint/no-explicit-any */
// ModalAddMember.tsx
'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Api from '@/service/api';
import { toast } from 'sonner';

const ModalAddMember = ({ onSuccess, payload, open, setOpen }: { onSuccess: () => void; payload: any; open: boolean; setOpen: (val: boolean) => void }) => {
  async function createMember(formData: FormData) {
    const id = formData.get('id') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;
    const role = formData.get('role') as string;

    try {
      const res = await Api.post('user/add', { id, email, password, username, role });
      if (res) {
        toast.success('Member saved successfully');
        setOpen(false);
        onSuccess();
      }
    } catch (err) {
      toast.error(`Failed to save member: ${err}`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{payload ? 'Edit Member' : 'Add New Member'}</DialogTitle>
          <DialogDescription>Fill in the form to {payload ? 'edit' : 'add'} a member.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4 mt-4" action={createMember}>
          <Input id="id" name="id" type="hidden" defaultValue={payload?._id} />
          <div>
            <label htmlFor="username">Username</label>
            <Input id="username" name="username" type="text" required defaultValue={payload?.username} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input id="email" name="email" type="email" required defaultValue={payload?.email} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input id="password" name="password" type="password" required={!payload} />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <select name="role" id="role" className="w-full border border-gray-300 rounded-md py-2 px-3" defaultValue={payload?.role || 'user'}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddMember;
