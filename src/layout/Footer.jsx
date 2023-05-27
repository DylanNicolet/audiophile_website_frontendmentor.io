import React from "react"
import { Link } from "react-router-dom"
import brandLogo from "../assets/shared/desktop/logo.svg"
import DeployedNav from "../components/DeployedNav"
import IconFacebook from "../assets/shared/desktop/icon-facebook.svg"
import IconTwitter from "../assets/shared/desktop/icon-twitter.svg"
import IconInstagram from "../assets/shared/desktop/icon-Instagram.svg"

export default function Footer(){
    return(
        <footer>

            <section className="deco-container">
                <section className="deco"></section>
            </section>

            <section className="footer__top">
                <Link to={`/`} className="brand-logo">
                    <img src={brandLogo} alt="Brand logo, redirects to homepage"/>
                </Link>

                <DeployedNav />
            </section>
            
            <p className="footer__text">
                Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers 
                and sound specialists who are devoted to helping you get the most out of personal audio. Come and 
                visit our demo facility - we’re open 7 days a week.
            </p>

            <p className="footer__copyright">
                Copyright 2023. All Rights Reserved
            </p>

            <section className="social-media">
                <Link to={`#`}><img src={IconFacebook} alt="Link to Facebook"/></Link>
                <Link to={`#`}><img src={IconTwitter} alt="Link to Twitter" /></Link>
                <Link to={`#`}><img src={IconInstagram} alt="Link to Instagram" /></Link>
            </section>
        </footer>
    )
}