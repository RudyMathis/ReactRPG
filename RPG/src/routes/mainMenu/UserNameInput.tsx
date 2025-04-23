import { useAtom } from 'jotai';
import { UserAtom } from '../../atom/persistant/UserAtom';
import styles from '../Route.module.css';

const UserNameInput = () => {
    const [userNameAtomValue, setUserNameAtomValue] = useAtom(UserAtom);

    return (
        <div className={styles.userNameInputContainer}>
            <input
                type="text"
                placeholder="Enter your name"
                className={styles.userNameInput}
                value={userNameAtomValue}
                onChange={(e) => setUserNameAtomValue(e.target.value)}
            />
        </div>
    );
};

export default UserNameInput;