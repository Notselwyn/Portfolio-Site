export function redirect(url: string) {
    window.location.href = url;
}

export function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}