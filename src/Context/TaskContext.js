import { createContext,useState,useEffect} from "react";
import axios from 'axios'
import Cookies from 'js-cookie'

export const TaskContext=createContext()

const TaskProvider=({children})=>{
    const [tasks,setTasks]=useState([])
    const token=Cookies.get('jwtToken')
    console.log(token)

    useEffect(()=>{
        if (token){
            const fetchTasks=async ()=>{
                try {
                    const response=await axios.get('https://pro-india-backend.onrender.com/tasks/all',{
                        headers:{Authorization:`Bearer ${token}`}
                    })
                    setTasks(response.data)
                } catch (error) {
                    console.error('Failed to find tasks:',error)
                }
            }
            fetchTasks();
        }
    },[token])
    
    

    const createTask=async(taskData)=>{
        try {
            const response=await axios.post('https://pro-india-backend.onrender.com/tasks/add',taskData,{
                headers:{Authorization:`Bearer ${token}`}
            })
            setTasks([...tasks,response.data])
        } catch (error) {
            console.error('Failed to create task:', error)
        }
    }

    const updateTask=async (taskData)=>{
        try {
            const response=await axios.put(`https://pro-india-backend.onrender.com/tasks/update/${taskData._id}`,taskData,{
                headers:{Authorization:`Bearer ${token}`}
            })
            setTasks(tasks.map(task=>task.id===taskData._id?response.data:task))
        } catch (error) {
            console.error('Failed to update task:', error)
        }
    }

    const deleteTask= async(taskId)=>{
        try {
            await axios.delete(`https://pro-india-backend.onrender.com/tasks/delete/${taskId}`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            setTasks(tasks.filter(task=>task._id!==taskId))
        } catch (error) {
            console.error('Failed to delete task:', error)
        }
    }
    

    return (
        <TaskContext.Provider value={{tasks,createTask,updateTask,deleteTask}}>
            {children}
        </TaskContext.Provider>
    )
}
export default TaskProvider