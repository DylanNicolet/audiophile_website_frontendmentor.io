import React from "react"
import { useSelector } from "react-redux"

export default function Cart() {

    
    //Get screenwidth from REDUX
    const screenWidth = useSelector(state => state.appState.screenWidth)

    let cartData = JSON.parse( localStorage.getItem( "cartData" ) || "[]" )
    console.log( cartData )
        
    let products = cartData.map( ( product, index ) => {

        //Define image source according to screen size
        let source = "/assets/product-" + product.slug + "/mobile/image-product.jpg"
        if(screenWidth >= 768 && screenWidth < 920){
            source = "/assets/product-" + product.slug + "/tablet/image-product.jpg"
        }
        else if(screenWidth >= 920){
            source = "/assets/product-" + product.slug + "/desktop/image-product.jpg"
        }

        return (
            <section className="product" key={index}>

                <img src={source} alt="image" className="product__image"/>

                <section className="title-and-price">
                    <h3 className="title">{ product.name }</h3>
                    <p className="price">{"$ " + product.totalPrice.toLocaleString()}</p>
                </section>

                <section className="counter">
                        <button className="counter__button" onClick={decrementCounter}>-</button>
                        <p className="counter__number">{product.amount}</p>
                        <button className="counter__button" onClick={increaseCounter}>+</button>
                </section>
                
            </section>
        )
    } )
    
    function decrementCounter() {
        
    }

    function increaseCounter() {
        
    }

    return (
        <section className="modal-cart" style={{ "display": "block" }}>
            <section className="header">
                <h2 className="title">CART (3)</h2>
                <button className="button-remove-all">Remove all</button>
            </section>

            <section className="products-block">
                {products}
            </section>
        </section>
    )
}