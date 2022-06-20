/**
 *
 * @param name
 */
export const getInitials = (fullName: string) => {
    const fullNameWords = fullName?.split(' ') || [];
    return fullNameWords
        .map((item, idx) => idx < 2 && item[0])
        .filter(Boolean)
        .join('');
};