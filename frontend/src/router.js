import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/molecules/Login';
import Register from './components/molecules/Register';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;