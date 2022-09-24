import { CircularProgress } from '@mui/material';
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/atom/Header';
import Fallback from './components/molecules/Fallback';
import Analysis from './components/pages/Analysis';
import Diary from './components/pages/Diary';
import Question from './components/pages/Question';
import QuestionDetail from './components/pages/QuestionDetail';
import QuestionForm from './components/pages/QuestionForm';

const Record = React.lazy(() => import('./components/pages/Record'));
const Login = React.lazy(() => import('./components/molecules/Login'));
const Register = React.lazy(() => import('./components/molecules/Register'));
const Home = React.lazy(() => import('./components/pages/Home'));
const DiaryCalendar = React.lazy(() =>
    import('./components/pages/DiaryCalendar')
);

function Router() {
    return (
        <Suspense fallback={<Fallback />}>
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
                    <Route path='/question' element={<Question />} />
                    <Route path='/question/post' element={<QuestionForm />} />
                    <Route path='/question/:id' element={<QuestionDetail />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default Router;
