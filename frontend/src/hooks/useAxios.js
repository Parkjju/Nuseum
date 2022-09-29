import axios from 'axios';
import { useState } from 'react';

const useAxios = (requestConfig, applyData) => {
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = async () => {
        setIsLoading(true);

        try {
            const response = await axios({
                method: requestConfig.method,
                url: requestConfig.url,
                data: {
                    ...applyData,
                },
                headers: requestConfig.headers,
            });
        } catch (error) {
            alert('에러가 발생하였습니다. 개발자에게 문의해주세요!');
        }
        setIsLoading(false);
    };

    return {
        isLoading,
        sendRequest,
    };
};

export default useAxios;
