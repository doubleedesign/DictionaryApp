import styled from 'styled-components';
import {getGlobalStyles} from "grape-ui-react";
const theme = getGlobalStyles();

export const BannerBox = styled.section`
	background-color: #222;
	height: 50vh;
	padding: 1rem 1rem 4rem;
	margin-bottom: 1rem;
	background-size: cover;
	background-position: center center;
	display: flex;
	align-items: flex-end;
	position: relative;
	
	&:before {
		content: '';
		background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
		position: absolute;
		top: 40%;
		left: 0;
		right: 0;
		bottom: 0;
	}
`;