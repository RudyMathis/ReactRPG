import './Btn.css'
type BtnProps = {
    onClick: () => void;
    text: string
}

const Btn = ({ onClick, text }: BtnProps) => {

    return (
        <button onClick={onClick} className='btn begin'>{text}</button>
    );
}

export default Btn;