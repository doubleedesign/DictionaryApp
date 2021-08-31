import styled from 'styled-components';
import {getGlobalStyles} from "grape-ui-react";
const theme = getGlobalStyles();

//console.log(theme);

export const ResultListContainer = styled.section`
	max-width: 37.5rem;
	margin: 0 auto 2rem auto;
	position: relative;
	
	.carousel {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		
		div[role="listbox"] {
			order: 2;
			flex-grow: 1;
			
			.carousel__inner-slide {
				display: flex;
				align-items: center;
			}
		}
		
		button {
			background: transparent;
			color: ${theme.colors.brandDark.light};
			border: 0;
			appearance: none;
			font-size: 2rem;
			line-height: 1;
				
			&[aria-label="previous"] {
				justify-content: flex-start;
				order: 1;
				margin-left: -40px;
			}
			
			&[aria-label="next"] {
				justify-content: flex-end;
				order: 3;
				margin-right: -40px;
			}
			
			&:hover, &:focus {
				color: ${theme.colors.brandPrimary.base};
			}
			
			&[disabled] {
				color: ${theme.colors.brandDark.light};
				opacity: 0.25;
				pointer-events: none;
			}
		}
	}
`;