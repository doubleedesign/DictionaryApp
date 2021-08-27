import styled from 'styled-components';
import { ListItem } from 'grape-ui-react';
import { GrHistory } from "react-icons/gr";

export const InlineListContainer = styled.ul`
	padding: 0;
	margin: 0.25rem 0 0.5rem 0;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	
	${ListItem} {
		list-style: none;
		margin-right: 1rem;
		display: inline-flex;
		align-items: center;
		
		svg {
			display: inline-block;
			margin-right: 0.25rem;
		}
	}
`
