import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import "./sass/App.css"
import { Outlet } from "react-router-dom"
import Header from "./layout/Header"

export default function App(){
    //States
    //const homepageActive = useSelector(state => state.appState.homepageActive)

    return(
        <section className="app">
            <Header />
            <Outlet />
        </section>
    )
}