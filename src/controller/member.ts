import SupabaseAdmin from '../../utils/supabase/admin';

export async function createMember(data: { email: string; password: string; username: string; role: string; is_active: boolean }) {
  const createMember = await SupabaseAdmin.auth.admin.createUser({
    email: data.email,
    email_confirm: true,
    password: data.password,
    user_metadata: {
      username: data.username,
      role: data.role,
      is_active: data.is_active,
    },
  });
  if (createMember.error) {
    return JSON.stringify(createMember);
  } else {
    const memberResult = await SupabaseAdmin.from('member').insert({ email: data.email, id: createMember.data.user.id });
    if (memberResult.error) {
      return JSON.stringify(memberResult);
    } else {
      const permissionResult = await SupabaseAdmin.from('permission').insert({ role: data.role, member_id: createMember.data.user.id, is_active: data.is_active });
      return JSON.stringify(permissionResult);
    }
  }
  return createMember;
}
