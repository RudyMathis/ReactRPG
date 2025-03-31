import './Btn.css'
type BtnProps = {
    onClick: () => void;
    text: string
    className?: string
}

const Btn = ({ onClick, text, className }: BtnProps) => {

    return (
        <button onClick={onClick} className={className ? `btn ${className}`: 'btn'}>{text}</button>
    );
}

export default Btn;