export interface ITextVariants {
    one: string; // 1 сущность
    some: string; // 2 сущности
    many: string; //  100 сущностей
}

export const pluralize = (amount: number, variants: ITextVariants) => {
    let n = Math.abs(amount);

    n %= 100;

    if (n >= 5 && n <= 20) {
        return variants.many;
    }

    n %= 10;

    if (n === 1) {
        return variants.one;
    }

    if (n >= 2 && n <= 4) {
        return variants.some;
    }

    return variants.many;
};

const privateCommonVariants = {
    friend: {
        one: 'друг',
        some: 'друга',
        many: 'друзей',
    },
};

export const commonVariants: Record<keyof typeof privateCommonVariants, ITextVariants> = privateCommonVariants;
