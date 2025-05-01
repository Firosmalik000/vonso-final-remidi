'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '../../../utils/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Note = {
  id: string;
  note: string;
};

const NotePage = () => {
  const supabase = createClient();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editNote, setEditNote] = useState<{ id: string; note: string } | null>(null);

  // Fetch notes
  const fetchNotes = async () => {
    const { data, error } = await supabase.from('note').select('*').order('id', { ascending: false });
    if (!error) setNotes(data as Note[]);
  };

  // Add note
  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    await supabase.from('note').insert({ note: newNote });
    setNewNote('');
    fetchNotes();
  };

  // Delete note
  const handleDeleteNote = async (id: string) => {
    await supabase.from('note').delete().eq('id', id);
    fetchNotes();
  };

  // Update note
  const handleUpdateNote = async () => {
    if (!editNote) return;
    await supabase.from('note').update({ note: editNote.note }).eq('id', editNote.id);
    setEditNote(null);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen min-w-screen p-6 bg-gray-900">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">📝 Notes</h1>

        {/* Add Note */}
        <div className="flex gap-2 mb-6">
          <Input placeholder="Write a new note..." value={newNote} onChange={(e) => setNewNote(e.target.value)} className="flex-1" />
          <Button onClick={handleAddNote}>Add</Button>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="bg-gray-700 p-4 rounded shadow flex justify-between items-start">
              {editNote?.id === note.id ? (
                <div className="w-full">
                  <textarea className="w-full" value={editNote.note} onChange={(e) => setEditNote({ ...editNote, note: e.target.value })} />
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" onClick={handleUpdateNote}>
                      Save
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditNote(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-swite flex-1 whitespace-pre-wrap">{note.note}</p>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => setEditNote(note)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteNote(note.id)}>
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotePage;
