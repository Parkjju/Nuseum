import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/molecules/Login';
import Register from './components/molecules/Register';
import Diary from './components/pages/Diary';
import DiaryCalendar from './components/pages/DiaryCalendar';
import Home from './components/pages/Home';
import Record from './components/pages/Record';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<Home />} />
                <Route path='/:category' element={<DiaryCalendar />}>
                    <Route path=':date' element={<Diary />}></Route>
                </Route>
                <Route path='/:category/:date/:when' element={<Record />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
