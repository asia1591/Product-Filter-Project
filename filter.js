const data = [
  {
    id: 1,
    name: "GT3 Max Watch",
    img: "https://m.media-amazon.com/images/I/71V-taqeT2L.__AC_SX300_SY300_QL70_ML2_.jpg",
    price: 74,
    cat: "Casual",
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/61HntJQfaBS.__AC_SX300_SY300_QL70_ML2_.jpg",
    price: 74,
    cat: "Classic",
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: "https://m.media-amazon.com/images/I/61+SKcJFD-L._AC_SY300_SX300_.jpg",
    price: 40,
    cat: "Sport",
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/71Vv2jE8OkL._AC_SY450_.jpg",
    price: 200,
    cat: "Luxury",
  },
  {
    id: 4,
    name: "Samsung Galaxy Watch 5 Pro",
    img: "https://m.media-amazon.com/images/I/71T6cspSuaL.__AC_SX300_SY300_QL70_ML2_.jpg",
    price: 16,
    cat: "Sport",
  },
  {
    id: 5,
    name: "Garmin Venu Smartwatch ",
    img: "https://m.media-amazon.com/images/I/612ZV6YKkHL.__AC_SX300_SY300_QL70_ML2_.jpg",
    price: 74,
    cat: "Casual",
  },
];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts
    .map(
      (product) =>
        `
       <div class="product">
          <img
          src=${product.img}
          alt=""
          />
          <span class="name">${product.name}</span>
          <span class="priceText">$${product.price}</span>
        </div>
    `
    )
    .join("");
};

displayProducts(data);

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();

  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

const setCategories = () => {
  const allCats = data.map((item) => item.cat);
  const categories = [
    "All",
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];

  categoriesContainer.innerHTML = categories
    .map(
      (cat) =>
        `
      <span class="cat">${cat}</span>
    `
    )
    .join("");

  categoriesContainer.addEventListener("click", (e) => {
    const selectedCat = e.target.textContent;

    selectedCat === "All"
      ? displayProducts(data)
      : displayProducts(data.filter((item) => item.cat === selectedCat));
  });
};

const setPrices = () => {
  const priceList = data.map((item) => item.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceValue.textContent = "$" + maxPrice;

  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = "$" + e.target.value;
    displayProducts(data.filter((item) => item.price <= e.target.value));
  });
};

setCategories();
setPrices();
