import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

import styles from "./Projects.module.css";
import { IntersectionScreen } from "src/components/atoms/FadeContainer/IntersectionScreen";
import { ProjectContentType, ProjectPresentation, ProjectType } from "./ProjectPresentation";
import licBg from "../../../assets/LIC-bg.png";
import licLogo from "../../../assets/LIC-Logo.png";
import flexBg from "../../../assets/FLEX-bg.png";
import flexLogo from "../../../assets/FLEX-Logo.png";



export type CardType = {
    title?: string,
    subtitle?: string,
    description?: string,
    backgroundImage?: string,
    logo?: string,
    onClick?: Function,
    className?: {},
    style?: {}
}

export const PresentationCard = ({title, subtitle, description, backgroundImage, logo, onClick, className, style = {}}: CardType) => {
    return (
        <div
            onClick={() => {onClick()}}
            style={{backgroundImage: `url(${backgroundImage})`, ...style}}
            className={`${styles.card} ${className?className:""}`}
        >
            <div className={styles.logoContainer}>
                <img src={logo} alt="..." />
            </div>
            <div className={styles.textContainer}>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <p>{description}</p>
            </div>
        </div>
    )    
}

const renderCards = (cards: CardType[]) => {
    return cards.map((card, index) => <PresentationCard key={index} {...card}/>);
}

const projectContentSamples = () => {
    const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
    const licContent: ProjectContentType = {
        image: licBg,
        title: "LIC - Lilvey IoT Cateter",
        text: [text]
    }

    const flexContent: ProjectContentType = {
        image: flexBg,
        title: "Curso FLEX",
        text: [text]
    }

    let projects: ProjectType[] = [{name: "LIC - Lively IoT Cateter", content: [licContent]}, {name: "Curso FLEX", content: [flexContent]}]
    return projects
}

export const Projects = () => {
    const [showProjectPres, setShowProjectPres] = useState(false);
    const [selectedProject, setSelectedProject] = useState(0);

    const {ref, inView} = useInView({threshold: 0.4});
    

    const generateCards = () => {
        const LIC: CardType = {
            backgroundImage: licBg,
            title: "LIC - Lively IoT Cateter",
            subtitle: "Projeto & Pesquisa",
            logo: licLogo,
            onClick: () => {
                setSelectedProject(0);
                setShowProjectPres(true);
            }
        }
        
        const Flex: CardType = {
            backgroundImage: flexBg,
            title: "Cursos Preparatórios FLEX",
            subtitle: "Projeto & Pesquisa",
            logo: flexLogo,
            onClick: () => {
                setSelectedProject(1);
                setShowProjectPres(true);
            }
        }
        
        return [LIC, Flex];
    }
    
    const cardSamples = generateCards();
    const projectContents = projectContentSamples();

    return (
        <div className={`${styles.mainContainer} screen--full`}>
            <IntersectionScreen >
                <div className={`${styles.section} ${styles.header}`}>
                    <div className={`${styles.titleContent}`}>
                        <h1>
                            NOSSOS PROJETOS MAIS RECENTES
                        </h1>
                    </div>
                    <div className={`${styles.section} ${styles.cardsContainer}`} ref={ref}>
                        <div className={`${styles.projects} content`}>
                            {inView ? renderCards(cardSamples) : null}
                        </div>
                    </div>
                    
                    <ProjectPresentation
                        projectList={projectContents}
                        selected={selectedProject}
                        setSelected={setSelectedProject}
                        isEnabled={showProjectPres}
                        setIsEnabled={setShowProjectPres}
                    />
                </div>
            </IntersectionScreen>
        </div>
    )
}