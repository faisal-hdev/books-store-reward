import { useEffect, useState } from "react";
import "./App.css";
import Title from "./Title";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState([]);

  // load from json-data
  useEffect(() => {
    fetch("product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    setCartItem([...cartItem, product]);
  };

  return (
    <>
      <Title />
      <section className="container pt-20 flex w-full justify-between flex-col lg:flex lg:flex-row gap-5 max-w-[1400px] mx-auto">
        <div
          id="productContainer"
          className="pt-7 w-full lg:w-[80%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-12"
        >
          {products?.map((product) => {
            const { name, image, originalPrice, discountPrice, rating } =
              product;
            return (
              <div
                key={product?.name}
                className="relative flex w-full h-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
              >
                <div className="relative mx-4 -mt-6 h-52 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                  <img
                    src={image}
                    alt="img-blur-shadow"
                    className="h-full w-full"
                  />
                </div>
                <div className="p-6">
                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {name}
                  </h5>
                  <div>
                    <span>
                      <del>{originalPrice}</del> TK.
                    </span>
                    <span className="ml-3">{discountPrice} TK.</span>
                  </div>
                  <div className="rating">Rating : {rating}</div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="select-none rounded-lg bg-gradient-to-r to-emerald-600 from-sky-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-ripple-light="true"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:w-[20%] w-full h-[100vh] overflow-y-auto sticky top-3">
          <p className="text-center">Total Cart Item : {cartItem.length}</p>
          <p className="text-center p-3" id="totalPriceDisplay"></p>
          <div id="cartContainer" className="cartContainer ">
            <table className="table-auto border w-full text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItem.map((singleItem) => {
                  return (
                    <tr key={singleItem.id}>
                      <td>{singleItem.name}</td>
                      <td>{singleItem.originalPrice}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
