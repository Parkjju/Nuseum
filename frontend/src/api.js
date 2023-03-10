import axios from 'axios';

export const fetchDailyFood = ({ queryKey }) => {
    const [_, date, type, token] = queryKey;
    return axios.get(
        `https://www.nuseum.site/api/v1/consumption/food/?date=${date}&type=${type}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
