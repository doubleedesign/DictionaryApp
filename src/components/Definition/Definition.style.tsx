import styled from 'styled-components';
import { Card, getGlobalStyles, Header, List, ListItem, Paragraph } from "grape-ui-react";
const theme = getGlobalStyles();

export const DefinitionCard = styled.article`
	width: 100%;
`;

export const DefinitionCardContent = styled(Card)`

	${Header} {
		font-size: ${theme.fontSize.h4};
		color: ${theme.colors.brandPrimary.base};
		font-weight: bold;
		line-height: 1;
		margin-bottom: 0.5rem;
	}
	
	${List.ol} {
		padding-left: 1rem;
		margin-bottom: 0;
		
		${ListItem} {
			margin-bottom: 0.5rem;
		}
	}
	
	${Paragraph} {
		margin-bottom: 0.5rem;
	}
`;