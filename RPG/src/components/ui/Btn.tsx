type BtnProps = {
    onClick: () => void;
    text: string
    className?: string
    disabled?: boolean
} & React.HTMLAttributes<HTMLDivElement>;

const Btn = ({ onClick, text, className, ...rest }: BtnProps) => {

    return (
        <div onClick={onClick} className={className ? `btn ${className}`: 'btn'} {...rest}>{text}</div>
    );
}

export default Btn;