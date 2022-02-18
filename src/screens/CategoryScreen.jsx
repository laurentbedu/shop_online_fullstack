import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import GenericCard from "../components/generics/GenericCard";
const Category = require("../rest/api/models/category.model");
const Product = require("../rest/api/models/product.model");
// const Category = require("../models/category.model");
// const Product = require("../models/product.model");

const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const categoryRef = useRef(null);
  const productsRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      const categories = //await (await fetch("/data/category.json")).json()
      Category.from(
        await (await fetch("/data/category.json")).json()
      );
      if (id) {
        const products = //await (await fetch("/data/product.json")).json()
        Product.from(
          await (await fetch("/data/product.json")).json()
        );
        categoryRef.current = categories.find((c) => c.id === +id);
        productsRef.current = products.filter((p) => p.category_id === +id);
      }
      setCategories(categories);
    };
    fetchData().catch(console.error);
  }, [id]);

  console.log(categories);

  const category = categoryRef.current;
  console.log(category);
  const products = productsRef.current;
  console.log(products);
  
  return (
    <>
      <h1>CategoryScreen</h1>
      {!id && (
        <div className="row">
          {categories.map((c) => {
            return (
              <div className="col-12 col-sm-6 col-lg-4 p-2" key={c.id}>
                <GenericCard
                  title={c.title}
                  text={c.description}
                  textTrunc={200}
                  imgSrc={c.image}
                  route={"/category/" + c.id}
                />
              </div>
            );
          })}
        </div>
      )}
      {category && (
        <div className="row">
          <h2>Catégorie {category.title}</h2>
          {products.map(p => {
              return <div key={p.id}>{p.title} : {p.price.toFixed(2)}€</div>;
          })}
        </div>
      )}
    </>
  );
};

export default CategoryScreen;
