/* eslint-disable @typescript-eslint/no-explicit-any */
import AppSheet from '@/components/app-sheet';
import React from 'react';
import ModalAddProject from './ModalAddProject';
import Api from '@/service/api';

const ProjectPage = async () => {
  const api = Api();
  const { data } = await api.get('project', {});
  console.log(data);
  const grouped = data?.reduce((acc: any, project: any) => {
    const { status } = project;
    if (!acc[status]) acc[status] = [];
    acc[status].push(project);
    return acc;
  }, {} as Record<string, typeof data>);
  console.log(data);
  return (
    <div className="p-4 max-w-screen  w-[1200px]">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mb-4">Project Management</h1>
        <ModalAddProject />
      </div>
      <div className="flex gap-x-6">
        {Object.entries(grouped).map(([status, projects]: any) => (
          <div key={status} className="mb-6">
            <div className="w-[300px] border-white border-2 rounded flex justify-center items-center">
              <h2 className="text-lg font-semibold capitalize mb-2">{status}</h2>
            </div>
            <div className="space-y-2 border-white border-2 rounded p-2">
              {projects.map((project: any) => (
                <div key={project.id} className={`border p-2 rounded shadow-sm ${project.priority === 'high' ? 'bg-red-500' : project.priority === 'intermediate' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                  <div className="flex justify-between items-center ">
                    <strong>{project.title}</strong>
                    <AppSheet data={project} />
                  </div>
                  <br />
                  {/* {project.created_at.toLocaleDateString()} */}
                  <span className="text-sm text-white">{project.programmer}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
