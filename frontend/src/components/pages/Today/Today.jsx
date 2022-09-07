import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Contents } from '../Home/styled';
import { Image, ImageBox, VerticalImageBox } from './Today.style';

const Today = ({ date }) => {
    const username = localStorage.getItem('username');
    const [loading, setLoading] = useState(false);
    // 이미지는 한번에 , 순서없이 나열만 진행
    const [mealImages, setMealImages] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
    });

    const [supplementImages, setSupplementImages] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `https://cryptic-castle-40575.herokuapp.com/api/v1/consumption/admin/?author=${username}&date=${date}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                const dateKey = [...Object.keys(response.data)];

                setMealImages({
                    breakfast: [...response.data[dateKey[0]].breakfast.image],
                    lunch: [...response.data[dateKey[0]].lunch.image],
                    dinner: [...response.data[dateKey[0]].dinner.image],
                    snack: [...response.data[dateKey[0]].snack.image],
                });
                setSupplementImages(() => {
                    let copy = [];
                    for (let obj of response.data[dateKey[0]].supplement) {
                        copy.push(obj.image);
                    }

                    return [...copy];
                });
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [username, date]);

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
            </VerticalImageBox>
        </Contents>
    );
};

export default Today;
