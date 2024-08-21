import { ReactComponent as EditIcon } from '../assets/icons/editIcon.svg';
import { ReactComponent as AddTask } from '../assets/icons/addTask.svg';
import { useContext, useState } from 'react';
import '../style/Actions.css';
import { AuthContext } from '../AuthContext';

function Actions() {
    const { setEditTaskFun } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const newTask = () => {
        setEditTaskFun(false);
    };
    return (
        < div className="actions" >
            {/* <EditIcon id="editIcon" /> */}
            <input
                value={searchTerm} onChange={handleSearchChange}
                type="text" id="searchTask" placeholder="Search Task">
            </input>

            <AddTask type="button"
                data-bs-toggle="modal"
                data-bs-target="#taskModal"
                id="addIcon" 
                onClick={newTask}/>
        </div >
    );
}

export default Actions;