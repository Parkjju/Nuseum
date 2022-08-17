import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderBox, Icon } from './Header.style';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [backActive, setBackActive] = useState(true);
    const [homeActive, setHomeActive] = useState(true);

    useEffect(() => {
        if (
            location.pathname === '/login' ||
            location.pathname === '/register'
        ) {
            setBackActive(false);
            setHomeActive(false);
        }
    }, []);

    return (
        <HeaderBox>
            <Helmet>
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0'
                />
            </Helmet>

            <Icon
                onClick={() => {
                    if (backActive) {
                        navigate(-1);
                    } else {
                        return null;
                    }
                }}
                active={backActive}
                className='material-symbols-outlined'
            >
                arrow_back
            </Icon>
            <Icon
                onClick={() => {
                    if (homeActive) {
                        navigate('/');
                    } else {
                        return null;
                    }
                }}
                active={homeActive}
                className='material-symbols-outlined'
            >
                home
            </Icon>
        </HeaderBox>
    );
};

export default Header;
