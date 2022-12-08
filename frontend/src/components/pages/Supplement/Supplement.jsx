import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { supplementActions } from '../../../store/supplement-slice';
import ImageCard from '../../molecules/ImageCard';

let initial = true;
const Supplement = () => {
    const lang = useSelector((state) => state.language.isKorean);
    const [isRequestSent, setIsRequestSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetchedSupplement, setFetchedSupplement] = useState([]);
    const supplementData = useSelector((state) => state.supplement.data);
    const token = useSelector((state) => state.auth.token);
    const addSupplement = () => {
        dispatch(
            supplementActions.getData([
                {
                    image: '',
                    name: '',
                    manufacturer: '',
                },
            ])
        );
    };

    const isEmptyFieldExistsInSupplement = () => {
        for (let obj of supplementData) {
            for (let key of Object.keys(obj)) {
                // if (key === 'image') continue;
                if (obj[key] === '') {
                    return true;
                }
            }
        }
        return false;
    };
    const saveSupplement = async () => {
        if (isEmptyFieldExistsInSupplement()) {
            alert(
                lang
                    ? 'Manufacturer, nutritional name and image are required!'
                    : '제조사와 영양제 이름, 이미지는 필수 입력입니다!'
            );
            return;
        }
        try {
            setLoading(true);
            await axios.post(
                '/api/v1/consumption/supplement/',
                {
                    type: 'supplement',
                    created_at: param.date,
                    consumptions: supplementData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(
                lang
                    ? 'Your diary has been saved!'
                    : '일기 저장이 완료되었습니다!'
            );
            dispatch(supplementActions.checkDataSaved());
            setIsRequestSent(true);
            setLoading(false);
        } catch (err) {
            console.log(err);
            if (err.response.status === 401) {
                setLoading(false);
                setIsRequestSent(false);
                return;
            }

            alert(
                lang
                    ? 'An error has occurred. Please contact the developer!'
                    : '오류가 발생했습니다. 담당자에게 문의해주세요!'
            );
            setIsRequestSent(false);
            setLoading(false);
        }
    };
    const param = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        // if (initial) {
        //     initial = false;
        //     return;
        // } else {
        // }
        setLoading(true);
        axios
            .get(`/api/v1/consumption/supplement/?date=${param.date}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.data.length === 0) {
                    setLoading(false);
                    return;
                }
                if (response.data?.consumptions.length > 0) {
                    setFetchedSupplement(response.data.consumptions);
                }
                dispatch(supplementActions.removeAll());
                setLoading(false);
            })
            .catch(async (err) => {
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
            });
    }, [isRequestSent, dispatch]);

    return loading ? (
        <CircularProgress />
    ) : (
        <>
            <button
                onClick={addSupplement}
                style={{
                    marginBottom: 20,
                    border: 'none',
                    borderRadius: '20px',
                    padding: '5px 35px',
                }}
            >
                {lang ? 'Add' : '추가하기'}
            </button>

            {fetchedSupplement.length === 0
                ? null
                : fetchedSupplement.map((item, index) =>
                      Object.keys(item).length === 0 ? null : (
                          <ImageCard
                              isSaved={item?.saved}
                              index={index}
                              key={index}
                              data={item}
                              setFetchedSupplement={setFetchedSupplement}
                          />
                      )
                  )}
            {supplementData.length === 0
                ? null
                : supplementData.map((item, index) =>
                      Object.keys(item).length === 0 ? null : (
                          <ImageCard
                              isSaved={item?.saved}
                              index={index}
                              key={index}
                              data={item}
                          />
                      )
                  )}

            {loading ? (
                <CircularProgress sx={{ marginBottom: 5 }} />
            ) : (
                <button
                    // 영양제 저장하는 버튼이었음
                    onClick={() => saveSupplement()}
                    style={{
                        marginBottom: '30px',
                        background: '#8A8A8E',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '5px 35px',
                        color: 'white',
                    }}
                >
                    {lang ? 'Save' : '저장'}
                </button>
            )}
        </>
    );
};
export default Supplement;
