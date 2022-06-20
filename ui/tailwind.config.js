module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            strokeWidth: {
                logo: 20,
            },
        },
    },
    variants: {
        extend: {
            color: ['group-hover'],
        },
    },
    plugins: [],
    important: true,
};
