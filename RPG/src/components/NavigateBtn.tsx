import { useNavigate } from 'react-router';

type NavigateBtnProps = {
    locationValue: string;
    location: string
}
const NavigateBtn = ({ locationValue, location }: NavigateBtnProps) => {
    const navigate = useNavigate();
    const handleMainMenu = () => {
        navigate(`${locationValue}`);
    };

    return (
        <button  onClick={handleMainMenu}>{location}</button>
    );
}

export default NavigateBtn;
