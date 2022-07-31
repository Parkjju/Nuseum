import Router from './router';
import { RecoilRoot } from 'recoil';
import { Helmet } from 'react-helmet';

function App() {
    return (
        <RecoilRoot>
            <Helmet>
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0'
                />
            </Helmet>
            <Router />
        </RecoilRoot>
    );
}

export default App;
