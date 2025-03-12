import { useNavigate } from 'react-router';
// import { useAtom } from 'jotai';
// import characterAtom from '../atom/CharacterAtom';

type NavigateBtnProps = {
    locationValue: string;
    location: string;
}

const NavigateBtn = ({ locationValue, location }: NavigateBtnProps) => {
    const navigate = useNavigate();
    // const [characters] = useAtom(characterAtom);

    const handleNavigation = () => {
        // const selectedCharacters = Object.values(characters).filter(char => char.selected);
        // console.log(selectedCharacters);
        navigate(locationValue);
    };

    return (
        <button onClick={handleNavigation}>{location}</button>
    );
}

export default NavigateBtn;
