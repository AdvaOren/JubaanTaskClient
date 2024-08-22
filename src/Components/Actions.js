import { ReactComponent as AddTask } from '../assets/icons/addTask.svg';
import { useContext, useState } from 'react';
import '../style/Actions.css';
import { AuthContext } from '../AuthContext';
import { Sort } from '../utils/Sort';

function Actions() {
    const { setEditTaskFun, tasksList, setFilteredListFun, currFilter, setCurrFilter } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const sortTasks = (criteria) => {
        setCurrFilter(criteria);
        setShowDropdown(false);
        let sortedList = Sort(criteria, [...tasksList]);
        setFilteredListFun(sortedList);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterTasksBySearch(event.target.value);
    };

    const newTask = () => {
        setEditTaskFun(null);
    };

    const filterTasksBySearch = (term) => {
        const filteredList = tasksList.filter(task =>
            task.title.toLowerCase().includes(term.toLowerCase()) ||
            task.description.toLowerCase().includes(term.toLowerCase())
        );
        let sortedList = Sort(currFilter, filteredList);
        setFilteredListFun(sortedList);
    };

    return (
        < div className="actions" >
            <div className="filterContainer">
                <button className="filterButton" onClick={() => setShowDropdown(!showDropdown)}>
                    Filter by <i className="arrow down"></i>
                </button>
                {showDropdown && (
                    <div className="dropdownMenu">
                        <button onClick={() => sortTasks('date')}>Date</button>
                        <button onClick={() => sortTasks('title')}>Title</button>
                    </div>
                )}
            </div>
            <input
                value={searchTerm} onChange={handleSearchChange}
                type="text" id="searchTaskInput" placeholder="Search Task">
            </input>


            <AddTask type="button"
                data-bs-toggle="modal"
                data-bs-target="#taskModal"
                id="addIcon"
                onClick={newTask} />
        </div >
    );
}

export default Actions;