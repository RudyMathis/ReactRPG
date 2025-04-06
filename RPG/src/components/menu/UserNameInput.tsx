import { useAtom } from 'jotai';
import { UserAtom } from '../../atom/persistant/UserAtom';

const UserNameInput = () => {
    const [userNameAtomValue, setUserNameAtomValue] = useAtom(UserAtom);

    return (
        <div className="user-name-input-container">
            <input
                type="text"
                placeholder="Enter your name"
                className="user-name-input"
                value={userNameAtomValue}
                onChange={(e) => setUserNameAtomValue(e.target.value)}
            />
        </div>
    );
};

export default UserNameInput;
