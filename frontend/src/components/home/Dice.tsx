import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

interface DiceProps {
    value: number;
} 

const Dice:React.FC<DiceProps> = ({value}) => {

    const dice = useRef<HTMLDivElement>(null);
    const faces = [value, ...gsap.utils.shuffle([1, 2, 3, 4, 5, 6].filter(v => v !== value))];

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(dice.current, {
				rotationX: 'random(720, 1080)',
				rotationY: 'random(720, 1080)',
				rotationZ: 0,
				duration: 'random(2, 3)'
			})
		}, dice)
		return () => ctx.revert()
	}, [value])
	
	return (
		<div className="dice-container">
			<div className="dice" ref={dice}>
				{faces.map((value, index) => (
					<div className="face" key={index}>{value}</div>
				))}
			</div>
		</div>
	)
}

export default Dice