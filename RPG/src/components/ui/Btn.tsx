type BtnProps = {
    onClick: () => void;
    text: string
    className?: string
    disabled?: boolean
}

const Btn = ({ onClick, text, className }: BtnProps) => {

    return (
        <div onClick={onClick} className={className ? `btn ${className}`: 'btn'}>{text}</div>
    );
}

export default Btn;