import { useNavigate } from 'react-router';

type NavigateBtnProps = {
    locationValue: string;
    location: string;
}

const NavigateBtn = ({ locationValue, location}: NavigateBtnProps) => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        localStorage.removeItem('tutorialState');
        navigate(locationValue);
    };

    return (
        <div onClick={handleNavigation} className="btn">{location}</div>
    );
}

export default NavigateBtn;