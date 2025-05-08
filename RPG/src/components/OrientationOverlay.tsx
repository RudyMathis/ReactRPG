import { useEffect, useState } from 'react';

const isMobileDevice = () => {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
};

const OrientationOverlay = () => {
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            const isLandscape = window.innerWidth > window.innerHeight;
            const isMobile = isMobileDevice();
            setShowOverlay(isMobile && !isLandscape);
        };

        checkOrientation(); // run on mount

        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);

        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

    if (!showOverlay) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'black',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontSize: '1.5em',
            zIndex: 10,
            padding: '1em',
        }}>
            Please rotate your device to landscape.<br />
            (If rotation is locked, unlock it to play.)
        </div>
    );
};

export default OrientationOverlay;