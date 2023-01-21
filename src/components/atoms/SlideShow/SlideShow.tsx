import React, { useEffect, useRef, useState } from "react";
import styles from "./SlideShow.module.css";

enum directionTypes { "vertical", "horizontal" };

type SlideShowProps = {
    elements: React.ReactNode[],
    transitionDelay?: number,
    direction?: keyof typeof directionTypes,
    className?: {},
    style?: {},
    onChange?: Function,
    showOptions?: boolean
}

export const SlideShow = ({ elements: elements, transitionDelay = 3000, direction = "horizontal", onChange, className, style = "", showOptions = false }: SlideShowProps) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            if (onChange)
                onChange(slideIndex);
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();

        timeoutRef.current = setTimeout(() => {
            setSlideIndex((slideIndex + 1) % (elements.length));
        }, transitionDelay)

        return () => {
            resetTimeout();
        }
    }, [slideIndex]);

    const handleDirection = (direction: string) => {
        if (direction === "vertical")
            return `translateY(${-slideIndex * 100}%)`

        return `translateX(${-slideIndex * 100}%)`
    }
    let transform = handleDirection(direction);

    return (
        <div
            className={`${styles.slideShow} ${className ? className : ""}`}
            style={{ flexDirection: direction == "vertical" ? "column" : "row", ...style }}
        >
            <div className={`${styles.slidesContainer} ${!showOptions?"height--100":""}`}>
                {elements.map((child: React.ReactNode, index: number) => {
                    return (
                        <div
                            className={styles.slideElement}
                            key={index}
                            style={{ transform }}
                        >
                            {child}
                        </div>
                    )
                })}
            </div>
            {showOptions?
            <div className={styles.options}>
                {elements.map((_, index) => {
                    return (
                        <div
                            key={index}
                            className={`${styles.option} ${index===slideIndex?styles.optionActive:""}`}
                            onClick={() => {
                                setSlideIndex(index);
                            }}
                        />
                    )
                })}
            </div>
            :null}
        </div>
    )
}
