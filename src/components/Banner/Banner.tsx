import React, {PropsWithChildren} from 'react';
import {BannerBox} from "./Banner.style";

export interface BannerProps {
	imageURL: string
}

export const Banner: React.FC<PropsWithChildren<BannerProps>> = ({
	children,
	imageURL
}) => (

	<BannerBox style={{backgroundImage: `url(${imageURL ? imageURL : ""})`}}>
		{children}
	</BannerBox>
)

export default Banner;