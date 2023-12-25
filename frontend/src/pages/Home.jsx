function Home() {
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
          />
          <img
            className="SearchIcon"
            src="/icons/search-icon.svg"
            alt="search icon"
          />
        </div>
        <div className="DynamicCarouselContainer">
          <div className="DynamicCarouselItem">
            <img
              className="DynamicCarouselImage"
              src="https://via.placeholder.com/320x180"
              alt="Dynamic carousel item"
            />
          </div>
        </div>
        <section className="CategoriesWrapper">
          <div className="CategoriesSectionTitleContainer">
            <p className="CategoriesSectionTitle">Categories</p>
            <p className="LinkToCategoriesPage">See all</p>
          </div>
          <div className="CategoriesContainer">
            <button className="CategoryButton IsActive" type="button">
              All
            </button>
            <button className="CategoryButton" type="button">
              Smartphones
            </button>
          </div>
        </section>
        <section className="ProductsWrapper">
          <div className="ProductCard">
            <div className="ProductImageContainer">
              <div className="ProductImageFrame">
                <img
                  className="ProductImage"
                  src="https://via.placeholder.com/149x149"
                  alt="Product"
                />
              </div>
              <div className="FavoriteLogoContainer">
                <div className="HeartIconContainer">
                  <img
                    className="HeartIcon"
                    src="/icons/heart-icon.svg"
                    alt="heart icon"
                  />
                </div>
              </div>
            </div>
            <div className="ProductNameContainer">
              <p className="ProductName">
                Apple iPhone 15 Pro 128GB Natural Titanium
              </p>
            </div>
            <div className="ProductPriceContainer">
              <p className="ProductPrice">£699.00</p>
            </div>
          </div>
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
