import React, { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";
import { SlideShow } from "src/components/atoms/SlideShow/SlideShow";
import styles from "./ProjectPresentation.module.css";

export type ProjectContentType = {
    title: string,
    text: string[],
    image: string
}

export type ProjectType = {
    name: string,
    content: ProjectContentType[]
}

const ProjectContent = ({ title, image, text }: ProjectContentType) => {
    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.contentImg}`} style={{backgroundImage: `url(${image})`}}></div>
            <div className={`${styles.contentText}`}>
                <h1>
                    {title}
                </h1>
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}

const renderProjectsContent = (contents: ProjectContentType[]) => {
    return contents.map((content, index) => <ProjectContent key={index} {...content} />);
}

export type ProjectPresentation = {
    projectList: ProjectType[],
    isEnabled: boolean,
    selected: number,
    setSelected: Function,
    setIsEnabled: Function
}


export const ProjectPresentation = ({ projectList, isEnabled = false, setIsEnabled, selected, setSelected }: ProjectPresentation) => {
    const { ref, inView } = useInView({ threshold: 0.8 });

    const renderNavigationOptions = (options: string[]) => {
        return options.map((name, index) =>
            <a key={index} onClick={() => { setSelected(index) }} className={`${styles.option} ${selected == index ? styles.selectedOpt : ""}`}>{name}</a>)
    }

    if (!isEnabled)
        return <></>

    return (
        <div
            ref={ref}
            className={
                `${styles.projectContainer} \
                ${styles.projectCtnInView}`
            }
        >
            <div className={`content ${styles.projectContent}`}>
                <button
                    className={`${styles.closeButton}`}
                    onClick={() => {
                        setIsEnabled(false);
                    }}
                >
                    close
                </button>
                <div className={`${styles.navigation}`}>
                    <h1>
                        NOSSOS OUTROS PROJETOS
                    </h1>
                    <div className={styles.options}>
                        {renderNavigationOptions(projectList.map(proj => proj.name))}
                    </div>
                </div>
                {inView ?
                    <SlideShow
                        elements={renderProjectsContent(projectList[selected].content)}
                        className={`${styles.contentSlider}`}
                        transitionDelay={8000}
                    /> : null}
            </div>
        </div>
    )
}