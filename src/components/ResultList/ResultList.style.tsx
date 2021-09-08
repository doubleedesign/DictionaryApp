import styled from 'styled-components';
import {getGlobalStyles} from "grape-ui-react";
const theme = getGlobalStyles();

export const ResultListContainer = styled.section`
	max-width: 37.5rem;
	margin: 0 auto 2rem auto;
	position: relative;
	
	.carousel {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 12px;
		
		div[role="listbox"] {
			order: 2;
			flex-grow: 1;
			
			.carousel__inner-slide {
				display: flex;
				align-items: center;
			}
		}
		
		button {
			border: 0;
			appearance: none;

			&[aria-label="previous"],
			&[aria-label="next"] {
				background: transparent;
				color: ${theme.colors.brandDark.light};
				font-size: 2rem;
				line-height: 1;
			
				&:hover, &:focus {
					color: ${theme.colors.brandPrimary.base};
				}
				
				&[disabled] {
					color: ${theme.colors.brandDark.light};
					opacity: 0.25;
					pointer-events: none;
				}
			}
				
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

			&[aria-label="slide dot"] {
				display: block;
				width: 0.5rem;
				height: 0.5rem;
				border-radius: 0.5rem;
				margin: 2px;
				background: ${theme.colors.brandDark.light};
				
				&[disabled] {
					background: ${theme.colors.brandPrimary.base};
				}
			}
		}
		
		&__dot-group {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			justify-content: center;
		}
	}
`;