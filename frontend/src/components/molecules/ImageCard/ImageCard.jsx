import { Label } from '../../pages/Record/styled';
import {
    Container,
    DescriptionBox,
    DescriptionInput,
    SupplementImage,
    ImageBox,
} from './ImageCard.style';
import imageCompression from 'browser-image-compression';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { supplementState } from '../../../recoil/supplement/supplement';

const ImageCard = ({ removeImageCard, index, data }) => {
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

    // 전역상태 값
    const [globalSupplement, setGlobalSupplement] =
        useRecoilState(supplementState);

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
                setCurrentImage(base64data);
            };
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeManufacture = (e) => {
        setManufacturer(e.target.value);
    };
    const onChangeSupplementName = (e) => {
        setSupplementName(e.target.value);
    };

    useEffect(() => {
        if (
            supplementName === '' &&
            manufacturer === '' &&
            currentImage === null
        ) {
            return;
        }
        setGlobalSupplement((prev) => {
            let modifiedElement = {
                name: supplementName,
                image: currentImage,
                manufacturer: manufacturer,
            };
            let left = prev.slice(0, index);
            let right = prev.slice(index + 1);
            return [...left, modifiedElement, ...right];
        });
    }, [supplementName, manufacturer, currentImage]);

    return (
        <Container>
            <ImageBox>
                {data && data.image ? (
                    <SupplementImage src={data.image} />
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
                    disabled={isUsableData && !isNew}
                />
                <DescriptionInput
                    value={supplementName}
                    placeholder='영양제 이름'
                    onChange={onChangeSupplementName}
                    disabled={isUsableData && !isNew}
                />
            </DescriptionBox>
            <span
                style={{ cursor: 'pointer' }}
                className='material-symbols-outlined'
                onClick={() => removeImageCard()}
            >
                delete
            </span>
        </Container>
    );
};

export default ImageCard;