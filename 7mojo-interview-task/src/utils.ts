import {EnumEntry} from "./types/enums/game-enums";

const splitCamelCase = (str: string): string => {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
};

const getEnumValues = (enumObj: any) => {
    return Object.keys(enumObj).filter(key => isNaN(Number(key)));
};

const getEnumEntries = <E>(enumObj: E): EnumEntry<keyof E, E[keyof E]>[] => {
    return (Object.keys(enumObj) as (keyof E)[])
        .filter(key => isNaN(Number(key))) // Filter out numeric keys
        .map(key => ({ key, value: enumObj[key] }));
}

const mapEnumValuesAndKeys = (enumObj: any) => {
    return Object.keys(enumObj)
        .filter(key => isNaN(Number(key)))
        .map(key => ({
            key,
            value: enumObj[key],
        }));
}

export {
    splitCamelCase,
    getEnumValues,
    getEnumEntries
}