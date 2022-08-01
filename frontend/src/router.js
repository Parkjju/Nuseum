import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/molecules/Login';
import Register from './components/molecules/Register';
import Home from './components/pages/Home';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<Home />} />
                {/* <Route path="/survey" element={<Survey /> }/> */}
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
