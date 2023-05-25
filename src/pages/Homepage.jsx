import React from "react"
import { Link } from "react-router-dom"
import heroMobileBg from "../assets/home/mobile/image-header.jpg"
import heroTabletBg from "../assets/home/tablet/image-header.jpg"
import heroDesktopBg from "../assets/home/desktop/image-hero.jpg"
import { useSelector } from "react-redux"
import CategoryNav from "../components/CategoryNav"
import module1Image from "../assets/home/mobile/image-speaker-zx9.png"
import circlePattern from "../assets/home/desktop/pattern-circles.svg"

export default function Homepage(){
    const screenWidth = useSelector(state => state.appState.screenWidth)
    let heroBg = undefined

    if(screenWidth < 768){
        heroBg = heroMobileBg
    }
    else if(screenWidth >= 768 && screenWidth < 920){
        heroBg = heroTabletBg
    } else if(screenWidth >= 920){
        heroBg = heroDesktopBg
    }

    return(
        <section className="homepage">
            <section className="hero" style={{ backgroundImage:`url(${heroBg})` }}>
                <p className="hero__title">NEW PRODUCT</p>
                <h1 className="hero__product-name">XX99 Mark II Headphones</h1>
                <p className="hero__description">Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
                <Link to={`#`}>
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
                <img src={module1Image} alt="" className="module__image"/>

                <section className="content">
                    <h1 className="content__title">ZX9 <br /> SPEAKER</h1>
                    <p className="content__description">
                        Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                    </p>
                    <Link>
                        <button className="button--dark">SEE PRODUCT</button>
                    </Link>
                </section>
            </section>
        </section>
    )
}