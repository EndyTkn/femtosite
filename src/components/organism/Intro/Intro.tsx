import React, { useEffect, useState } from "react";
import styles from "./Intro.module.css";
import bg1 from "../../../assets/bg1.png";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpeg";
import { Fade, Slide } from "react-awesome-reveal";
import { IntersectionScreen } from "src/components/atoms/FadeContainer/IntersectionScreen";
import { useInView } from "react-intersection-observer";
import { SlideShow } from "src/components/atoms/SlideShow/SlideShow";

const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

type ContentType = {
    title?: string,
    texts?: string[],
    backgroundImage?: string,
    index?: number
}

const genIntroExample = ({ title, texts, backgroundImage}: ContentType) => {
    return {
        title: title || "Comprometimento",
        texts: texts || [text],
        backgroundImage: backgroundImage || bg1,
    }
}

export const Intro = () => {
    let contents: ContentType[] = [genIntroExample({ backgroundImage: bg1 }), genIntroExample({ backgroundImage: bg2}), genIntroExample({ backgroundImage: bg3 })];
    const {ref, inView, entry} = useInView({threshold: 0.7});
    const [proposalIndex, setProposalIndex] = useState(0);

    const renderProposal = ({ title, texts, index}: ContentType) => {
        return (
            <div key={index} className={styles.proposal}>
                <span>
                    0{index+1}
                </span>
                <h1>
                    {title}
                </h1>
                {texts.map((text, index) => <p key={index}>{text}</p>)}
            </div>
        )
    }
    
    const renderBackground = (background: string, index:number) => {
        const gradient = "linear-gradient(to right,#1D1D1D15 20%,  #1D1D1DCF, #1D1D1DFF),\
                          linear-gradient(to bottom, #1D1D1D 2%, transparent 50%, #1D1D1D)";
        return (
            <div key={index} className={`${styles.bg} ${index===proposalIndex?styles.bgInView:""}`} style={{ backgroundImage: `${gradient}, url(${background})`}}/>
        )
    }

    const renderProposals = (proposals: ContentType[]) => {
        let contents: React.ReactNode[] = [];
        let bgs: React.ReactNode[] = [];
        proposals.forEach((proposal, index) => {
            let content = renderProposal({...proposal, index});
            let background = renderBackground(proposal.backgroundImage, index);
            contents.push(content);
            bgs.push(background);
        })
        
        const proposalsElement = (
            <div className={`${styles.proposals} ${inView ? styles.proposalsInView : ""}`}>
                <div className={`${styles.bgs} ${inView?styles.bgsInView:""}`}>
                    {bgs}
                </div>
                <SlideShow
                    elements={contents}
                    transitionDelay={8000}
                    showOptions
                    className={styles.slideShow}
                    onChange={(index: number) => {
                        setProposalIndex(index);
                    }}
                />
            </div>
        )

        return proposalsElement;
    }

    return (
        <div className={`${styles.container} ${inView ? styles.containerInView:styles.containerOutView}`} ref={ref}>
            <div className={`${styles.introContent} content`}>
                
                <h1 className={`${styles.title} ${inView?styles.titleInView:""}`}>
                    NOSSAS PROPOSTAS E VALORES
                </h1>
                {inView?renderProposals(contents):null}
            </div>
        </div>
    )
}