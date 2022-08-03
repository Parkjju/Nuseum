import { Box, Icon, Name, Tab } from './styled';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function Card({ menu, current }) {
    const params = useParams();

    return (
        <Box>
            {menu.map((item, index) => (
                <Link
                    key={index}
                    to={
                        params.date ? `${params.date}/${item[2]}` : `${item[2]}`
                    }
                >
                    <AnimatePresence>
                        {current === 'home' ? (
                            <Tab layoutId={item[2]}>
                                {item[1] === '저녁' ? (
                                    <>
                                        <Icon
                                            style={{ width: '50px' }}
                                            src={item[0]}
                                        />
                                        <Name>{item[1]}</Name>
                                    </>
                                ) : (
                                    <>
                                        <Icon src={item[0]} />
                                        <Name>{item[1]}</Name>
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
                                        <Icon
                                            style={{ width: '50px' }}
                                            src={item[0]}
                                        />
                                        <Name>{item[1]}</Name>
                                    </>
                                ) : (
                                    <>
                                        <Icon src={item[0]} />
                                        <Name>{item[1]}</Name>
                                    </>
                                )}
                            </Tab>
                        )}
                    </AnimatePresence>
                </Link>
            ))}
        </Box>
    );
}
export default Card;
