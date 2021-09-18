import React, {FC, useRef} from 'react';
import './Title.scss';
import {CSSTransition} from "react-transition-group";
import {useStore} from "../state";

const Title: FC = () => {
    const nodeRef = useRef(null);
    const { title, showTitle } = useStore(state => ({ title: state.title, showTitle: state.showTitle }));

    return (
        <CSSTransition
            classNames={{
                enterActive: 'title--enter',
                enterDone: 'title--active',
                exit: 'title--exit'
            }}
            className="title"
            in={showTitle}
            timeout={{
                enter: 0, // mount instantly
                exit: 1000 // unmount once css animation is finished
            }}
            nodeRef={nodeRef}
            unmountOnExit
        >
            <div ref={nodeRef}>
                <div className="title__square" />
                <div className="title__wrapper">
                    <div className="title__label">{title}</div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default Title;