import React from "react"
import tick from "../assets/checkout/icon-order-confirmation.svg"

export default function CheckoutLightBox() {
    return (
        <section className="checkout-lightbox">
            <img src={tick} alt="tick" />
            <h1 className="lightbox__title">THANK YOU FOR YOUR ORDER</h1>
            <p className="lightbox__description">You will receive an email confirmation shortly.</p>

            <section className="">
                <section>

                </section>
            </section>
        </section>
    )
}