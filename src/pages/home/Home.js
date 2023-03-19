// import axios from 'axios';
import React, { useEffect } from 'react'
import Category from "../../components/category/Category"
import Hero from "../../components/hero/Hero";
import Product from '../../components/product/Product';
import { axiosClient } from '../../utlis/axiosClient';
import { useSelector } from 'react-redux';
import './Home.scss'
import { useState } from 'react';
function Home() { 
  const categories = useSelector((state) => state.categoryReducer.categories);
  //  const[categories, setCategories] = useState(null);
   const[topProducts,setTopProducts] = useState(null);

   async function fetchData() {

    
    // const categoryResponse = await axiosClient.get('/categories?populate=image');
      const topProductsResponse = await axiosClient.get("/products?filters[isTopPick][$eq]=true&populate=image");
 
      // console.log(categoryResponse);
      // console.log(topProductsResponse);

      // setCategories(categoryResponse.data.data);
      setTopProducts(topProductsResponse.data.data); 
   }
    
   useEffect(()=>{
         fetchData()
   },[])

  return (
    <div className='Home'>
        <Hero/>
        <section className='collection container'>
          <div className='info'>
            <h2 className='heading'>Shop By Categories</h2>
            <p className='subheading'>Shop from the best, our Files and TV Posters Collection</p>
          </div>
          <div className='content'>
            {/* <Category/>
            <Category/>
            <Category/> */}
            {categories?.map(category => <Category key={category.id} category={category}/>)}
          </div>
        </section> 

        <section className='collection container'>
          <div className='info'>
            <h2 className='heading'>Our Top pickups</h2>
            <p className='subheading'>All New Design, Same old Details</p>
          </div>
          <div className='content'>
              {/* <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/> 
            <Product/>  */}

             {topProducts?.map(product => <Product key={product.id} product={product}/>)}
           
          </div>
        </section>
    </div> 
  )
}

export default Home