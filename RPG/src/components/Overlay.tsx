import { useAtom } from 'jotai';
import { backgroundAtom } from '../atom/BackgroundAtom';
import './Overlay.css';
const Overlay = () => {
    const [background] = useAtom(backgroundAtom);

    return (
        <>
            <div className="vignette"></div>
            <div className="blur blur-overlay-top"></div>
            <div className="blur blur-overlay-top-bottom"></div>
            <div className="blur blur-overlay-bottom-top"></div>
            <div className="blur blur-overlay-bottom"></div>
            <div className="blur blur-overlay-left"></div>
            <div className="blur blur-overlay-right"></div>
            <div className="lighting" data-light={background}></div>
        </>
    );
}

export default Overlay;