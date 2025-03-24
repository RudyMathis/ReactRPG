import { useNavigate } from 'react-router';

type NavigateBtnProps = {
    locationValue: string;
    location: string;
    className?: string;
}

const NavigateBtn = ({ locationValue, location, className }: NavigateBtnProps) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(locationValue);
    };

    return (
        <button onClick={handleNavigation} className={`btn ${className}`}>{location}</button>
    );
}

export default NavigateBtn;