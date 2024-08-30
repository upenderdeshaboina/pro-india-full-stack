import React, { useState, useContext, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { TaskContext } from '../../Context/TaskContext';
import { CiEdit } from "react-icons/ci";
import './update.css';

const UpdatePopup = ({ task }) => {
    console.log(task);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');
    const { updateTask } = useContext(TaskContext);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task && task._id) {
            updateTask({ ...task, title, description, status }); // Include _id from task
            setTitle('');
            setDescription('');
            setStatus('To Do');
        }
    };

    const onSelectOption = (event) => {
        setStatus(event.target.value);
    };

    return (
        <Popup trigger={<button className="update-button"><CiEdit size={20} /></button>} modal>
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header">Update Task</div>
                    <div className="content">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="select-container">
                                <select value={status} onChange={onSelectOption}>
                                    <option value='To Do'>To Do</option>
                                    <option value='In Progress'>In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                            <button type="submit">Update Task</button>
                        </form>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default UpdatePopup;
