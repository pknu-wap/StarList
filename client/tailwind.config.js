export default {
    content: ["./index.html", "./src/**/*.{js,jsx,html}"],

    theme: {
        colors: {
            Main: {
                Black: "#1A1A1A",
                600: "#57418B",
                500: "#7349D6",
                400: "#966AFF",
                300: "AD93FF",
                200: "C8B8FF",
                100: "E4DBFF",
            },
            Gray: {
                600: "373542",
                500: "4D4A57",
                400: "8D87A2",
                300: "C8C3D6",
                200: "DDD9E7",
                100: "E8E6F0",
            },

        },
        extend: {
            fontFamily: {
                pretendard: ["Pretendard", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
        },
    },

    plugins: [],
};
