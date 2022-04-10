export function redirect(url: string) {
    window.open(url, '_blank').focus();
}

export function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}