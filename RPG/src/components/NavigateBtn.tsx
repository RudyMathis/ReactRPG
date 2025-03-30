import { useNavigate } from 'react-router';

type NavigateBtnProps = {
    locationValue: string;
    location: string;
}

const NavigateBtn = ({ locationValue, location}: NavigateBtnProps) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(locationValue);
    };

    return (
        <button onClick={handleNavigation} className="btn">{location}</button>
    );
}

export default NavigateBtn;