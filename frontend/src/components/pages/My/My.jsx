import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
// import * as pdfjs from '../../../../node_modules/pdfjs-dist/build/pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import prev from '../../../assets/prev.png';
import next from '../../../assets/next.png';

import { Page, Document } from 'react-pdf';

import { useDispatch, useSelector } from 'react-redux';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';
import Container from '../../atom/Container';
import { Title } from '../Curation/Curation.styled';

const My = () => {
    const token = useSelector((state) => state.auth.token);
    const [url, setUrl] = useState('');
    const canvasRef = useRef();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);

    const [visibleIndex, setVisibleIndex] = useState(0);

    const [pdfRef, setPdfRef] = useState();

    const [isNegative, setIsNegative] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumArray, setPageNumArray] = useState([]);

    const width = window.innerWidth > 800 ? 800 : window.innerWidth;
    const dispatch = useDispatch();

    const renderPage = useCallback(
        (pageNum, pdf = pdfRef) => {
            pdf &&
                pdf.getPage(pageNum).then(function (page) {
                    const viewport = page.getViewport({ scale: 1.5 });
                    const canvas = canvasRef.current;

                    if (!canvas) return;

                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    const renderContext = {
                        canvasContext: canvas.getContext('2d'),
                        viewport: viewport,
                    };

                    page.render(renderContext);
                    // setLoading(false);
                });
        },
        [pdfRef]
    );

    useEffect(() => {
        console.log('url, pdfjs useEffect called!');

        if (!url) {
            return;
        }

        const loadingTask = pdfjs.getDocument({
            url,
        });

        loadingTask.promise.then(
            (loadedPdf) => {
                setPdfRef(loadedPdf);
            },
            function (reason) {
                console.error(reason);
            }
        );
    }, [url, pdfjs]);

    useEffect(() => {
        axios
            .get('/api/v1/result/examination/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setLoading(true);
                setUrl(response.data.data);
            })
            .catch(async (err) => {
                if (err.response.status === 401) {
                    const { exp, token } = await handleExpired();
                    dispatch(
                        authActions.login({
                            token: token.data.access,
                            exp,
                        })
                    );
                } else {
                    alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
                }
                setFetchLoading(false);
            });
    }, [token]);

    useEffect(() => {
        console.log('pdfRef, rednerpage, currentPage useEffect Called!');
        setPageNum(pdfRef?._pdfInfo.numPages);
        renderPage(currentPage, pdfRef);
    }, [pdfRef, renderPage, currentPage]);

    useEffect(() => {
        console.log('pageNum useEffect called!');
        let copy = [];
        for (let i = 1; i <= pageNum; i++) {
            copy.push(i);
        }
        setPageNumArray([...copy]);
    }, [pageNum]);

    const onClick = useCallback(
        (type) => {
            switch (type) {
                case 'prev':
                    if (currentPage === 1) {
                        return;
                    }
                    setCurrentPage((prev) => prev - 1);
                    return;
                case 'next':
                    if (currentPage === pageNum) {
                        return;
                    }
                    setCurrentPage((prev) => prev + 1);
                    return;
            }
        },
        [currentPage, pageNum]
    );

    return (
        <Container>
            {loading ? (
                <CircularProgress
                    sx={{
                        display: 'block',
                        margin: '0 auto',
                        marginBottom: 30,
                    }}
                />
            ) : null}

            {url.length > 0 ? (
                <AnimatePresence>
                    {pageNumArray.map((idx, index) =>
                        idx === currentPage ? (
                            <motion.div
                                key={currentPage}
                                dragSnapToOrigin
                                initial={{
                                    x:
                                        index === 0
                                            ? 0
                                            : isNegative
                                            ? -300
                                            : 300,
                                }}
                                animate={{ x: 0 }}
                                transition='none'
                            >
                                <Title>
                                    <img
                                        onClick={() => onClick('prev')}
                                        src={prev}
                                        style={{
                                            width: 30,
                                            cursor: 'pointer',
                                            opacity: `${
                                                currentPage === 1 ? 0.5 : null
                                            }`,
                                        }}
                                        alt='Previous'
                                    />

                                    <img
                                        onClick={() => onClick('next')}
                                        src={next}
                                        style={{
                                            width: 30,
                                            cursor: 'pointer',
                                            opacity: `${
                                                currentPage === pageNum
                                                    ? 0.5
                                                    : null
                                            }`,
                                        }}
                                        alt='Next'
                                    />
                                </Title>
                                <Document
                                    options={{
                                        cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                                        cMapPacked: true,
                                    }}
                                    file={url}
                                    loading={
                                        <div
                                            style={{
                                                width,
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {null}
                                        </div>
                                    }
                                >
                                    <Page
                                        onRenderSuccess={() => {
                                            console.log('onRenderSuccess!');
                                            setLoading(false);
                                        }}
                                        onGetAnnotationsSuccess={() => {
                                            console.log(
                                                'onGetAnnotationsSuccess!'
                                            );
                                        }}
                                        onGetTextSuccess={() => {
                                            console.log('onGetTextSuccess!');
                                        }}
                                        width={width}
                                        pageNumber={currentPage}
                                    />
                                </Document>
                            </motion.div>
                        ) : null
                    )}
                </AnimatePresence>
            ) : null}
        </Container>
    );
};

export default My;
