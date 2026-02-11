import React from "react"
import { Link } from "react-router-dom"
import CheckoutLightBox from "../components/CheckoutLightbox"
import cashOnDeliveryImg from "../assets/checkout/icon-cash-on-delivery.svg"
import Shade from "../components/Shade"
import FormInput from "../components/FormInput"

export default function Checkout() {
    // States
    let [ totalCart, setTotalCart ] = React.useState( 0 )
    let [ cartData, setCartData ] = React.useState( JSON.parse( localStorage.getItem( "cartData" ) || "[]" ) )
    let [ vat, setVat ] = React.useState( 0 )
    let [ grandTotal, setGrandTotal ] = React.useState( 0 )
    let [ lightboxOpen, setLightboxOpen ] = React.useState( false )

    let [allErrors, setAllErrors] = React.useState({})
    
    // Form data states 
    let [ formData, setformData ] = React.useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        zip: "",
        city: "",
        country: "",
        paymentMethod: "e-money",
        moneyNumber: "",
        moneyPin: ""
    })

    // Determine totalCart and VAT
    React.useEffect( () => {
        cartData.map( ( product ) => {
            setTotalCart( ( prev ) => ( prev + (product.price * product.amount) ) )
        } )
    }, [] )

    // Determine VAT as 20% of total excluding shipping
    React.useEffect( () => {
        setVat( Math.round( ( 20 / 100 ) * totalCart ) )
    }, [ totalCart ] )

    // Determine grandTotal
    React.useEffect( () => {
        setGrandTotal(totalCart + 50)
    }, [ vat ] )

    let products = cartData.map( ( product, index ) => {

        // Remove last word of product's name to match Figma model
        let lastIndex = product.name.lastIndexOf(" ");
        let productName = product.name.substring(0, lastIndex);

        return (
            <section className="product" key={index}>

                <img src={product.cartImage} alt="image" className="product__image"/>

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

    // Update form data on change for every input
    function updateFormData( e ) {
        const { name, value } = e.target
        
        setformData( ( prev ) => {
            return {...prev, [name]: value}
        } )
    }

    // Validate form data at submit
    function formValidator() {

        // REGEX
        let regName = /^[a-zA-Z]+ [a-zA-Z]+$/
        let regEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
        let regMoneyNumber = /\d{9}/
        let regMoneyPin = /\d{4}/

        // TESTS
        const newErrors = {}

        if (!formData.name) {
            newErrors.name = 'This field is empty'
        } else if (!regName.test( formData.name )) {
            newErrors.name = 'Invalid format'
        }

        if (!formData.email) {
            newErrors.email = 'This field is empty'
        } else if (!regEmail.test( formData.email )) {
            newErrors.email = 'Invalid format'
        }

        !formData.phoneNumber && (newErrors.phoneNumber = 'This field is empty');
        !formData.address && (newErrors.address = 'This field is empty');
        !formData.zip && (newErrors.zip = 'This field is empty');
        !formData.city && (newErrors.city = 'This field is empty');
        !formData.country && (newErrors.country = 'This field is empty');

        if ( formData.paymentMethod === "e-money" ) {
            if (!formData.moneyNumber) {
                newErrors.moneyNumber = 'This field is empty'
            } else if (!regMoneyNumber.test( formData.moneyNumber )) {
                newErrors.moneyNumber = 'Invalid format'
            }

            if (!formData.moneyPin) {
                newErrors.moneyPin = 'This field is empty'
            } else if (!regMoneyPin.test( formData.moneyPin )) {
                newErrors.moneyPin = 'Invalid format'
            }
        }

        setAllErrors(newErrors)

        // If no errors are found, we submit the form
        if ( Object.keys(newErrors).length === 0 ) {
            setLightboxOpen(true)
        }
        else { // else scroll to the top of the form
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            })
        }
    }

    return (
        <section className="checkout">
            <Link to={'..'} className="go-back">Go Back</Link>
            
            <form className="checkout-form">
                <h1 className="checkout-form__title">CHECKOUT</h1>

                <section className="billing-details">
                    <h2 className="checkout-form__subtitle">BILLING DETAILS</h2>

                    {/* Input name */}
                    <FormInput 
                        name="name" 
                        id="name" 
                        type='text' 
                        placeholder="Alexei Ward"
                        label="Name" 
                        autoComplete="name" 
                        onChange={updateFormData} 
                        errorText={allErrors.name}
                    />

                    {/* Input email */}
                    <FormInput 
                        name="email" 
                        id="email" 
                        type='email' 
                        placeholder="alexei@mail.com" 
                        label="Email Address" 
                        autoComplete="email" 
                        onChange={updateFormData} 
                        errorText={allErrors.email}
                    />

                    {/* Input Phone Number */}
                    <FormInput 
                        name="phoneNumber" 
                        id="phoneNumber" 
                        type='number' 
                        placeholder="+1 (202) 555-0136" 
                        label="Phone Number" 
                        autoComplete="tel" 
                        onChange={updateFormData} 
                        errorText={allErrors.phoneNumber}
                    />
                </section>

                <section className="shipping-info">
                    <h2 className="checkout-form__subtitle">SHIPPING INFO</h2>

                    {/* Input Address */}
                    <FormInput 
                        name="address" 
                        id="address" 
                        type='text' 
                        placeholder="1137 Williams Avenue" 
                        label="Your Address" 
                        onChange={updateFormData} 
                        errorText={allErrors.address}
                    />

                    {/* Input ZIP */}
                    <FormInput 
                        name="zip" 
                        id="zip" 
                        type="number" 
                        placeholder="10001" 
                        label="ZIP Code" 
                        onChange={updateFormData} 
                        errorText={allErrors.zip}
                    />

                    {/* Input City */}
                    <FormInput 
                        name="city" 
                        id="city" 
                        type="text" 
                        placeholder="New York" 
                        label="City" 
                        onChange={updateFormData} 
                        errorText={allErrors.city}
                    />

                    {/* Input Country */}
                    <FormInput 
                        name="country" 
                        id="country" 
                        type="text" 
                        placeholder="United States" 
                        label="Country" 
                        onChange={updateFormData} 
                        errorText={allErrors.country}
                    />
                </section>

                <section className="payment-details">
                    <h2 className="checkout-form__subtitle">PAYMENT DETAILS</h2>

                    <fieldset>
                        <h3 className="payment-method-title">Payment method</h3>
                        <section className={"radio-container " + (formData.paymentMethod === "e-money" ? "--selected" : "")}>
                            <input type="radio" value="e-money" name="paymentMethod" id="e-money" defaultChecked onClick={updateFormData}/>
                            <label htmlFor="e-money">e-Money</label>
                        </section>

                        <section className={"radio-container cash-on-delivery " + (formData.paymentMethod === "cash-on-delivery" ? "--selected" : "")}>
                            <input type="radio" value="cash-on-delivery" name="paymentMethod" id="cash-on-delivery" onClick={updateFormData}/>
                            <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                        </section>
                    </fieldset>

                    {formData.paymentMethod === "e-money" &&
                        <>
                            {/* Input e-Money number */}
                            <FormInput 
                                name="moneyNumber" 
                                id="moneyNumber" 
                                type="number" 
                                placeholder="238521993" 
                                label="e-Money Number" 
                                onChange={updateFormData} 
                                errorText={allErrors.moneyNumber}
                            />

                            {/* Input e-Money PIN */}
                            <FormInput 
                                name="moneyPin" 
                                id="moneyPin" 
                                type="number" 
                                placeholder="6891" 
                                label="e-Money PIN" 
                                onChange={updateFormData} 
                                errorText={allErrors.moneyPin}
                            />
                        </>
                    }

                    {formData.paymentMethod === "cash-on-delivery" &&
                        <section className="cash-on-delivery-container">
                            <img src={cashOnDeliveryImg} alt="Cash on delivery" />
                            <p>The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</p>
                        </section>
                    }
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

                <button className="button button--light" onClick={formValidator}>CONTINUE & PAY</button>
            </section>

            {   lightboxOpen && 
                <>
                    <CheckoutLightBox checkoutLightboxClosed={() => setLightboxOpen(false)} />
                    <Shade closeShade={() => setLightboxOpen(false)} />
                </>
            }
        </section>
    )
}