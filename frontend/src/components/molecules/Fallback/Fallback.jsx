import { CircularProgress } from '@mui/material';

const Fallback = () => {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
        </div>
    );
};

export default Fallback;
