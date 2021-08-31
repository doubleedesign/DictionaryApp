import styled from 'styled-components';
import { Card, getGlobalStyles, Paragraph } from "grape-ui-react";
const theme = getGlobalStyles();

export const MessageCard = styled(Card)`
	max-width: 600px;
	margin: 0 auto;
	border-color: ${(props: { color:string }) => theme.colors[props.color].base};
	color: ${(props: { color:string }) => theme.colors[props.color].base};
	
	${Paragraph} {
		margin-bottom: 0;
	}
`;