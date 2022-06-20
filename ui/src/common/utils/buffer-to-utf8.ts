export const convertBufferToUTF8 = (buff: ArrayBuffer) => {
    const uint8 = new Uint8Array(buff);
    const decoder = new TextDecoder('utf8');
    return decoder.decode(uint8);
};