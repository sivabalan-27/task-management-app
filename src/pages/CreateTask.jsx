import { useOutletContext } from 'react-router-dom';
import TaskForm from '../components/TaskForm';

const CreateTask = () => {
  const { addTask } = useOutletContext();

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Create New Task</h1>
      <TaskForm onSubmit={addTask} />
    </div>
  );
};

export default CreateTask;