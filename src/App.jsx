import React from "react"
import { useDispatch } from 'react-redux'
import "./sass/App.css"
import { Outlet } from "react-router-dom"
import { updateState } from "./redux/appSlice"
import Header from "./layout/Header"
import Shade from "./components/Shade"
import About from "./components/about"
import Footer from "./layout/Footer"
import ScrollToTop from "./components/ScrollToTop"
import Cart from "./components/Cart"

export default function App(){
    //update Redux
    const dispatch = useDispatch()
    function updateScreenWidth(width){
        dispatch(updateState(
            {
                screenWidth: width,
            }
        ))
    }

    //Find screensize
    React.useEffect(() => {
        const handleWindowResize = () => {
          updateScreenWidth(window.innerWidth)
        }
    
        window.addEventListener('resize', handleWindowResize)
    
        return () => {
          window.removeEventListener('resize', handleWindowResize)
        }
    }, [] )
    
    //Initialise local storage for cartData
    React.useEffect( () => {
        if ( !localStorage.getItem( 'cartData' ) ) {
            localStorage.setItem('cartData', JSON.stringify([]))
        }
    }, [])

    return(
        <section className="app">
            <Cart />
            <ScrollToTop />
            <Shade />
            <Header />
            <Outlet />
            <About />
            <Footer />
        </section>
    )
}