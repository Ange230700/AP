import { useState } from "react";
import { NavLink } from "react-router-dom";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useProducts } from "../contexts/ProductContext";
import HeroCarousel from "../components/HeroCarousel";

// const responsiveCategories = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1601 },
//   },
//   laptop: {
//     breakpoint: { max: 1600, min: 1025 },
//   },
//   landscapeTablet: {
//     breakpoint: { max: 1024, min: 835 },
//   },
//   tablet: {
//     breakpoint: { max: 834, min: 769 },
//   },
//   landscapeMobile: {
//     breakpoint: { max: 768, min: 481 },
//   },
//   mobile: {
//     breakpoint: { max: 480, min: 320 },
//   },
// };

function Home() {
  const { products } = useProducts();
  // console.info("products: ", products);
  // const [activeButton, setActiveButton] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isFavorite, setIsFavorite] = useState(null);
  // const categoriesButtons = [
  //   "All",
  //   "Smartphones",
  //   "Tablets",
  //   "Laptops",
  //   "TVs",
  //   "Smartwatches",
  // ];
  const productsForCarousel = products.slice(0, 5);
  // console.info("productsForCarousel: ", productsForCarousel);

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  function handleFavoriteClick() {
    setIsFavorite(!isFavorite);
  }

  return (
    <section className="Home">
      <header className="Header">
        <div className="IconContainer">
          <img className="Icon" src="/icons/menu-icon.svg" alt="Menu icon" />
        </div>
        <div className="IconContainer">
          <img className="Logo" src="/images/logo_mobile.png" alt="logo" />
        </div>
        <div className="IconContainer">
          <img
            className="Icon"
            src="/icons/shopping-cart-icon.svg"
            alt="shopping cart icon"
          />
        </div>
      </header>
      <main className="Main">
        <div className="SearchInputContainer">
          <input
            className="SearchInput"
            placeholder="Find a product..."
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <img
            className="SearchIcon"
            src="/icons/search-icon.svg"
            alt="search icon"
          />
        </div>
        <HeroCarousel productsForCarousel={productsForCarousel} />
        <section className="CategoriesWrapper">
          <div className="CategoriesSectionTitleContainer">
            <p className="CategoriesSectionTitle">Categories</p>
            <NavLink className="LinkToCategoriesPage" to="/">
              See all
            </NavLink>
          </div>
          {/* <Carousel
            additionalTransfrom={0}
            arrows
            autoPlay={false}
            centerMode={false}
            containerClass="CategoriesContainer"
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass="CategoryItem"
            removeArrowOnDeviceType={["mobile", "landscapeMobile", "tablet"]}
            responsive={responsiveCategories}
            sliderClass="CategorySliderContainer"
            swipeable
          >
            {categoriesButtons.map((button, index) => (
              <button
                key={button}
                className={`CategoryButton ${
                  activeButton === index ? "IsActive" : ""
                }`}
                type="button"
                onClick={() => setActiveButton(index)}
              >
                {button}
              </button>
            ))}
          </Carousel> */}
        </section>
        <section className="ProductsWrapper">
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((product) => {
              return (
                <div key={product.id} className="ProductCard">
                  <div className="ProductImageContainer">
                    <div className="ProductImageFrame">
                      <img
                        className="ProductImage"
                        src={product.image_url}
                        alt={product.name}
                      />
                    </div>
                    <div className="FavoriteLogoContainer">
                      <button
                        className="HeartIconContainer"
                        onClick={handleFavoriteClick}
                        type="button"
                      >
                        <img
                          className="HeartIcon"
                          src={
                            isFavorite
                              ? "/icons/heart-solid.svg"
                              : "/icons/heart-icon.svg"
                          }
                          alt="heart icon"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="ProductNameContainer">
                    <p className="ProductName">{product.name}</p>
                  </div>
                  <div className="ProductPriceContainer">
                    <p className="ProductPrice">{product.price}</p>
                  </div>
                </div>
              );
            })}
        </section>
      </main>
      <footer className="Footer">
        <div className="IconContainer">
          <img className="Icon" src="/icons/home-icon.svg" alt="home icon" />
        </div>
        <div className="IconContainer">
          <img
            className="Icon"
            src="/icons/profile-icon.svg"
            alt="profile icon"
          />
        </div>
      </footer>
    </section>
  );
}

export default Home;
