import { Box, Icon, IconBox, IconName, Tab } from './styled';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function Card({ menu, current }) {
    const params = useParams();

    return (
        <Box>
            {menu.map((item, index) => (
                <AnimatePresence key={index}>
                    {/* 영수증 사진 탭 추가 */}
                    {current === 'home' ? (
                        // item2로 url 조정
                        <Tab layoutId={item[2]}>
                            {
                                <Link
                                    key={index}
                                    to={
                                        params.category === 'diary'
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
                                </Link>
                            }
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
                                        <IconBox>
                                            <Icon
                                                style={{
                                                    width: '40px',
                                                    position: 'relative',
                                                }}
                                                src={item[0]}
                                            />
                                            <IconName>{item[1]}</IconName>
                                        </IconBox>
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
                                        }}
                                    >
                                        <IconBox>
                                            <Icon src={item[0]} />
                                            <IconName>{item[1]}</IconName>
                                        </IconBox>
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
