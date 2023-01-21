import React, { useState } from "react";
import { useInView, IntersectionOptions } from "react-intersection-observer";

import styles from "./IntersectionScreen.module.css"


export type FadableScreenType = {
    children: React.ReactNode,
    className?: "",
    style?: {},
    props?: {},
    options?: IntersectionOptions
    transitionTime?: string,
}

export const IntersectionScreen = ({children, transitionTime = "1s", className, props, style, options = {threshold: 0.5}}: FadableScreenType) => {
    const { ref, inView, entry} = useInView(options);
    return (
        <div {...props}
            style={{transition: transitionTime, ...style}}
            className={`${className?className:""} ${styles.screen} ${inView?styles.inView:""}`}
            ref={ref}
        >
            {inView?children:null}
        </div>
    )
}