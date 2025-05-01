import { useAtom } from "jotai";
import { actionsTextAtom } from "../../atom/ActionsTextAtom";
import styles from './UI.module.css';
import { useEffect, useState, useRef } from "react";

const ActionTextDisplay = () => {
    const [actions] = useAtom(actionsTextAtom);
    const [show, setShow] = useState(false);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (actions) {
            setShow(true);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                setShow(false);
            }, 4000);
        }
    }, [actions]);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    if (!actions || !show) return null;

    const updatedEntityName = actions.entity.name.replace('_', ' ');
    const updatedTargetName = actions.target.name.replace('_', ' ');

    let message = '';

    if (actions.isAttack) {
        if (actions.isAoe) {
            message = actions.entity.type === 'player'
                ? `${updatedEntityName} used ${actions.action} on the monsters for ${actions.value} damage.`
                : `${updatedEntityName} used ${actions.action} on the party for ${actions.value} damage.`;
        } else {
            message = `${updatedEntityName} used ${actions.action} on ${updatedTargetName} for ${actions.value} damage.`;
        }
    } else if (actions.isDefense) {
        if (actions.isBuff) {
            message = actions.isAoe
                ? `${updatedEntityName} used ${actions.action} on the party.`
                : `${updatedEntityName} used ${actions.action} on ${updatedTargetName}.`;
        } else {
            message = actions.isAoe
                ? `${updatedEntityName} used ${actions.action} on the party for ${actions.value} health.`
                : `${updatedEntityName} used ${actions.action} on ${updatedTargetName} for ${actions.value} health.`;
        }
    }

    return (
        <div className={styles.actionTextContainer}>
            <p className={styles.actionText}>{message}</p>
        </div>
    );
};

export default ActionTextDisplay;
