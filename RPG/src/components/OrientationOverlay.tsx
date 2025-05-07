import{ useEffect, useState } from 'react';

const OrientationOverlay = () => {
    const [isLandscape, setIsLandscape] = useState(window.matchMedia("(orientation: landscape)").matches);

    useEffect(() => {
        const checkOrientation = () => {
            setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
        };

        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);

        // Cleanup listeners on unmount
        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

    if (isLandscape) return null;

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
