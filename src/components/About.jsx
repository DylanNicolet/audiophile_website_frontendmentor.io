import React from "react";
import aboutImageMobile from "../assets/shared/mobile/image-best-gear.jpg"
import aboutImageTablet from "../assets/shared/tablet/image-best-gear.jpg"
import aboutImageDesktop from "../assets/shared/desktop/image-best-gear.jpg"
import { useSelector } from "react-redux"
import imgData from "../../imgData.json"

export default function About() {

    const screenWidth = useSelector(state => state.appState.screenWidth)
    let aboutImage = undefined

    if(screenWidth < 768){
        aboutImage = imgData.aboutImg.mobile
    }
    else if(screenWidth >= 768 && screenWidth < 920){
        aboutImage = imgData.aboutImg.tablet
    }
    else if(screenWidth >= 920){
        aboutImage = imgData.aboutImg.desktop
    }

    return(
        <section className="about">
            <section 
                className="about__image"
                style={{
                    backgroundImage : "url("+aboutImage+")",
                    backgroundPosition : "center",
                    backgroundRepeat : "no-repeat",
                    backgroundSize : "cover"
                }}
            >
            </section>

            <section className="content">
                <h2 className="content__title">Bringing you the <span>best</span> audio gear</h2>
                <p className="content__description">
                    Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
                    earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration 
                    rooms available for you to browse and experience a wide range of our products. Stop by our store 
                    to meet some of the fantastic people who make Audiophile the best place to buy your portable 
                    audio equipment.
                </p>
            </section>
        </section>
    )
}