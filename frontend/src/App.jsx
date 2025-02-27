import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/login';
import Register from './pages/Register';
import { AuthProvider } from './pages/AuthContext';
import CreatePost from './pages/CreatePost';


function App() {
 
  return (
   <>
   <AuthProvider>
   <Navbar/>
      <Routes>
        <Route exact path="/"  element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path='/createpost' element={<CreatePost/>}/>
      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;