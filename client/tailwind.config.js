export default {
    content: ["./index.html", "./src/**/*.{js,jsx,html}"],

    theme: {
        extend: {
            colors: {
                main: {
                    white: "#FFFFFF",
                    black: "#1A1A1A",
                    600: "#57418B",
                    500: "#7349D6",
                    400: "#966AFF",
                    300: "#AD93FF",
                    200: "#C8B8FF",
                    100: "#E4DBFF",
                    50: "#F4F3F9",
                },
                gray: {
                    600: "#373542",
                    500: "#4D4A57",
                    400: "#8D87A2",
                    300: "#C8C3D6",
                    200: "#DDD9E7",
                    100: "#E8E6F0",
                    50: "#f4f3f9",
                },
            },
            backgroundImage: {
                "bookmark-overlay":
                    "linear-gradient(180deg, " +
                    "rgba(26,26,26,0) 48.5577%, " +
                    "rgba(26,26,26,0.249203) 62.5%, " +
                    "rgba(26,26,26,0.436105) 74.5192%, " +
                    "#1A1A1A 100%)",
            },
            fontFamily: {
                sans: ["Pretendard", "sans-serif"], // 기본 폰트인 sans 계열을 Pretendard 로 오버라이드
                inter: ["Inter", "sans-serif"],
            },
            boxShadow: {
                card: "0px 4px 15px 0 rgba(0,0,0,0.25)",
            },
        },
    },

    plugins: [],
};
