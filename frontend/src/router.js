import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Login from './components/molecules/Login';
import Register from './components/molecules/Register';
import Home from './components/pages/Home';
import { token } from './recoil/token/token';

function Router() {
    const tokenValue = useRecoilValue(token);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
