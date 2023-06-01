import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import $ from 'jquery'
import hamburgerIcon from "../assets/shared/tablet/icon-hamburger.svg"
import brandLogo from "../assets/shared/desktop/logo.svg"
import cartIcon from "../assets/shared/desktop/icon-cart.svg"
import CategoryNav from "../components/CategoryNav"
import DeployedNav from "../components/DeployedNav"
import Cart from "../components/Cart"


export default function Header(){
    const screenWidth = useSelector( state => state.appState.screenWidth )
    
    let [CartIsOpen, setCartIsOpen] = React.useState(false) 

    //Open or close mobile menu on hamburger click
    function toggleMenu(){
        $(".mobile-nav").slideToggle(700);
        $(".shade").fadeToggle(700);
    }

    function toggleCart() {
        setCartIsOpen( ( prev ) => ( !prev ) )
        $(".shade").fadeToggle(300);
    }

    return(
        <header>
            {screenWidth <= 768 && 
                <button className="hamburger" onClick={toggleMenu}>
                    <img src={hamburgerIcon} alt="Open or close menu"/>
                </button>
            }

            <Link to={`/`} className="brand-logo">
                <img src={brandLogo} alt="Brand logo, redirects to homepage"/>
            </Link>

            {screenWidth > 768 && <DeployedNav /> }

            <button className="cart" onClick={toggleCart}>
                <img src={cartIcon} alt="Open or close my cart" />
            </button>

            <section className="mobile-nav" style={{"display" : "none"}}>
                <CategoryNav header={true} />
            </section>

            {CartIsOpen && <Cart />}
        </header>
    )
}