import { createContext, useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const value = useMemo(() => {
    return {
      products,
    };
  }, [products]);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }

  const { products } = context;

  return { products };
}

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
