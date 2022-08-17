import { Box, Icon, IconBox, IconName, Name, Tab } from './styled';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function Card({ menu, current }) {
    const params = useParams();

    return (
        <Box>
            {menu.map((item, index) => (
                <AnimatePresence>
                    {/* 영수증 사진 탭 추가 */}
                    {current === 'home' ? (
                        <Tab layoutId={item[2]}>
                            {item[1] === '저녁' ? (
                                <>
                                    <Link
                                        key={index}
                                        to={
                                            params.date
                                                ? `${params.date}/${item[2]}`
                                                : `${item[2]}`
                                        }
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}
                                    >
                                        <IconBox>
                                            <Icon
                                                style={{ width: '40px' }}
                                                src={item[0]}
                                            />
                                            <IconName
                                                style={{ marginLeft: '40px' }}
                                            >
                                                {item[1]}
                                            </IconName>
                                        </IconBox>
                                        <span class='material-symbols-outlined'>
                                            chevron_right
                                        </span>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        key={index}
                                        to={
                                            params.date
                                                ? `${params.date}/${item[2]}`
                                                : `${item[2]}`
                                        }
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}
                                    >
                                        <IconBox>
                                            <Icon src={item[0]} />
                                            <IconName>{item[1]}</IconName>
                                        </IconBox>
                                        <span class='material-symbols-outlined'>
                                            chevron_right
                                        </span>
                                    </Link>
                                </>
                            )}
                        </Tab>
                    ) : (
                        <Tab
                            layoutId={item[2]}
                            transition={{
                                velocity: 10,
                            }}
                        >
                            {item[1] === '저녁' ? (
                                <>
                                    <IconBox>
                                        <Icon
                                            style={{
                                                width: '40px',
                                                position: 'relative',
                                                left: -5,
                                            }}
                                            src={item[0]}
                                        />
                                        <IconName
                                            style={{ marginLeft: '40px' }}
                                        >
                                            {item[1]}
                                        </IconName>
                                    </IconBox>
                                    <Link
                                        key={index}
                                        to={
                                            params.date
                                                ? `${params.date}/${item[2]}`
                                                : `${item[2]}`
                                        }
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black',
                                        }}
                                    >
                                        <span class='material-symbols-outlined'>
                                            add
                                        </span>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <IconBox>
                                        <Icon src={item[0]} />
                                        <IconName>{item[1]}</IconName>
                                    </IconBox>

                                    <Link
                                        key={index}
                                        to={
                                            params.date
                                                ? `${params.date}/${item[2]}`
                                                : `${item[2]}`
                                        }
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black',
                                        }}
                                    >
                                        <span class='material-symbols-outlined'>
                                            add
                                        </span>
                                    </Link>
                                </>
                            )}
                        </Tab>
                    )}
                </AnimatePresence>
            ))}
        </Box>
    );
}
export default Card;
