import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "../Categories";

function Dilam() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return <Categories products={products} currentCategory="di-lam" />;
}

export default Dilam;
