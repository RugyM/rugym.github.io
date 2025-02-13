import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Show only one image at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, // Set to 3 seconds (3000ms)
    };
    const images = [
        "/public/Screenshot 2025-02-08 at 10.39.53.png",
        "/public/Screenshot 2025-02-08 at 10.39.59.png",
        "/public/Screenshot 2025-02-08 at 10.40.05.png",
        "/public/Screenshot 2025-02-08 at 10.40.11.png",
    ];
    return (_jsxs("div", { className: "relative w-full h-[300vh] p-4", children: [" ", _jsxs("div", { className: "absolute top-[05%] left-[15%]", children: [_jsx("h1", { className: "text-[95px] font-bold text-gray-800 dark:text-white", children: process.env.VITE_APP_NAME }), _jsxs("h1", { className: "text-[45px] text-gray-800 dark:text-white", children: ["Discover top talent ", _jsx("br", {}), " effortless coding challenges"] })] }), _jsx("img", { src: "/public/vite.svg", alt: "Description", className: "w-48 h-auto rounded-lg shadow-lg absolute bottom-[85%] right-[20%] transform -translate-y-1/2" }), _jsx("div", { className: "absolute top-[20%] left-1/2 transform -translate-x-1/2 w-3/4", children: _jsx(Slider, { ...settings, children: images.map((src, index) => (_jsx("div", { className: "p-2 flex justify-center", children: _jsx("img", { src: src, alt: `Slide ${index + 1}`, className: "w-auto h-63 object-contain rounded-lg shadow-md" }) }, index))) }) })] }));
}
export default Home;
