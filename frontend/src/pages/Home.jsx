import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";
import HeroCarousel from "../components/HeroCarousel";

function Home() {
  const { products } = useProducts();
  // const [activeButton, setActiveButton] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState({});
  // const categoriesButtons = [
  //   "All",
  //   "Smartphones",
  //   "Tablets",
  //   "Laptops",
  //   "TVs",
  //   "Smartwatches",
  // ];
  const productsForCarousel = products.slice(0, 5);

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

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
                        onClick={() => handleFavoriteClick(product.id)}
                        type="button"
                      >
                        <img
                          className="HeartIcon"
                          src={
                            favorites[product.id]
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
