import React from "react"
import { useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import data from "../../data.json"

export default function ProductPage() {
    //Detect which category we are on, using the URL parameter (category)
    let { productSlug } = useParams()

    //Filter all received data, for this product only
    let product = data.filter( ( product ) => { if ( product.slug == productSlug ) { return product } } )[ 0 ]
    
    //States
    let [ counterNumber, setCounterNumber ] = React.useState( 1 )
    let [ price, setPrice ] = React.useState( product.price )
    let [cartData, setCartData] = React.useState([])

    //Get screenwidth from REDUX
    const screenWidth = useSelector(state => state.appState.screenWidth)
    
    //Load proper image size
    let productImage = product.image.mobile
    if(screenWidth >= 768 && screenWidth < 920){
        productImage = product.image.tablet
    }
    else if(screenWidth >= 920){
        productImage = product.image.desktop
    }

    //Counter logic
    function increaseCounter() {
        setCounterNumber( ( prev ) => ( prev + 1 ) )
        setPrice(( prev ) => ( prev + product.price ))
    }

    function decrementCounter() {
        setCounterNumber( ( prev ) => ( prev - 1 ) )
        setPrice(( prev ) => ( prev - product.price ))
    }

    //Retrieve cart on initial render
    React.useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cartData'));
        if (cartData) {
            setCartData(cartData);
        }
    }, [] )
    
    function addToCart() {
        let productData = {
            id: product.id,
            amount: counterNumber,
            price: price
        }

        setCartData((prev) => (prev.push(productData)))

        //localStorage.setItem('cartData', JSON.stringify(newCartData))
    }

    React.useEffect( () => {
        console.log(cartData)
    }, [cartData])
    
    return (
        <section className="product-page">
            <Link to={'..'} relative="path" className="go-back">Go Back</Link>

            <section className="general-info">
                <img src={productImage} alt="img" className="product__image" />
                
                <section className="product__info">
                    {product.new &&  <p className="product__new">NEW PRODUCT</p>}
                    <h2 className="product__title">{product.name}</h2>
                    <p className="product__description">{product.description}</p>
                    <p className="product__price">$ {price.toLocaleString()}</p>
                    
                    <section className="counter-container">
                        <section className="counter">
                            <button className="counter__decrease" onClick={decrementCounter}>-</button>
                            <p className="counter__number">{counterNumber}</p>
                            <button className="counter__increase" onClick={increaseCounter}>+</button>
                        </section>
                        
                        <button className="add-cart" onClick={addToCart}>ADD TO CART</button>
                    </section>
                </section>
            </section>
        </section>
    )
}