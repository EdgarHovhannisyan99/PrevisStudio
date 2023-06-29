export const stringToRGB = (rgbString) => {
    const values = rgbString.substring(rgbString.indexOf('(') + 1, rgbString.lastIndexOf(')')).split(',');
    return values.map(value => +(parseInt(value.trim()) / 255).toFixed(3));
};
