import React from "react"
import { useParams } from "react-router-dom"
import data from "../../data.json"
import { useSelector } from "react-redux"

export default function Category(){

    //Get screenwidth
    const screenWidth = useSelector(state => state.appState.screenWidth)
    

    let { category } = useParams()
    let filteredData = data.filter((product)=>{if(product.category == category){return product}});

    console.log(category)

    let product = filteredData.map((product, index) => {

        let device = "mobile"
        if(screenWidth >= 768 && screenWidth < 920){
            device = "tablet"
        }
        else if(screenWidth >= 920){
            device = "desktop"
        }

        return(
            <section className="product" key={index}>
                <img src={product.categoryImage.mobile} alt="img" />
                <h2>{product.name}</h2>
            </section>
        )
    })

    return(
        <section className="category">
            <section className="category__top">
                <h1 className="title">{category}</h1>
            </section>
 
            {product}

        </section>
    )
}