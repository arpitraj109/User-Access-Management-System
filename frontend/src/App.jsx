import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import RequestAccess from './pages/RequestAccess';
import CreateSoftware from './pages/CreateSoftware';
import PendingRequests from './pages/PendingRequests';

function App()
{
  const user=JSON.parse(localStorage.getItem("user"));
  return(
    <BrowserRouter>
    {user && <Navbar/>}
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login'element={<Login/>}/>

        <Route path="/create-software" element={<CreateSoftware />} />
        <Route path="/request-access" element={<RequestAccess />} />
        <Route path="/pending-requests" element={<PendingRequests />} />

        <Route path='*' element={<Navigate to="/login/"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;