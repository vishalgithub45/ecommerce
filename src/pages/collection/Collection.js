import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../../components/product/Product";
import { axiosClient } from "../../utlis/axiosClient";
import "./Collection.scss";
function Collection() {
  const parameter = useParams();
  const navigate = useNavigate(); 

  const [categoryId, setCategoryId] = useState("");
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [product, setProducts] = useState([]);
  // const categoryList = [
  //   {
  //     id: "comics",
  //     value: "Comics",
  //   },
  //   {
  //     id: "tv-shows",
  //     value: "Tv Shows",
  //   },
  //   {
  //     id: "sports",
  //     value: "Sports",
  //   },
  // ];

  //we can sort value,price by using sort filtering method//
  const sortOptions = [
    {
      // key: "price-asc",
      value: "Price - Low TO High",
      sort: "price",
    },
    {
      // key: "price-first",
      value: "Newest First",
      sort: "createdAt",
    },
  ];

  const [sortBy, setSortBy] = useState(sortOptions[0].sort);

  async function fetchProducts() {
    const url = parameter.categoryId
      ? `/products?populate=image&filters[category][key][$eq]=${parameter.categoryId}&sort=${sortBy}`
      : `/products?populate=image&sort=${sortBy}`;
    const response = await axiosClient.get(url);
    setProducts(response.data.data);
  }

  useEffect(() => {
    setCategoryId(parameter.categoryId);
    fetchProducts();
  }, [parameter, sortBy]);

  function updateCategory(e) {
    navigate(`/category/${e.target.value}`);
  }

  // function handleSortChange(e) {
  //   const sortKey  = e.target.value;
  //   setSortBy(sortKey);
  //   console.log(sortKey);
  // }

  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore ALl Print and Artwork</h2>
            <p>India's largest collection of wall posters for your bed</p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <h3 className="sort-by-text">Sort By</h3>
              <select
                className="select-sort-by"
                name="sort-by"
                id="sort-by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((item) => (
                  <option key={item.sort} value={item.sort}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Category</h3>
              {categories.map((item) => (
                <div key={item.id} className="filter-radio">
                  <input
                    // name="category"
                    type="radio"
                    value={item.attributes.key}
                    id={item.id}
                    onChange={updateCategory}
                    checked={item.attributes.key === categoryId}
                  />
                  <label htmlFor={item.id}> {item.attributes.title} </label>
                </div>
              ))}

              {/*                 
                <div className='filter-radio'>
                  <input name='category'
                   type='radio'
                   id='comics'
                   />
                   <label htmlFor='comics'>Comics</label>
                </div>
                <div className='filter-radio'>
                  <input name='category'
                   type='radio'
                   id='tv-shows'
                   />
                   <label htmlFor='tv-shows'>Tv-Shows</label>
                </div>
                <div className='filter-radio'>
                  <input name='category'
                   type='radio'
                   id='sports'
                   />
                   <label htmlFor='Sports'>Sports</label>
                </div> */}
            </div>
          </div>
          <div className="products-box">
            {/* <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product /> */}
            {product.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
