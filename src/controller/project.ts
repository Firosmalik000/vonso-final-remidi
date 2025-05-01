import { createClient } from '../../utils/supabase/client';

export const UpdateStatus = async (id: string, formData: FormData) => {
  const supabase = await createClient();

  return supabase
    .from('project')
    .update({ status: formData.get('status') as string })
    .match({ id });
};

export const UpdatePriority = async (id: string, formData: FormData) => {
  const supabase = await createClient();

  return supabase
    .from('project')
    .update({ priority: formData.get('priority') as string })
    .match({ id });
};

export const DeleteProject = async (id: string) => {
  const supabase = await createClient();

  return supabase.from('project').delete().match({ id });
};
