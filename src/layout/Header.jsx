import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import hamburgerIcon from "../assets/shared/tablet/icon-hamburger.svg"
import brandLogo from "../assets/shared/desktop/logo.svg"
import cartIcon from "../assets/shared/desktop/icon-cart.svg"
import CategoryNav from "../components/CategoryNav"
import DeployedNav from "../components/DeployedNav"
import Cart from "../components/Cart"
import { updateCartOpen } from "../redux/appSlice"
import { useState } from "react"
import Shade from "../components/Shade"


export default function Header() {

    // REDUX states
    const dispatch = useDispatch()
    const screenWidth = useSelector( state => state.appState.screenWidth )
    const cartOpen = useSelector( state => state.appState.cartOpen )

    // States
    const [mobileNavOpen, setMobileNavOpen] = useState(false)

    function toggleCart() {
        dispatch(updateCartOpen({ cartOpen: !cartOpen, }))
    }

    return(
        <header>
            {/* Hamburger Icon (Mobile only) */}
            { screenWidth <= 768 && 
                <button className="hamburger" onClick={() => setMobileNavOpen(value => !value)}>
                    <img src={hamburgerIcon} alt=""/>
                </button>
            }

            {/* Brand Icon with redirection link to homepage */}
            <Link to={`/`} className="brand-logo">
                <img src={brandLogo} alt="Brand logo, redirects to homepage"/>
            </Link>

            {/* Nav bar fro tablet and desktop */}
            { screenWidth > 768 && <DeployedNav /> }

            {/* Nav menu for Mobile */}
            { mobileNavOpen &&
                <>
                    <section className="mobile-nav">
                        <CategoryNav header={true} linkClicked={() => setMobileNavOpen(false)}/>
                    </section>
                    <Shade closeShade={() => setMobileNavOpen(false)} />
                </>
            }

            {/* Cart toggle button */}
            <button className="cart" onClick={toggleCart}>
                <img src={cartIcon} alt="" />
            </button>

            {/* Cart popin */}
            { cartOpen && 
                <>
                    <Cart />
                    <Shade closeShade={toggleCart} />
                </>
            }
        </header>
    )
}