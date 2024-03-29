import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTodayData } from '../../../api';
import { Contents } from '../Home/styled';
import { Tag, TagBox } from '../Record/styled';
import { Box, Gauge } from '../Water/Water.style';
import {
    Image,
    ImageBox,
    Summary,
    SummaryTitle,
    VerticalImageBox,
} from './Today.style';

const Today = ({ date }) => {
    const token = useSelector((state) => state.auth.token);
    const lang = useSelector((state) => state.language.isKorean);

    const username = localStorage.getItem('username');
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [foodTag, setFoodTag] = useState([]);
    const params = useParams();
    const [supplementInformation, setSupplementInformation] = useState([]);
    // 이미지는 한번에 , 순서없이 나열만 진행
    const [mealImages, setMealImages] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
    });
    const [boxWidth, setBoxWidth] = useState(
        window.innerWidth > 800 ? 800 * 0.8 : window.innerWidth * 0.8
    );
    window.onresize = () => {
        setBoxWidth(boxRef.current.clientWidth);
    };

    window.onload = () => {
        setBoxWidth(boxRef.current.clientWidth);
    };
    const boxRef = useRef();
    const [waterAmount, setWaterAmount] = useState(0);

    const [supplementImages, setSupplementImages] = useState([]);

    const queryResult = useQuery(
        ['today', params.date, token],
        fetchTodayData,
        {
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                setMealImages(() => {
                    return {
                        breakfast: [...response.data.breakfast.image],
                        lunch: [...response.data.lunch.image],
                        dinner: [...response.data.dinner.image],
                        snack: [...response.data.snack.image],
                    };
                });
                setSupplementImages(() => {
                    let copy = [];
                    for (let obj of response.data.supplement) {
                        copy.push(obj.image);
                    }
                    return copy;
                });

                if (response.data?.water?.length > 0) {
                    setWaterAmount(response.data.water[0].amount);
                }
                setFoodTag(() => {
                    let copy = [];
                    for (let key in response.data) {
                        if (key === 'supplement' || key === 'water') continue;
                        copy.push(...response.data[key].data);
                    }
                    return copy;
                });
                setSupplementInformation(() => {
                    if (response.data.supplement.length === 0) {
                        return [];
                    }
                    let copy = [];
                    for (let obj of response.data.supplement) {
                        copy.push(obj);
                    }
                    return copy;
                });
                setLoading(false);
            },
            onError: (err) => {
                console.log(err);
                if (err.response.status === 401) {
                    setLoading(false);
                    return;
                }

                alert(
                    lang
                        ? 'An error has occurred. Please contact the developer!'
                        : '오류가 발생했습니다. 담당자에게 문의해주세요!'
                );
                setLoading(false);
            },
        }
    );

    return loading ? (
        <CircularProgress />
    ) : (
        <Contents>
            <VerticalImageBox>
                {Object.values(mealImages).map((arr) =>
                    arr.map((item, index) => (
                        <ImageBox key={index}>
                            <Image src={item.image} />
                        </ImageBox>
                    ))
                )}
                {supplementImages.map((item, index) => (
                    <ImageBox key={index}>
                        <Image src={item} />
                    </ImageBox>
                ))}
            </VerticalImageBox>
            <Summary>
                <SummaryTitle>
                    {lang ? 'The food I ate today' : '오늘 먹은 음식'}
                </SummaryTitle>
                <TagBox
                    style={{ width: '80%', padding: '0px 30px', marginTop: 30 }}
                >
                    {foodTag.map((item, index) => (
                        <Tag
                            key={index}
                        >{`${item.name} ${item.amount}g 또는 ml`}</Tag>
                    ))}
                </TagBox>
                <SummaryTitle>
                    {lang ? 'Nutritional supplements' : '보충제'}
                </SummaryTitle>
                <TagBox style={{ padding: '0px 30px', marginTop: 30 }}>
                    {supplementInformation.map((item, index) => (
                        <Tag
                            key={index}
                        >{`${item.manufacturer} ${item.name}`}</Tag>
                    ))}
                </TagBox>
                <SummaryTitle>
                    {lang
                        ? 'The amount of water I drank today'
                        : '오늘 섭취한 물의 양'}
                </SummaryTitle>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '90%',
                        margin: '30px auto',
                        fontSize: 14,
                    }}
                >
                    <span>
                        {lang
                            ? `Amount of drink water : ${waterAmount}ml`
                            : `마신 양 : ${waterAmount}ml`}
                    </span>
                    <span>
                        {lang
                            ? `Remaining amount : ${
                                  1500 - waterAmount > 0
                                      ? 1500 - waterAmount
                                      : `+ ${waterAmount - 1500}`
                              }ml`
                            : `남은 양 :
                    ${
                        1500 - waterAmount > 0
                            ? 1500 - waterAmount
                            : `+ ${waterAmount - 1500}`
                    }ml`}
                    </span>
                </div>
                <Box
                    ref={boxRef}
                    style={{
                        width: '90%',
                        margin: '0px auto',
                        paddingBottom: 30,
                    }}
                >
                    <Gauge
                        water={waterAmount}
                        maxWidth={boxWidth}
                        style={{
                            maxWidth: '100%',
                        }}
                    />
                </Box>
            </Summary>
        </Contents>
    );
};

export default Today;
