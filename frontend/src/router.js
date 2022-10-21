import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/atom/Header';
import Login from './components/molecules/Login';
import Register from './components/molecules/Register';
import Analysis from './components/pages/Analysis';
import Diary from './components/pages/Diary';
import Curation from './components/pages/Curation';
import DiaryCalendar from './components/pages/DiaryCalendar';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound/NotFound';
import Question from './components/pages/Question';
import QuestionDetail from './components/pages/QuestionDetail';
import QuestionForm from './components/pages/QuestionForm';
import Record from './components/pages/Record';
import My from './components/pages/My';
// import MailDetail from './components/atom/New/MailDetail';

function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<Home />}>
                    {/* <Route path='/:id' element={<MailDetail />} /> */}
                </Route>

                <Route path='/diary' element={<DiaryCalendar />}>
                    <Route path=':date' element={<Diary />}></Route>
                </Route>
                <Route path='/food' element={<Curation />} />
                <Route path='/analysis' element={<Analysis />} />
                <Route path='/:category/:date/:when' element={<Record />} />
                <Route path='/question' element={<Question />} />
                <Route path='/question/post' element={<QuestionForm />} />
                <Route path='/question/:id' element={<QuestionDetail />} />
                <Route path='/record' element={<My />} />
                {/* <Route path='*' element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
