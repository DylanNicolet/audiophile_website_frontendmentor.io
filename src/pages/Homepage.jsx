import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import CategoryNav from "../components/CategoryNav"
import circlePattern from "../assets/home/desktop/pattern-circles.svg"

export default function Homepage(){
    const screenWidth = useSelector( state => state.appState.screenWidth )

    let device = "mobile"
    if ( screenWidth >= 768 && screenWidth < 920 ) { device = "tablet" }
    else if ( screenWidth >= 920 ) { device = "desktop" }

    let heroBg = require("/assets/home/" + device + "/image-hero.jpg")
    let module1Bg = require("/assets/home/" + device + "/image-speaker-zx9.png")
    let module2Bg = require("/assets/home/" + device + "/image-speaker-zx7.jpg")
    let module3Bg = require("/assets/home/" + device + "/image-earphones-yx1.jpg")

    return(
        <section className="homepage">
            <section className="hero" style={{ backgroundImage:`url(${heroBg})` }}>
                <p className="hero__title">NEW PRODUCT</p>
                <h1 className="hero__product-name">XX99 Mark II Headphones</h1>
                <p className="hero__description">Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
                <Link to={`/headphones/xx99-mark-two-headphones`}>
                    <button className="button--light">SEE PRODUCT</button>
                </Link>
            </section>

            <CategoryNav />

            <section
                className="homepage__module--1"
                style={{
                    backgroundImage : "url("+circlePattern+")",
                    backgroundPosition : "center",
                    backgroundRepeat : "no-repeat",
                    backgroundSize : "cover"
                }}
            >
                <img src={module1Bg} alt="ZX9 speakers" className="module__image"/>

                <section className="content">
                    <h1 className="content__title">ZX9 <br /> SPEAKER</h1>
                    <p className="content__description">
                        Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                    </p>
                    <Link to={'/speakers/zx9-speaker'}>
                        <button className="button--dark">SEE PRODUCT</button>
                    </Link>
                </section>
            </section>

            <section
                className="homepage__module--2"
                style={{
                    backgroundImage : "url("+module2Bg+")",
                    backgroundPosition : "center",
                    backgroundRepeat : "no-repeat",
                    backgroundSize : "cover"
                }}
            >

                <section className="content">
                    <h1 className="content__title">ZX7 SPEAKER</h1>
                    <Link to={'/speakers/zx7-speaker'}>
                        <button className="button--transparent">SEE PRODUCT</button>
                    </Link>
                </section>
            </section>

            <section className="homepage__module--3">

                <section className="image"
                    style={{
                        backgroundImage : "url("+module3Bg+")",
                        backgroundPosition : "center",
                        backgroundRepeat : "no-repeat",
                        backgroundSize : "cover"
                    }}
                >
                </section>

                <section className="content">
                    <h1 className="content__title">YX1 EARPHONES</h1>
                    <Link to={'/earphones/yx1-earphones'}>
                        <button className="button--transparent">SEE PRODUCT</button>
                    </Link>
                </section>

            </section>
        </section>
    )
}