import React, {useEffect, useState} from "react";
import Logo from "./Logo";
import './Background.scss';

const EFFECTS = [
    { bubbleClassName: 'logo__bubble--fill-primary'}
];
const getRandomEffectClasses = () => {
    return EFFECTS[Math.floor(Math.random() * EFFECTS.length)]
}

const ELEMENTS_LENGTH = 56;

const getRandomNumbers = () => {
    const numbers = [...Array(ELEMENTS_LENGTH)].map((_,i) => i);

    const randomNumbers = [];

    const randomNumbersCount = 4 + Math.floor(Math.random() * 6);
    for (let i = 0; i < randomNumbersCount; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        let spliceIndex = randomIndex > 0 ? randomIndex - 1 : 0;

        const removedElements = numbers.splice(spliceIndex, 3);
        randomNumbers.push(removedElements[1]);
    }

    return randomNumbers;
}

const Background = () => {
    const [randomNumbers, setRandomNumbers] = useState(getRandomNumbers());

    useEffect(() => {
        const timer = setInterval(() => {
            setRandomNumbers(getRandomNumbers());
        }, 4000);
        return () => clearInterval(timer);
    }, [randomNumbers])

    const randomClass = getRandomEffectClasses();

    const getLogo = (i: number) => {
        if (randomNumbers.includes(i)) {
            return <Logo {...randomClass} />
        }
        return <Logo />
    }

    return (
        <div className="background">
            {[...Array(ELEMENTS_LENGTH)].map((_, i) => <div key={`logo-${i}`}>{ getLogo(i) }</div>)}
        </div>
    );
}

export default Background;