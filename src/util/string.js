export function makeCommaSeparatedString(arr, useOxfordComma) {
    const listStart = arr.slice(0, -1).join(", ");
    const listEnd = arr.slice(-1);
    const conjunction = arr.length <= 1 ? "" :
        useOxfordComma && arr.length > 2 ? ", and " : " and ";

    return [listStart, listEnd].join(conjunction);
}

var NUMBER_SUFFIX = ["", "k", "M", "G", "T", "P", "E"];
var SIZE_SUFFIX = ["b", "KB", "MB", "GB", "TB", "PB", "EB"];

export function abbreviateNumber(number) {
    var tier = Math.log10(number) / 3 | 0;
    if (tier == 0) return number;
    var suffix = NUMBER_SUFFIX[tier];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;
    return scaled.toFixed(1) + suffix;
}

export function abbreviateSize(number) {
    var tier = Math.log10(number) / 3 | 0;
    if (tier == 0) return number + "b";
    var suffix = SIZE_SUFFIX[tier];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;
    return scaled.toFixed(1) + suffix;
}

export function isRegEx(string) {
    return Object.prototype.toString.call(string) === '[object RegExp]';
}