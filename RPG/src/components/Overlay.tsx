import './Overlay.css';
const Overlay = () => {

    return (
        <>
            <div className="blur blur-overlay-top"></div>
            <div className="blur blur-overlay-top-bottom"></div>
            <div className="blur blur-overlay-bottom-top"></div>
            <div className="blur blur-overlay-bottom"></div>
            <div className="blur blur-overlay-left"></div>
            <div className="blur blur-overlay-right"></div>
            <div className="glow-center"></div>
        </>
    );
}

export default Overlay;