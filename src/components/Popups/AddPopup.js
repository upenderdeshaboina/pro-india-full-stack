import React, { useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import { TaskContext } from '../../Context/TaskContext';
import './addPopup.css'

const AddPopup = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { createTask } = useContext(TaskContext);
    const [status,setStatus]=useState('To Do')

    const handleSubmit = (e) => {
        e.preventDefault();
        createTask({ title, description,status});
        setTitle('');
        setDescription('');
        setStatus('To Do')
    };

    const onSelectOption=event=>{
        setStatus(event.target.value)
    }

    return (
        <Popup trigger={<button className="button">Add Task</button>} modal>
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header">Add Task</div>
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
                            <div className='select-container'>
                                <select onChange={onSelectOption}>
                                    <option value='To Do'>To Do</option>
                                    <option value='In Progress'>In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                            <button type="submit" className='b'>Add Task</button>
                        </form>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default AddPopup;
