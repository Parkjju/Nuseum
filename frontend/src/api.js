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

export const fetchSupplement = ({ queryKey }) => {
    const [_, date, token] = queryKey;
    return axios.get(
        `https://www.nuseum.site/api/v1/consumption/supplement/?date=${date}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const fetchWaterAmount = ({ queryKey }) => {
    const [_, date, token] = queryKey;
    return axios.get(
        `https://www.nuseum.site/api/v1/consumption/water/?date=${date}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const fetchTodayData = ({ queryKey }) => {
    const [_, date, token] = queryKey;
    return axios.get(
        `https://www.nuseum.site/api/v1/consumption/today/?date=${date}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const fetchCurationList = ({ queryKey }) => {
    const [_, token] = queryKey;
    return axios.get(`https://www.nuseum.site/api/v1/recommendation/user/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const fetchPdf = ({ queryKey }) => {
    const [_, token] = queryKey;
    return axios.get(`https://www.nuseum.site/api/v1/result/examination/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
