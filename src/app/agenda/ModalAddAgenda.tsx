import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader } from '@/components/ui/dialog'; // gunakan yang benar dari shadcn
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import React from 'react';

type Props = {
  form: {
    title: string;
    desc: string;
    date: string;
    icon: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isEdit: boolean;
};

const ModalAddAgenda = ({ form, onChange, onSubmit, isEdit }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {isEdit ? 'Edit Agenda' : 'Add Agenda'}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Agenda' : 'Add New Agenda'}</DialogTitle>
          <DialogDescription>{isEdit ? 'Update the fields below to edit the agenda.' : 'Fill in the form to add a new agenda item.'}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <Input name="title" placeholder="Title" value={form.title} onChange={onChange} />
          <textarea name="desc" placeholder="Description" className="w-full h-24 rounded-md border px-3 py-2 text-sm" value={form.desc} onChange={onChange} />
          <Input name="date" type="date" value={form.date} onChange={onChange} />
          <Input name="icon" placeholder="Lucide icon (e.g. Calendar, AlarmClock)" value={form.icon} onChange={onChange} />
          <Button onClick={onSubmit}>{isEdit ? 'Update' : 'Add Agenda'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddAgenda;
