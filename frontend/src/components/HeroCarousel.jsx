import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeScreen: {
    breakpoint: { max: 4000, min: 2561 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 2560, min: 1601 },
    items: 1,
  },
  laptop: {
    breakpoint: { max: 1600, min: 1025 },
    items: 1,
  },
  landscapeTablet: {
    breakpoint: { max: 1024, min: 835 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 834, min: 769 },
    items: 1,
  },
  landscapeMobile: {
    breakpoint: { max: 768, min: 481 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 480, min: 320 },
    items: 2,
  },
};

function HeroCarousel({ productsForCarousel }) {
  // console.info("productsForCarousel: ", productsForCarousel);
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay
      containerClass="DynamicCarouselContainer"
      itemClass="DynamicCarouselItem"
      removeArrowOnDeviceType={["mobile", "landscapeMobile", "tablet"]}
      responsive={responsive}
      sliderClass="DynamicCarouselSlider"
      slidesToSlide={1}
      swipeable
    >
      {productsForCarousel.map((product) => {
        return (
          <div key={product.id}>
            <img
              className="DynamicCarouselImage"
              src={product.image_url}
              alt={product.name}
            />
          </div>
        );
      })}
    </Carousel>
  );
}

HeroCarousel.propTypes = {
  productsForCarousel: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HeroCarousel;
