import { Card } from '@/components/ui/card';
import { createClient } from '../../../utils/supabase/server';

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data: dataMember } = await supabase.from('member').select('*');
  const { data: dataproject } = await supabase.from('project').select('*');

  return (
    <div className="min-h-screen bg-gray-700 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>

        {/* User Info Card */}
        <Card className="mb-6">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-700">Welcome, {dataMember?.[0]?.username || 'User'}!</h2>
            <p className="text-white">Email: {dataMember?.[0]?.email || 'Not available'}</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Overview Card */}
          <Card>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-700">Projects Overview</h3>
              <ul className="space-y-2 mt-4">
                {dataproject?.map((project) => (
                  <li key={project.id} className="flex justify-between items-center">
                    <span className="text-sm text-white">{project.title}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${project.status === 'done' ? 'bg-green-200 text-green-700' : project.status === 'progress' ? 'bg-yellow-200 text-yellow-700' : 'bg-red-200 text-red-700'}`}>
                      {project.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Members Card */}
          <Card>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-700">Team Members</h3>
              <ul className="space-y-2 mt-4">
                {dataMember?.map((member) => (
                  <li key={member.id} className="flex justify-between items-center">
                    <span className="text-sm text-white">{member.username}</span>
                    <span className="text-xs text-gray-500">{member.email}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
