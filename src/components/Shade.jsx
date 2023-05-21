import React from "react"
import $ from 'jquery'

export default function Shade(){

    //Hide menu on mobile and tablette
    function toggleMenu(){

        if ($('.mobile-nav').css('display') == 'block'){
            $(".mobile-nav").slideToggle(700);
        }

        setTimeout(() => {
            $(".shade").fadeToggle(700);
        }, 200)
    }

    return(
        <section 
            className="shade"
            style={{"display" : "none"}}
            onClick={toggleMenu}
        ></section>
    )
}