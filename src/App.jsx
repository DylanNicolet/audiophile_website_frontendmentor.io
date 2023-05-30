import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import "./sass/App.css"
import { Outlet } from "react-router-dom"
import { updateState } from "./redux/appSlice"
import Header from "./layout/Header"
import Shade from "./components/Shade"
import About from "./components/about"
import Footer from "./layout/Footer"

export default function App(){
    //States
    const screenWidth = useSelector(state => state.appState.screenWidth)

    //update Redux
    const dispatch = useDispatch()
    function updateScreenWidth(width){
        dispatch(updateState(
            {
                screenWidth: width,
            }
        ))
    }

    React.useEffect(() => {
        const handleWindowResize = () => {
          updateScreenWidth(window.innerWidth)
        }
    
        window.addEventListener('resize', handleWindowResize)
    
        return () => {
          window.removeEventListener('resize', handleWindowResize)
        }
    }, [] )
    
    React.useEffect(() => {
        localStorage.setItem('cartData', JSON.stringify([]));
    }, []);

    return(
        <section className="app">
            <Shade />
            <Header />
            <Outlet />
            <About />
            <Footer />
        </section>
    )
}