// LoadingScreen.tsx
import { useEffect, useState } from 'react';
// import './LoadingScreen.css';

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
    const [loadingText, setLoadingText] = useState("LOADING");

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText((prev) =>
                prev.length < 10 ? prev + '.' : 'LOADING'
            );
        }, 500);

        // Simulate asset preloading (replace with real preloading logic)
        const preloadAssets = () => {
            const imagePaths = [
                '/assets/backgrounds/Cave.jpg',
                '/assets/backgrounds/City.jpg',
                '/assets/backgrounds/Forest.jpg',
                '/assets/backgrounds/Desert.jpg',
                '/assets/backgrounds/Field.jpg',
                '/assets/backgrounds/Snow.jpg',
            ];
        imagePaths.forEach((src) => {
            const img = new Image();
            img.src = src;
        });

        // Wait 2-3 seconds or until all images are loaded
        setTimeout(() => {
                clearInterval(interval);
                onFinish(); // move to main menu
            }, 2500);
        };

        preloadAssets();
        return () => clearInterval(interval);
    }, [onFinish]);

    return (
        <div className="loading-screen">
            <h1 className="loading-text">{loadingText}</h1>
        </div>
    );
}