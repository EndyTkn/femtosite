import React from "react";
import styles from "./Navbar.module.css";

export const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={`${styles.provisorio}`}>
                <div className={`${styles.menu}`}>
                    <a>Home</a>
                    <a>Intro</a>
                    <a>Products</a>
                    <a>Team</a>
                </div>
            </div>
        </div>
    )
}