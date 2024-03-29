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
import Container from '../../atom/Container';
import { Title } from '../Curation/Curation.styled';
import { useQuery } from 'react-query';
import { fetchPdf } from '../../../api';

const My = () => {
    const token = useSelector((state) => state.auth.token);
    const [url, setUrl] = useState('');
    const canvasRef = useRef();
    const [loading, setLoading] = useState(false);
    const [pdfRef, setPdfRef] = useState();
    const [isNegative, setIsNegative] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumArray, setPageNumArray] = useState([]);
    const lang = useSelector((state) => state.language.isKorean);

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

    const _ = useQuery(['pdf', token], fetchPdf, {
        refetchOnWindowFocus: false,
        onSuccess: (response) => {
            setLoading(true);
            setUrl(response.data.data);
        },
        onError: (err) => {
            if (err.response.status === 401) {
                setLoading(false);
                return;
            }
            alert(
                lang
                    ? 'An error has occurred. Please contact the developer!'
                    : '오류가 발생했습니다. 담당자에게 문의해주세요!'
            );
        },
    });

    useEffect(() => {
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
        setPageNum(pdfRef?._pdfInfo.numPages);
        renderPage(currentPage, pdfRef);
    }, [pdfRef, renderPage, currentPage]);

    useEffect(() => {
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
                                    <div style={{ width: 100 }}></div>

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
                                            setLoading(false);
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
