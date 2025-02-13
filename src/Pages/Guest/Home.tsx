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
    "/Screenshot 2025-02-08 at 10.39.53.png",
    "/Screenshot 2025-02-08 at 10.39.59.png",
    "/Screenshot 2025-02-08 at 10.40.05.png",
    "/Screenshot 2025-02-08 at 10.40.11.png",
  ];
  
  return (
    <div className="relative w-full h-[300vh] p-4"> {/* Increased height */}
      {/* Text at the Top Left */}
      <div className="absolute top-[5%] left-[15%]">
        <h1 className="text-[95px] font-bold text-gray-800 dark:text-white">
          {process.env.VITE_APP_NAME}
        </h1>
        <h1 className="text-[45px] text-gray-800 dark:text-white">
          Discover top talent <br /> effortless coding challenges
        </h1>
      </div>
  
      {/* Image with Fine Positioning */}
      <img 
        src="/vite.svg" 
        alt="Description" 
        className="w-48 h-auto rounded-lg shadow-lg absolute bottom-[85%] right-[20%] transform -translate-y-1/2" 
      />
  
      {/* Carousel at the Bottom */}
      <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-3/4">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index} className="p-2 flex justify-center">
              <img 
                src={src} 
                alt={`Slide ${index + 1}`} 
                className="w-auto h-[63px] object-contain rounded-lg shadow-md" 
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
  

export default Home;
