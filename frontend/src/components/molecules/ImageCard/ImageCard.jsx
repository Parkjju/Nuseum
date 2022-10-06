import { Label } from '../../pages/Record/styled';
import {
    Container,
    DescriptionBox,
    DescriptionInput,
    SupplementImage,
    ImageBox,
} from './ImageCard.style';
import imageCompression from 'browser-image-compression';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useActions from '../../../hooks/useActions';
import { supplementActions } from '../../../store/supplement-slice';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import handleExpired from '../../../helpers/handleExpired';

const ImageCard = ({ isSaved, index, data, setFetchedSupplement }) => {
    // index에 접근하여 해당 데이터 수정

    const token = useSelector((state) => state.auth.token);
    const params = useParams();
    const action = useActions(params.when);
    const supplementData = useSelector((state) => state.supplement.data);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [currentImage, setCurrentImage] = useState(data ? data.image : null);
    const [supplementName, setSupplementName] = useState(data ? data.name : '');
    const [manufacturer, setManufacturer] = useState(
        data ? data.manufacturer : ''
    );

    const [isUsableData, setIsUsableData] = useState(
        data.manufacturer !== undefined &&
            data.image !== undefined &&
            data.name !== undefined
    );
    const [isNew, setIsNew] = useState(
        data.manufacturer === '' && data.name === '' && data.image === ''
    );

    const addFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            actionImgCompress(e.target.files[0]);
        }
    };

    const actionImgCompress = async (fileSrc) => {
        const options = {
            maxSizeMB: 3,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        try {
            // 압축 결과
            const compressedFile = await imageCompression(fileSrc, options);

            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                const base64data = reader.result;
                dispatch(
                    supplementActions.modifyData({
                        type: 'image',
                        index,
                        data: base64data,
                    })
                );
            };
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeManufacture = (e) => {
        setManufacturer(e.target.value);
        dispatch(
            supplementActions.modifyData({
                data: e.target.value,
                index,
                type: 'manufacturer',
            })
        );
    };
    const onChangeSupplementName = (e) => {
        setSupplementName(e.target.value);
        dispatch(
            supplementActions.modifyData({
                data: e.target.value,
                index,
                type: 'name',
            })
        );
    };

    return loading ? (
        <CircularProgress sx={{ margin: '100px auto' }} />
    ) : (
        <Container>
            <ImageBox>
                {data && data.image ? (
                    <SupplementImage src={data.image} />
                ) : currentImage ? (
                    <SupplementImage src={currentImage} />
                ) : (
                    <>
                        <Label htmlFor='input-file'>
                            <span
                                style={{ cursor: 'pointer' }}
                                className='material-symbols-outlined'
                            >
                                add
                            </span>
                        </Label>
                        <input
                            onChange={addFile}
                            type='file'
                            id='input-file'
                            style={{ display: 'none' }}
                            accept='image/*'
                        />
                    </>
                )}
            </ImageBox>

            <DescriptionBox>
                <DescriptionInput
                    value={manufacturer}
                    onChange={onChangeManufacture}
                    placeholder='제조사'
                    disabled={(isUsableData && !isNew) || isSaved}
                />
                <DescriptionInput
                    value={supplementName}
                    placeholder='영양제 이름'
                    onChange={onChangeSupplementName}
                    disabled={(isUsableData && !isNew) || isSaved}
                />
            </DescriptionBox>
            <span
                style={{ cursor: 'pointer' }}
                className='material-symbols-outlined'
                onClick={async () => {
                    if (window.confirm('입력한 영양제 정보를 삭제할까요?')) {
                        setLoading(true);
                        try {
                            if (data.id) {
                                await axios.delete(
                                    `/api/v1/consumption/supplement/${data.id}/`,
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                );

                                // fetched로 불러온거 삭제하는 로직
                                setFetchedSupplement((prev) => {
                                    let count = 0;
                                    for (let obj of prev) {
                                        if (obj.id === data.id) {
                                            return [
                                                ...prev.slice(0, count),
                                                ...prev.slice(count + 1),
                                            ];
                                        }
                                    }
                                });
                            } else {
                                dispatch(action.removeData(index));
                            }
                            setLoading(false);
                            alert('영양제 정보가 삭제되었습니다!');
                        } catch (err) {
                            console.log(err);
                            if (err.response?.status === 401) {
                                const { exp, token } = await handleExpired();
                                dispatch(
                                    authActions.login({
                                        token: token.data.access,
                                        exp,
                                    })
                                );
                            } else {
                                alert(
                                    '오류가 발생했습니다. 담당자에게 문의해주세요!'
                                );
                            }
                            setLoading(false);
                        }
                    }
                }}
            >
                delete
            </span>
        </Container>
    );
};

export default ImageCard;
