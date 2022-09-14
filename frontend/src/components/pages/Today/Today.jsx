import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
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
    const username = localStorage.getItem('username');
    const [loading, setLoading] = useState(false);
    const [foodTag, setFoodTag] = useState([]);
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

    const getFoodName = useCallback(async (data) => {
        let copy = [];
        let promises = [];

        // breakfast, lunch...
        for (let key in data) {
            if (key === 'supplement') break;

            if (data[key].data) {
                for (let obj of data[key].data) {
                    copy.push(obj.food_id);
                }
            }
        }

        for (let id of copy) {
            let response = await axios.get(
                `https://cryptic-castle-40575.herokuapp.com/api/v1/food/name/?id=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            );
            promises.push(response);
        }
        let allResponse = await axios.all(promises);

        return [...allResponse];
    }, []);

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `https://cryptic-castle-40575.herokuapp.com/api/v1/consumption/today/?date=${date}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            )
            .then(async (response) => {
                setMealImages({
                    breakfast: [...response.data.breakfast.image],
                    lunch: [...response.data.lunch.image],
                    dinner: [...response.data.dinner.image],
                    snack: [...response.data.snack.image],
                });
                setSupplementInformation(() => {
                    let copy = [];
                    for (let obj of response.data.supplement) {
                        copy.push([obj.manufacturer, obj.name]);
                    }
                    return [...copy];
                });

                setWaterAmount(response.data.water);

                setSupplementImages(() => {
                    let copy = [];
                    for (let obj of response.data.supplement) {
                        copy.push(obj.image);
                    }

                    return [...copy];
                });

                let result = await getFoodName({ ...response.data });

                let nameArray = [];
                let amountArray = [];

                for (let obj of result) {
                    nameArray.push([obj.data.name]);
                }
                for (let meal in response.data) {
                    if (meal === 'supplement') break;

                    if (response.data[meal].data) {
                        for (let obj of response.data[meal].data) {
                            amountArray.push(obj.amount);
                        }
                    }
                }
                for (let i in nameArray) {
                    if (amountArray[i]) {
                        nameArray[i] = nameArray[i].concat(amountArray[i]);
                    }
                }

                setFoodTag(nameArray);

                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [username, date, getFoodName]);

    return loading ? (
        <CircularProgress />
    ) : (
        <Contents>
            <VerticalImageBox>
                {Object.values(mealImages).map((arr) =>
                    arr.map((item, index) => (
                        <ImageBox key={index}>
                            <Image src={item} />
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
                <SummaryTitle>오늘 먹은 음식</SummaryTitle>
                <TagBox
                    style={{ width: '80%', padding: '0px 30px', marginTop: 30 }}
                >
                    {foodTag.map((item, index) => (
                        <Tag
                            key={index}
                        >{`${item[0]} ${item[1]}g 또는 ml`}</Tag>
                    ))}
                </TagBox>
                <SummaryTitle>영양제</SummaryTitle>
                <TagBox style={{ padding: '0px 30px', marginTop: 30 }}>
                    {supplementInformation.map((item, index) => (
                        <Tag key={index}>{`${item[0]} ${item[1]}`}</Tag>
                    ))}
                </TagBox>
                <SummaryTitle>오늘 섭취한 물의 양</SummaryTitle>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '90%',
                        margin: '30px auto',
                        fontSize: 14,
                    }}
                >
                    <span>마신 양 : {waterAmount}ml</span>
                    <span>
                        남은 양 :{' '}
                        {2000 - waterAmount > 0
                            ? 2000 - waterAmount
                            : `+ ${waterAmount - 2000}`}
                        ml
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
                    <Gauge water={waterAmount} maxWidth={boxWidth} />
                </Box>
            </Summary>
        </Contents>
    );
};

export default Today;
