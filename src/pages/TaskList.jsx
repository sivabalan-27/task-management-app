import { useState, useMemo } from 'react';
import { useOutletContext, Link } from 'react-router-dom';

const TaskList = () => {
  const { tasks, deleteTask } = useOutletContext();
  //search functionality
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    if (!searchQuery) {
      return tasks;
    }
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  let content;
  if (tasks.length === 0) {
    content = (
      <div className="text-center bg-white p-8 rounded-lg shadow-md border border-slate-200">
        <h1 className="text-3xl font-bold mb-4">No tasks yet!</h1>
        <p className="text-slate-500">Click the button below to create your first task.</p>
        <Link
          to="/create"
          className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Create Task
        </Link>
      </div>
    );
  } else if (filteredTasks.length === 0) {
    content = (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">No tasks found</h1>
        <p className="text-slate-500">Try adjusting your search query.</p>
      </div>
    );
  } else {
    content = (
      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-slate-200">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b border-slate-200">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Description</th>
              <th className="p-4">Due Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="border-b border-slate-200 hover:bg-slate-100/50">
                <td className="p-4">{task.title}</td>
                <td className="p-4 text-slate-500">{task.description}</td>
                <td className="p-4">{task.dueDate}</td>
                <td className="p-4 flex gap-3">
                  <Link
                    to={`/edit/${task.id}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        {tasks.length > 0 && (
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-1/3 bg-white border  text-slate-800 text-sm rounded-lg focus:ring-green-500 focus:border-green-500  p-2.5"
          />
        )}
      </div>
      {content}
    </div>
  );
};

export default TaskList;