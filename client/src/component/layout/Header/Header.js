import React from 'react'
import logo from "../../../images/logo.png"
import { ReactNavbar } from "overlay-navbar";
import { RiSearchLine, RiUserLine, RiShoppingCartLine } from "react-icons/ri";

const Header = () => {
    const options = {
        burgerColorHover: "var(--primary-600)",
        logo,
        logoWidth: "20vmax",
        navColor1: "white",
        logoHoverSize: "10px",
        logoHoverColor: "var(--primary-600)",
        link1Text: "Home",
        link2Text: "Products",
        link3Text: "Contact",
        link4Text: "About",
        link1Url: "/",
        link2Url: "/products",
        link3Url: "/contact",
        link4Url: "/about",
        link1Size: "1.3vmax",
        link1Color: "var(--gray-700)",
        nav1justifyContent: "flex-end",
        nav2justifyContent: "flex-end",
        nav3justifyContent: "flex-start",
        nav4justifyContent: "flex-start",
        link1ColorHover: "var(--primary-600)",
        link1Margin: "1vmax",
        profileIconColor: "var(--gray-700)",
        searchIconColor: "var(--gray-700)",
        cartIconColor: "var(--gray-700)",
        profileIconColorHover: "var(--primary-600)",
        searchIconColorHover: "var(--primary-600)",
        cartIconColorHover: "var(--primary-600)",
        cartIconMargin: "1vmax",
        profileIcon: true,
        profileIconUrl: "/login",
        ProfileIconElement: RiUserLine,
        searchIcon: true,
        searchIconUrl: "/search",
        SearchIconElement: RiSearchLine,
        cartIcon: true,
        cartIconUrl: "/cart",
        CartIconElement: RiShoppingCartLine
    };

    return (
        <ReactNavbar {...options} />
    )
}

export default Header;