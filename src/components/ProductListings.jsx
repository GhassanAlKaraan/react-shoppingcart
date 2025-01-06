import { useState, useEffect } from "react";
import ProductListing from "./ProductListing";
import Spinner from "./Spinner";
import SearchDialog from "./SearchDialog";

const ProductListings = () => {

  const [products, setProducts] = useState([]); //default is empty array []
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);

  // in most cases we use empty array []
  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = `/api/products/all`;
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setProducts(data.data);
      } catch (e) {
        console.log(`Error fetching data: ${e}`);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 100);

        // setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="flex justify-center mb-4">
        <button className="bg-black text-white p-2 rounded" onClick={() => setSearch(!search)}>Search By</button>
      </div>

      <div className="container-xl lg:container m-auto">
        <div className={loading ? "flex justify-center" : "grid grid-cols-1 md:grid-cols-3 gap-6"}>
          {loading ? (<Spinner loading={loading} />) :
            products.map((product) => (
              <ProductListing product={product} key={product.id} />
            ))
          }
        </div>
      </div>
      {search ? <><SearchDialog onSearch={() => setSearch(false)} onClose={() => setSearch(false)} /></> : null}
    </section>
  );
};

export default ProductListings;
