const { faker } = require("@faker-js/faker");

const products = [];

const productsLength = 4;

for (let i = 0; i < productsLength; i += 1) {
  products.push({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({
      min: 100,
      max: 999,
      dec: 2,
      symbol: "$",
    }),
    stock_quantity: faker.number.int({ min: 0, max: 1000 }),
  });
}

module.exports = products;
