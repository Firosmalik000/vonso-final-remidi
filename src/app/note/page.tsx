/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Api from '@/service/api';
import { toast } from 'sonner';

type Note = {
  id: string;
  note: string;
};

const NotePage = () => {
  const api = Api();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editNote, setEditNote] = useState<{ id: string; note: string } | null>(null);

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const res = await api.get('note', {});
      if (res) {
        setNotes(res.data);
      }
    } catch (error: any) {
      toast.error('Failed to fetch notes:', error);
    }
  };

  // Add note
  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      const res = await api.post('note', { note: newNote });
      if (res) {
        setNewNote('');
        fetchNotes();
      }
    } catch (err: any) {
      toast.error('Failed to fetch notes:', err);
    }
  };

  // Delete note
  const handleDeleteNote = async (id: string) => {
    try {
      const res = await api.destroy(`note/${id}`, {});
      if (res) {
        fetchNotes();
      }
    } catch (err: any) {
      toast.error('Failed to fetch notes:', err);
    }
  };

  // Update note
  const handleUpdateNote = async () => {
    if (!editNote) return;
    try {
      const res = await api.put(`note/${editNote.id}`, { note: editNote.note });
      if (res) {
        setEditNote(null);
        fetchNotes();
      }
    } catch (err: any) {
      toast.error('Failed to fetch notes:', err);
    }
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
