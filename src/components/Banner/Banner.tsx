import React, {PropsWithChildren} from 'react';
import {BannerBox} from "./Banner.style";

export interface BannerProps {
	imageURL: string
	hasResults: boolean
}

export const Banner: React.FC<PropsWithChildren<BannerProps>> = ({
	children,
	imageURL,
	hasResults
}) => (

	<BannerBox style={{backgroundImage: `url(${imageURL ? imageURL : ""})`}} data-results={hasResults}>
		{children}
	</BannerBox>
)

export default Banner;