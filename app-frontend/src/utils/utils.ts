export const fileToByteArray = (event: any, setValueBuffer: any) => {
    const selectedFile = event;
    if (selectedFile) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const arrayBuffer = fileReader.result as ArrayBuffer;
            const byteArray = new Uint8Array(arrayBuffer);
            console.log('Byte Array:', byteArray);
            setValueBuffer(Object.values(byteArray))
        };
        fileReader.readAsArrayBuffer(selectedFile);
    }
};

export const convertBlobToByteArray = (blob: any, callback: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        callback(byteArray);
    };
    fileReader.readAsArrayBuffer(blob);
};

export const transformString = (str: string, visibleCount: number) => {
    const visibleChars = str.substring(0, visibleCount);
    const hiddenChars = '...';
    return `${visibleChars}${hiddenChars}${visibleChars}`;
};

export const formatShortAddress = (inputString: string, maxLength = 20) => {
    if (inputString.length <= maxLength) return inputString;
    const prefixLength = Math.floor((maxLength - 3) / 2);
    const suffixLength = maxLength - prefixLength - 3;
    const prefix = inputString.substring(0, prefixLength);
    const suffix = inputString.substring(inputString.length - suffixLength);

    return `${prefix}...${suffix}`;
};