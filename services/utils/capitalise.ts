export default function capitalise(str: string | undefined): string | undefined {
    const newStr = str?.toLowerCase();
    if (newStr === undefined) {
        return undefined; // Return undefined if str is undefined
    }
    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
}