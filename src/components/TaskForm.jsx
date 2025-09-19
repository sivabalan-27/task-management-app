import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
    const [task, setTask] = useState({ title: '', description: '', dueDate: ''});
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isEdit && initialData) {
            const formattedData = {
                ...initialData,
                dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
            };
            setTask(formattedData);
        }
    }, [isEdit, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.title) {
            alert("Title is required!");
            return;
        }
        onSubmit(task);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg border border-slate-200">
            <div className="mb-6">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-slate-600">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    className="bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-slate-600">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    rows="4"
                    className="bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                ></textarea>
            </div>
            <div className="mb-6">
                <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-slate-600">
                    Due Date
                </label>
                <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                    className="bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                />
            </div>
            <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                {isEdit ? 'Update Task' : 'Create Task'}
            </button>
        </form>
    );
};

export default TaskForm;