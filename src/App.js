import './App.css';
import Home from './Components/Home.js';
import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getTaskList } from './utils/TaskServiceCalls.js';
import { format } from 'date-fns';
import { colors } from './utils/variables.js';

function App() {
  const { setTasksListFun, setFilteredListFun } = useContext(AuthContext);
 
  useEffect(() => {
    getTasks()
  }, []);
  
  const getTasks = async () => {
    const task = await getTaskList();
    task && task.forEach((task, indx) => {
      task.dueDate = format(new Date(task.dueDate), 'dd/MM/yyyy');
      task.color= colors[indx % colors.length];
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
