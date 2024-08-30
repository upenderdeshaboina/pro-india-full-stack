import { BrowserRouter,Switch,Route } from "react-router-dom";
import AuthProvider from './Context/AuthContext'
import TaskProvider from './Context/TaskContext'
import Login from "./components/Auth/login";
import Register from './components/Auth/Register'
import TaskList from './components/Tasks/TaskList'
import './App.css'

const App=()=>{
  return (
    <div className="app-container">
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path='/tasks' component={TaskList}/>
              <Route exact path='/' component={Login}/>
              <Route exact path='/register' component={Register}/>
            </Switch>
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>
    </div>
  )
}
export default App