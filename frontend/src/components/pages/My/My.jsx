import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
// import * as pdfjs from '../../../../node_modules/pdfjs-dist/build/pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import { Page, Document } from 'react-pdf';

import { useDispatch, useSelector } from 'react-redux';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';
import Container from '../../atom/Container';

const My = () => {
    const token = useSelector((state) => state.auth.token);
    const [url, setUrl] = useState('');
    const canvasRef = useRef();
    const [loading, setLoading] = useState(false);
    const [textLoading, setTextLoading] = useState(false);

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
    const setNextPage = (event, info) => {
        if (info.offset.x < -200) {
            if (currentPage === pageNum) {
                return;
            }
            setIsNegative(true);
            setCurrentPage((prev) => prev + 1);

            console.log('next!');
        } else if (info.offset.x > 200) {
            if (currentPage === 1) {
                return;
            }
            setIsNegative(false);
            setCurrentPage((prev) => prev - 1);
            console.log('prev!');
        } else {
            console.log('no changes!');
        }
    };

    useEffect(() => {
        if (!url) {
            return;
        }

        const loadingTask = pdfjs.getDocument({
            url,
        });
        setLoading(true);

        loadingTask.promise.then(
            (loadedPdf) => {
                setLoading(false);
                setPdfRef(loadedPdf);
            },
            function (reason) {
                console.error(reason);
            }
        );
    }, [url, pdfjs]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('/api/v1/result/examination/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUrl(response.data.data);
                setLoading(false);
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
                setLoading(false);
            });
    }, [token]);

    useEffect(() => {
        setPageNum(pdfRef?._pdfInfo.numPages);
        // renderPage(currentPage, pdfRef);

        console.log('pdfRef', pdfRef);
    }, [pdfRef, renderPage, currentPage]);

    useEffect(() => {
        let copy = [];
        for (let i = 1; i <= pageNum; i++) {
            copy.push(i);
        }
        setPageNumArray([...copy]);
    }, [pageNum]);

    return (
        <Container>
            {loading && !textLoading ? (
                <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />
            ) : url ? (
                <AnimatePresence>
                    {pageNumArray.map((idx, index) =>
                        idx === currentPage ? (
                            <motion.div
                                drag='x'
                                onDragEnd={setNextPage}
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
                                <Document
                                    options={{
                                        cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                                        cMapPacked: true,
                                    }}
                                    file={url}
                                    onLoadProgress={() => console.log('?')}
                                    onLoadSuccess={() => console.log('!')}
                                    loading={
                                        <div
                                            style={{
                                                width,
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <CircularProgress
                                                style={{ margin: '0 auto' }}
                                            />
                                        </div>
                                    }
                                >
                                    {textLoading ? (
                                        <CircularProgress
                                            sx={{
                                                display: 'block',
                                                margin: '0 auto',
                                            }}
                                        />
                                    ) : null}
                                    <Page
                                        onGetAnnotationsSuccess={() => {
                                            setLoading(false);
                                            setTextLoading(true);
                                        }}
                                        onGetTextSuccess={() =>
                                            setTextLoading(false)
                                        }
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
