import styled from 'styled-components';
import { ListItem, Button, getGlobalStyles } from 'grape-ui-react';
const theme = getGlobalStyles();

export const InlineListContainer = styled.ul`
	padding: 0;
	margin: 0.25rem 0 0.5rem 0;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-items: center;
	
	${ListItem} {
		list-style: none;
		margin-right: 0.5rem;
		display: inline-flex;
		align-items: center;
		
		${Button} {
			border: 1px solid ${theme.colors.brandSecondary.base};
			color: ${theme.colors.brandSecondary.base};
			opacity: 0.5;
			border-radius: 1rem;
			margin: 0;
			transition: all 0.2s ease;
			text-transform: lowercase;
			font-size: 0.75rem;
			line-height: 1.4;
			
			&:hover, &:focus {
				background: ${theme.colors.brandSecondary.base};
				color: white;
				opacity: 1;
			}
		}
	}
`
