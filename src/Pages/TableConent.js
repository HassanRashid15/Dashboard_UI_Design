import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function TableContent() {
  const [projects, setProjects] = useState([
    { company: 'Purity UI Version', members: ['profile1.jpg', 'profile2.jpg', 'profile3.jpg'], completion: 60, status: 'In Progress', isEditing: false },
    { company: 'Project Alpha', members: ['profile4.jpg', 'profile5.jpg'], completion: 80, status: 'Completed', isEditing: false },
    { company: 'Project Beta', members: ['profile6.jpg'], completion: 20, status: 'In Progress', isEditing: false },
    { company: 'Project Gamma', members: ['profile7.jpg', 'profile8.jpg', 'profile9.jpg'], completion: 40, status: 'In Progress', isEditing: false },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleEditToggle = (index) => {
    setSelectedProject(projects[index]);
    setShowForm(true);
  };

  const handleInputChange = (field, value) => {
    setSelectedProject({ ...selectedProject, [field]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedProject((prev) => ({
        ...prev,
        members: [imageUrl],
      }));
    }
  };

  const handleFormSubmit = () => {
    const updatedProjects = projects.map((project) =>
      project.company === selectedProject.company ? selectedProject : project
    );
    setProjects(updatedProjects);
    setShowForm(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg table-scroll-custom shadow-lg w-full h-full" data-aos="fade-up">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Projects</h2>
      <div className="text-gray-500 mb-4">30 done this month.</div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full border-b">
              <th className="py-2 text-left text-gray-700 font-semibold">Companies</th>
              <th className="py-2 text-left text-gray-700 font-semibold">Members</th>
              <th className="py-2 text-left text-gray-700 font-semibold">Completion</th>
              <th className="py-2 text-left table-status-custom text-gray-700 font-semibold">Status</th>
              <th className="py-2 text-left"></th> 
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">
                  <div className="flex items-center space-x-2">
                    <img src="xd-icon.png" alt="XD Icon" className="w-5 h-5" />
                    <span>{project.company}</span>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="flex space-x-1">
                    {project.members.map((member, i) => (
                      <img key={i} src={member} alt="Profile" className="w-5 h-5 rounded-full border" />
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4 text-blue-500 font-medium text-sm">{project.completion}%</td>
                <td className={`py-2 px-4 font-medium text-sm ${project.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {project.status}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleEditToggle(index)}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Project</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Company</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Completion</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Completion"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Status</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Status"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Add Member Image</label>
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableContent;
