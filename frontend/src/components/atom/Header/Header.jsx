import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderBox, Icon } from './Header.style';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const locationArray = location.pathname.split('/');

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

            <div
                style={{
                    paddingLeft: 30,
                    width: 80,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Icon
                    onClick={() => {
                        if (locationArray.length === 3) {
                            navigate('/');
                            return;
                        }
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
            </div>
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
                style={{ paddingRight: 30 }}
            >
                logout
            </Icon>
        </HeaderBox>
    );
};

export default Header;
