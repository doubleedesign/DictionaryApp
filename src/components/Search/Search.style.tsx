import styled from 'styled-components';
import { Form, Button, getGlobalStyles } from "grape-ui-react";

const theme = getGlobalStyles();

export const SearchForm = styled(Form)`
	max-width: 600px;
	margin: 2rem auto;
	position: relative;
	
	${Button} {
		position: absolute;
		top: 0.25rem;
		right: 0;
		bottom: 1rem;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		line-height: 0;
	}
	
	&:focus-within {
		
		${Button} {
			color: ${theme.colors.brandPrimary.base};
		}
	}
`;