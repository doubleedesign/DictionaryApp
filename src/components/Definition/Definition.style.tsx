import styled from 'styled-components';
import { Card, getGlobalStyles, Header, List, Paragraph } from "grape-ui-react";
const theme = getGlobalStyles();
//console.log(theme);

export const DefinitionCard = styled.article`
	width: 100%;
`;

export const DefinitionCardContent = styled(Card)`

	${Header} {
		font-size: ${theme.fontSize.h4};
		line-height: 1;
		margin-bottom: 0.5rem;
	}
	
	${List.ol} {
		padding-left: 1rem;
		margin-bottom: 0;
	}
	
	${Paragraph} {
		margin-bottom: 0.5rem;
	}
`;