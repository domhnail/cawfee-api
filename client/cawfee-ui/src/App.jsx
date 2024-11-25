import { Outlet } from 'react-router-dom';
import Sidebar from './ui/Sidebar'

function App() {
  return (
    <>
    <h1>welcome to cawfee</h1>
    <p>This is the master page.</p>
    <div>
      <Sidebar />
    </div>
    <div>
      <br></br>
      <Outlet />
      <p>This is the child page.</p>
    </div>
    </>
  )
}

export default App
