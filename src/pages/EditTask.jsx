import { useOutletContext, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';

const EditTask = () => {
  const { tasks, updateTask } = useOutletContext();
  const { taskId } = useParams(); 

  // Find the specific task that needs to be edited
  const taskToEdit = tasks.find((task) => task.id === taskId);

  const handleUpdate = (updatedData) => {
    updateTask(taskId, updatedData);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Edit Task</h1>
      <TaskForm onSubmit={handleUpdate} initialData={taskToEdit} isEdit={true} />
    </div>
  );
};

export default EditTask;