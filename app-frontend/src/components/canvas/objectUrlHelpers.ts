const fileToUrl = (file: File | Blob): string => {
    const url = window.URL || (window as any).webkitURL;
    try {
        return url.createObjectURL(file);
    } catch (e) {
        return '';
    }
};

const revokeUrl = (objectUrl: string): void => {
    try {
        window.URL.revokeObjectURL(objectUrl);
    } catch (e) {

    }
};

export { fileToUrl, revokeUrl };