import { useNavigate } from 'react-router';
// import { useAtom } from 'jotai';
// import characterAtom from '../atom/CharacterAtom';

type NavigateBtnProps = {
    locationValue: string;
    location: string;
}

const NavigateBtn = ({ locationValue, location }: NavigateBtnProps) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(locationValue);
    };

    return (
        <button onClick={handleNavigation}>{location}</button>
    );
}

export default NavigateBtn;
