import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';

const isUpdateAvailable = JSON.parse(window.sessionStorage.getItem('updated'));

export default function SimpleSnackbar() {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (isUpdateAvailable) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleUpdate = () => {
        sessionStorage.setItem('updated', false);
        self.opener = self;
        window.close();
    };

    const action = (
        <React.Fragment>
            {/* <Button
                color='secondary'
                size='small'
                onClick={handleUpdate}
            ></Button> */}
            <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={handleClose}
            >
                <span className='material-symbols-outlined'>close</span>
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message='버전이 업데이트 되었습니다. 탭을 닫은 뒤 다시 접속해주세요!'
                action={action}
            />
        </div>
    );
}
