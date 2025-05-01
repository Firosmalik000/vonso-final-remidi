'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/private');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Sign up user with Supabase Auth
  const { data: authData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signupError || !authData.user) {
    console.error('Sign up error:', signupError?.message);
    redirect('/error');
  }

  // Insert user data to 'member' table (excluding password for security)
  const { error: insertError } = await supabase.from('member').insert({
    id: authData.user.id, // optional, associate auth ID
    username,
    email,
    role: 'user',
  });

  if (insertError) {
    console.error('Error inserting member:', insertError.message);
    // optionally: delete the created auth user or notify admin
  }

  revalidatePath('/', 'layout');
  redirect('/login');
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Logout error:', error.message);
    return;
  }

  redirect('/login');
}
