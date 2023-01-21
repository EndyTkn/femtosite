import React from "react";
import { Navbar } from "../molecules/Navbar/Navbar";
import { Header } from "../organism/Header/Header";
import { Intro } from "../organism/Intro/Intro";
import { Projects } from "../organism/Projects/Projects";
import { Team } from "../organism/Team/Team";
import "./HomeStyles.css";


export const Home = () => {
    return (
        <div className="container">
            <Header/>
            <Intro/>
            <Projects/>
        </div>
    )
}