import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Checkout() {
    //States
    let [ totalCart, setTotalCart ] = React.useState( 0 )
    let [ cartData, setCartData ] = React.useState( JSON.parse( localStorage.getItem( "cartData" ) || "[]" ) )
    let [ vat, setVat ] = React.useState( 0 )
    let [grandTotal, setGrandTotal] = React.useState(0)

    //Get screenwidth from REDUX
    const screenWidth = useSelector( state => state.appState.screenWidth )

    //Determine totalCart and VAT
    React.useEffect( () => {
        cartData.map( ( product ) => {
            setTotalCart( ( prev ) => ( prev + (product.price * product.amount) ) )
        } )
    }, [] )

    //Determine VAT as 20% of total excluding shipping
    React.useEffect( () => {
        setVat( Math.round( ( 20 / 100 ) * totalCart ) )
    }, [ totalCart ] )

    //Determine grandTotal
    React.useEffect( () => {
        setGrandTotal(totalCart + vat + 50)
    }, [ vat ] )

    let products = cartData.map( ( product, index ) => {

        //Define image source according to screen size
        let source = "/assets/product-" + product.slug + "/mobile/image-product.jpg"
        if(screenWidth >= 768 && screenWidth < 920){
            source = "/assets/product-" + product.slug + "/tablet/image-product.jpg"
        }
        else if(screenWidth >= 920){
            source = "/assets/product-" + product.slug + "/desktop/image-product.jpg"
        }

        //Remove last word of product's name to match Figma model
        let lastIndex = product.name.lastIndexOf(" ");
        let productName = product.name.substring(0, lastIndex);

        return (
            <section className="product" key={index}>

                <img src={source} alt="image" className="product__image"/>

                <section className="title-and-price">
                    <h3 className="title">{ productName }</h3>
                    <p className="price">{"$ " + (product.price * product.amount).toLocaleString()}</p>
                </section>

                <section className="counter">
                        <p className="counter__number">x{product.amount}</p>
                </section>
                
            </section>
        )
    } )

    return (
        <section className="checkout">
            <Link to={'..'} className="go-back">Go Back</Link>
            
            <form className="checkout-form">
                <h1 className="checkout-form__title">CHECKOUT</h1>

                <section className="billing-details">
                    <h2 className="checkout-form__subtitle">BILLING DETAILS</h2>

                    <section className="label-input">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Alexei Ward" name="name" id="name"/>
                    </section>

                    <section className="label-input">
                        <label htmlFor="email">Email Address</label>
                        <input type="text" placeholder="alexei@mail.com" name="email" id="email"/>
                    </section>

                    <section className="label-input">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="number" placeholder="+1 202-555-0136" name="phone" id="phone"/>
                    </section>
                </section>

                <section className="shipping-info">
                    <h2 className="checkout-form__subtitle">SHIPPING INFO</h2>

                    <section className="label-input address">
                        <label htmlFor="address">Your Address</label>
                        <input type="text" placeholder="1137 Williams Avenue" name="address" id="address"/>
                    </section>

                    <section className="label-input">
                        <label htmlFor="zip">ZIP Code</label>
                        <input type="number" placeholder="10001" name="zip" id="zip"/>
                    </section>

                    <section className="label-input">
                        <label htmlFor="city">City</label>
                        <input type="text" placeholder="New York" name="city" id="city"/>
                    </section>

                    <section className="label-input">
                        <label htmlFor="country">Country</label>
                        <input type="text" placeholder="United States" name="country" id="country"/>
                    </section>
                </section>

                <section className="payment-details">
                    <h2 className="checkout-form__subtitle">PAYMENT DETAILS</h2>

                    <fieldset>
                        <h3 className="payment-method-title">Payment method</h3>
                        <section className="radio-container">
                            <input type="radio" value="e-money" name="payment-method" id="e-money"/>
                            <label htmlFor="e-money">e-Money</label>
                        </section>

                        <section className="radio-container cash-on-delivery">
                            <input type="radio" value="cash-on-delivery" name="payment-method" id="cash-on-delivery"/>
                            <label htmlFor="zip">Cash on Delivery</label>
                        </section>
                    </fieldset>

                    <section className="label-input">
                        <label htmlFor="e-money-number">e-Money Number</label>
                        <input type="number" placeholder="238521993" name="e-money-number" id="e-money-number"/>
                    </section>

                    <section className="label-input">
                        <label htmlFor="e-money-pin">e-Money PIN</label>
                        <input type="text" placeholder="6891" name="e-money-pin" id="e-money-pin"/>
                    </section>
                </section>
            </form>

            <section className="summary">
                <h2 className="summary__title">SUMMARY</h2>

                <section className="products-block">
                    {products}
                </section>

                <section className="summary__amount">
                    <p className="description">TOTAL</p>
                    <p className="amount">$ { totalCart.toLocaleString() }</p>
                </section>

                <section className="summary__amount">
                    <p className="description">SHIPPING</p>
                    <p className="amount">$ 50</p>
                </section>

                <section className="summary__amount">
                    <p className="description">VAT (INCLUDED)</p>
                    <p className="amount">$ { vat.toLocaleString() }</p>
                </section>

                <section className="summary__amount grand-total">
                    <p className="description">GRAND TOTAL</p>
                    <p className="amount">$ { grandTotal.toLocaleString() }</p>
                </section>

                <button className="button button--light">CONTINUE & PAY</button>
            </section>
        </section>
    )
}