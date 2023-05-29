import React from "react"
import { useParams } from "react-router-dom"
import data from "../../data.json"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CategoryNav from "../components/CategoryNav"

export default function Category(){

    //Get screenwidth
    const screenWidth = useSelector(state => state.appState.screenWidth)
    

    let { category } = useParams()
    let filteredData = data.filter((product)=>{if(product.category == category){return product}});

    console.log(category)

    let products = filteredData.map((product, index) => {

        let device = "mobile"
        if(screenWidth >= 768 && screenWidth < 920){
            device = "tablet"
        }
        else if(screenWidth >= 920){
            device = "desktop"
        }

        return(
            <section className="product" key={index}>
                <img src={product.categoryImage.mobile} alt="img" className="product__image" />
                ADD EXCEPTION TO KNOW DEVICE AND LOAD PROPER IMAGES
                
                <section className="product__info">
                    {product.new &&  <p className="product__new">NEW PRODUCT</p>}
                    <h2 className="product__title">{product.name}</h2>
                    <p className="product__description">{product.description}</p>
                    <Link to={`#`}>
                        <button className="button--light">SEE PRODUCT</button>
                    </Link>
                </section>
            </section>
        )
    })

    return(
        <section className="category">
            <section className="category__top">
                <h1 className="title">{category}</h1>
            </section>

            <section className="products-block">
                {products}
            </section>

            <CategoryNav />
        </section>
    )
}