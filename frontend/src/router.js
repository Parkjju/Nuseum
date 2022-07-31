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
                {!tokenValue ? (
                    <Route path='/login' element={<Login />} />
                ) : (
                    <Route path='/' element={<Home />} />
                )}
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
