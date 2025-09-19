import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

function App() {
  // State to hold the list of tasks. We initialize it from localStorage.
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // useEffect to save tasks to localStorage whenever the tasks state changes.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = (task) => {
    const newTask = { 
      id: crypto.randomUUID(), // Generate a unique ID for the new tasks
      ...task 
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Function to update an existing task
  const updateTask = (id, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };
  
  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      <nav className="bg-green-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-white">TaskManager</Link>
          <Link
            to="/create"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            + New Task
          </Link>
        </div>
      </nav>

      <main className="container mx-auto p-8">
        <Outlet context={{ tasks, addTask, deleteTask, updateTask }} />
      </main>
    </div>
  );
}

export default App;