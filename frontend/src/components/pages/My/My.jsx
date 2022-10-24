import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
// import * as pdfjs from '../../../../node_modules/pdfjs-dist/build/pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import { Page, Document } from 'react-pdf';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';
import Container from '../../atom/Container';

const My = () => {
    const token = useSelector((state) => state.auth.token);
    const [url, setUrl] = useState('');
    const canvasRef = useRef();

    const [pdfRef, setPdfRef] = useState();

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
                });
        },
        [pdfRef]
    );
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
        axios
            .get('/api/v1/result/examination/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
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
            });
    }, [token]);

    useEffect(() => {
        renderPage(1, pdfRef);
    }, [pdfRef, renderPage]);

    return (
        <Container>
            {url ? (
                <Document
                    options={{
                        cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                        cMapPacked: true,
                    }}
                    file={url}
                    loading={
                        <div
                            style={{
                                width: window.innerWidth,
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <CircularProgress style={{ margin: '0 auto' }} />
                        </div>
                    }
                >
                    <Page width={width} pageNumber={1} />
                </Document>
            ) : null}
        </Container>
    );
};

export default My;
