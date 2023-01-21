import React from "react";
import styles from "./Header.module.css";

export const Header = () => {
    return (
        <div className={`${styles.header}`}>
            <div className={`content`}>
                <h1>PROJETO &<br/>DESENVOLVIMENTO</h1>
            </div>
        </div>
    )
};