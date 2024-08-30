import { useContext, useEffect } from "react";
import { TaskContext } from "../../Context/TaskContext";
import AddPopup from '../Popups/AddPopup'
import Navbar from "../Navbar";
import Cookies from 'js-cookie'
import './tasks.css'
import { Redirect } from "react-router-dom";
import UpdatePopup from "../Popups/UpdatePopup";
import { MdDelete } from "react-icons/md";


const TaskList=()=>{
    const {tasks,deleteTask}=useContext(TaskContext)

    console.log(tasks)

    const token=Cookies.get('jwtToken')

    useEffect(()=>{
        if(!token){
            return <Redirect to='/'/>
        }
    },[token])

    const onClickDelete=(id)=>{
        deleteTask(id)
    }
    return (
        <>
            <Navbar/>
            <div className="tasks-list">
                <h1 className="tasks-head">Tasks</h1>
                {tasks.length===0&&(<div className="nothing-view">
                    <img src='https://img.freepik.com/premium-vector/nothing-here-flat-illustration_418302-77.jpg?w=740' className="img" alt="no tasks"/>
                    <h1>There is No tasks Available</h1>
                    <AddPopup/>
                </div>)}
                {tasks.length>0&&(
                    <>
                    <ul className="list-container">
                    {tasks.map(e=>(
                        <li key={e._id} className="li">
                            <h1>{e.title}</h1>
                            <p>{e.description}</p>
                            <p>status:- {e.status}</p>
                            <UpdatePopup task={e} />
                            <button className="delete-btn" type="button" onClick={()=>onClickDelete(e._id)}><MdDelete size={20}/></button>
                        </li>
                    ))}
                </ul>
                <AddPopup/></>
            )}
            </div>
         </>
    )
}
export default TaskList