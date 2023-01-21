import React, { useEffect, useRef } from "react"
import styles from "./Team.module.css";
import Team1 from "../../../assets/team1.png"
import Team2 from "../../../assets/team2.png"
import Team3 from "../../../assets/team3.png"
import { IntersectionScreen } from "src/components/atoms/FadeContainer/IntersectionScreen";

export type CardType = {
    title: string,
    subtitle: string,
    image: string,
    onClick: Function
}

const Card = ({ title, subtitle, image, onClick }: CardType) => {
    return (
        <div className={styles.card} style={{ backgroundImage: `url(${image})` }} onClick={() => onClick()}>
            <h2>
                {title}
            </h2>
            <h3>
                {subtitle}
            </h3>
        </div>
    )
}

const renderCards = (cards: CardType[]) => {
    return cards.map((card: CardType, index: number) => {
        return <Card {...card} key={index} />
    })
}

const generateCards = () => {
    let cards: CardType[] = [];
    let images = [Team1, Team2, Team3];
    let titles = ["Amanda Serique", "Lucas Migliorim", "Roberto Alves Neto"];
    let subtitles = ["Desenvolvedora", "Tester", "Morador"];

    for (let i = 0; i < 20; i++) {
        let pos = i % images.length;
        let newCard: CardType = {
            image: `${images[pos]}`,
            title: titles[pos],
            subtitle: subtitles[pos],
            onClick: () => { },
        }
        cards.push(newCard)
    }
    return cards;
}

const autoScroll = (div: HTMLElement) => {
    
    div.scrollTo(0, div.scrollHeight);
}

export const Team = () => {
    const cards = generateCards();
    
    return (
        <div className={`${styles.container}`}>
            <div className={`content ${styles.teamContent}`}>
                <div className={`${styles.textContainer}`}>
                    Our Staff
                </div>
                <div className={`${styles.cardsContainer}`}>
                    {renderCards(cards)}
                </div>
            </div>
        </div>
    )
}