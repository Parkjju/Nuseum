import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderBox, Icon } from './Header.style';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/auth-slice';
import { FormControlLabel, Switch } from '@mui/material';
import { languageActions } from '../../../store/language-slice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loc = useLocation();
    const locationArray = loc.pathname.split('/');
    const lang = useSelector((state) => state.language.isKorean);

    const [backActive, setBackActive] = useState(true);
    const [homeActive, setHomeActive] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(
        window.sessionStorage.getItem('isLoggedIn')
    );
    const [isOpen, setIsOpen] = useState(false);

    // 세션스토리지 isLoggedIn 관리
    useEffect(() => {
        setIsLoggedIn(window.sessionStorage.getItem('isLoggedIn'));
        if (
            location.pathname === '/login' &&
            window.sessionStorage.getItem('isLoggedIn')
        ) {
            window.sessionStorage.removeItem('isLoggedIn');
            setIsLoggedIn(null);
            location.reload();
        }
    }, [loc.pathname]);

    return (
        <HeaderBox>
            <Helmet>
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0'
                />
            </Helmet>

            {isLoggedIn ? (
                <>
                    <div
                        style={{
                            height: '50px',
                            paddingLeft: 20,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        {location.pathname === '/' ? null : (
                            <>
                                <Icon
                                    onClick={() => {
                                        if (!backActive) return;
                                        if (
                                            locationArray.length > 1 &&
                                            locationArray.length < 4
                                        ) {
                                            navigate('/');
                                            return;
                                        }
                                        if (locationArray[1].length > 0) {
                                            navigate(-1);
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
                                        if (!homeActive) return;
                                        if (homeActive) {
                                            navigate('/');
                                        } else {
                                            return null;
                                        }
                                        setIsOpen(false);
                                    }}
                                    active={homeActive}
                                    className='material-symbols-outlined'
                                >
                                    home
                                </Icon>
                            </>
                        )}
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={() =>
                                        dispatch(
                                            languageActions.changeLanguage()
                                        )
                                    }
                                    checked={lang}
                                    name={lang ? 'ENGLISH' : '한국어'}
                                />
                            }
                            label={lang ? 'ENGLISH' : '한국어'}
                        />
                    </div>

                    <div
                        style={{
                            paddingRight: 20,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                        // onMouseEnter={() => setIsOpen(true)}
                        // onMouseLeave={() => setIsOpen(false)}
                    >
                        {/* <>
                            {isOpen ? (
                                <Mail
                                    setIsRead={setIsRead}
                                    setIsOpen={setIsOpen}
                                    list={list}
                                />
                            ) : null}

                            <Icon
                                onClick={() => {
                                    setIsOpen((prev) =>
                                        isInitial ? true : !prev
                                    );
                                    setIsInitial(false);
                                }}
                                className='material-symbols-outlined'
                            >
                                notifications
                            </Icon>
                            {isRead ? null : <New />}
                        </> */}

                        <Icon
                            onClick={async () => {
                                if (
                                    window.confirm(
                                        lang
                                            ? 'Should I log out?'
                                            : '로그아웃 하시겠습니까?'
                                    )
                                ) {
                                    if (homeActive) {
                                        try {
                                            await axios.post(
                                                '/api/v1/account/logout/'
                                            );

                                            dispatch(authActions.logout());
                                            window.sessionStorage.removeItem(
                                                'isLoggedIn'
                                            );
                                            alert(
                                                lang
                                                    ? 'You are logged out!'
                                                    : '로그아웃 되었습니다!'
                                            );
                                            navigate('/login');
                                        } catch (error) {
                                            console.log(error);
                                        }
                                    } else {
                                        return null;
                                    }
                                }
                            }}
                            active={homeActive}
                            className='material-symbols-outlined'
                        >
                            logout
                        </Icon>
                    </div>
                </>
            ) : null}
        </HeaderBox>
    );
};

export default Header;
