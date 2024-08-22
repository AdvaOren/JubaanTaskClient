import logo from './logo.svg';
import './App.css';
import Home from './Components/Home.js';
import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getTaskList } from './utils/TaskServiceCalls.js';
import { format } from 'date-fns';

function App() {
  const { setTasksListFun, setFilteredListFun } = useContext(AuthContext);
  
  useEffect(() => {
    getTasks()
  }, []);
  
  const getTasks = async () => {
    const task = await getTaskList();
    task && task.forEach((task) => {
      task.dueDate = format(new Date(task.dueDate), 'dd/MM/yyyy');
    });
    setTasksListFun(task);
    setFilteredListFun(task);
  }

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
