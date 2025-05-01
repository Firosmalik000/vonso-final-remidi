/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';

import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '../../../utils/supabase/client';
import ModalAddAgenda from './ModalAddAgenda';

type Agenda = {
  id: string;
  title: string;
  desc: string;
  date: string;
  icon: string;
};

const AgendaPage = () => {
  const supabase = createClient();
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [form, setForm] = useState({ title: '', desc: '', date: '', icon: '' });
  const [editId, setEditId] = useState<string | null>(null);

  const fetchAgendas = async () => {
    const { data, error } = await supabase.from('agenda').select('*').order('date');
    if (!error) setAgendas(data as Agenda[]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const { title, desc, date, icon } = form;
    if (!title || !desc || !date || !icon) return;
    await supabase.from('agenda').insert({ title, desc, date, icon });
    setForm({ title: '', desc: '', date: '', icon: '' });
    fetchAgendas();
  };

  const handleUpdate = async () => {
    if (!editId) return;
    await supabase.from('agenda').update(form).eq('id', editId);
    setEditId(null);
    setForm({ title: '', desc: '', date: '', icon: '' });
    fetchAgendas();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('agenda').delete().eq('id', id);
    fetchAgendas();
  };

  const Icon = (name: string) => {
    const LucideIcon = (LucideIcons as any)[name];
    return LucideIcon ? <LucideIcon className="h-6 w-6 text-blue-600" /> : <LucideIcons.HelpCircle className="h-6 w-6" />;
  };

  useEffect(() => {
    fetchAgendas();
  }, []);

  return (
    <div className="min-h-screen min-w-screen p-6 bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">📅 Team Agenda</h1>

        {/* Form */}
        <ModalAddAgenda form={form} onChange={handleChange} onSubmit={editId ? handleUpdate : handleAdd} isEdit={!!editId} />

        {/* List */}
        <div className="space-y-4">
          {agendas.map((item) => (
            <div key={item.id} className="bg-gray-700 rounded shadow p-4 flex items-start justify-between">
              <div className="flex gap-4">
                <div>{Icon(item.icon)}</div>
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <div className="flex gap-2 text-sm text-white whitespace-pre-wrap">
                    <LucideIcons.Notebook />
                    {item.desc}
                  </div>
                  <div className=" flex  gap-2 text-sm text-white mt-1">
                    <LucideIcons.Clock /> {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditId(item.id);
                    setForm(item);
                  }}
                >
                  <LucideIcons.Pencil />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                  <LucideIcons.Trash />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgendaPage;
