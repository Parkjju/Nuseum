import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/atom/Header';
import Login from './components/molecules/Login';
import Register from './components/molecules/Register';
import Analysis from './components/pages/Analysis';
import Diary from './components/pages/Diary';
import DiaryCalendar from './components/pages/DiaryCalendar';
import Home from './components/pages/Home';
import Question from './components/pages/Question';
import Record from './components/pages/Record';

function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<Home />} />
                <Route path='/diary' element={<DiaryCalendar />}>
                    <Route path=':date' element={<Diary />}></Route>
                </Route>
                <Route path='/analysis' element={<Analysis />} />
                <Route path='/:category/:date/:when' element={<Record />} />
                <Route path='/question' element={<Question />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
