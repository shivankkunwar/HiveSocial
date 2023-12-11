
import Login from "./component/auth/Auth"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'

function App() {
  
  
  return (
    <div>
        <Router>
          <Routes>
          <Route key="login" path="/"  element={<Login/>}/>
          </Routes>
        </Router>
      
    </div>
  )
}

export default App
