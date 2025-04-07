import { DamageEffectAtom } from "../atom/effects/DamageEffectAtom";
import { storeAtom } from "../atom/storeAtom";

export const HandleDamageEffect = (damage: number, type: string, target: string, entityId: number) => {
    storeAtom.set(DamageEffectAtom, (prev) => ({ 
        ...prev, 
        damage: damage, 
        isDisplay: true, 
        damageType: type,
        target: target,
        entityId: entityId
    }));

    setTimeout(() => {
        storeAtom.set(DamageEffectAtom, { damage: 0, isDisplay: false, damageType: "", target: "", entityId: 0 });
    }, 1000);
}
