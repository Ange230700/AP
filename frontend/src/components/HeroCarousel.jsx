import PropTypes from "prop-types";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

function HeroCarousel({ productsForCarousel }) {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {productsForCarousel.map((product) => (
          <div className="embla__slide" key={product.id}>
            <img src={product.image_file} alt={product.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

HeroCarousel.propTypes = {
  productsForCarousel: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image_file: PropTypes.string,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HeroCarousel;
