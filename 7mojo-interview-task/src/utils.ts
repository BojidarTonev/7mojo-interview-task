const splitCamelCase = (str: string): string => {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
};

const getEnumValues = (enumObj: any) => {
    return Object.keys(enumObj).filter(key => isNaN(Number(key)));
};

export {
    splitCamelCase,
    getEnumValues
}