import React, { PropsWithChildren } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { ResultListContainer } from './ResultList.style';
import { FaAngleLeft, FaAngleRight } from "react-icons/all";

export const ResultList: React.FC<PropsWithChildren<{}>> = ({ children }) => {

	return (
		<ResultListContainer>
			<CarouselProvider
				naturalSlideWidth={100}
				naturalSlideHeight={40}
				totalSlides={React.Children.count(children)}
			>
				<Slider>
					{React.Children.map(children, (child: any, index) => {
						return <Slide index={index}>{React.cloneElement(child)}</Slide>
					})}
				</Slider>
				<ButtonBack><FaAngleLeft/></ButtonBack>
				<ButtonNext><FaAngleRight/></ButtonNext>
			</CarouselProvider>
		</ResultListContainer>
	)
};

export default ResultList;