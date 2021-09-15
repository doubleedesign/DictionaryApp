import styled from 'styled-components';
import { Form, Button, getGlobalStyles, Progress } from "grape-ui-react";
const theme = getGlobalStyles();

export const SearchForm = styled(Form)`
	width: 100%;
	max-width: 600px;
	margin: 0 auto;
	position: relative;
	
	* {
		background: transparent;
	}
	
	.progressWrapper { // hack because ${Progress} doesn't work here
		position: absolute;
		bottom: 17px;
		left: 1px;
		right: 1px;	
	}
	
	{$TextField} {
		color: white;
		
		label {
			top: -0.6rem;
		}
		
		input {
			border-color: white;
			background: rgba(0,0,0,0.5);
			box-shadow: 0 0 1rem black;
		}
	}
	
	${Button} {
		position: absolute;
		top: 0.25rem;
		right: 0;
		bottom: 1rem;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 2rem;
		line-height: 0;
	}
	
	&:focus-within {
	
		label {
			color: white;
		}
	
		input {
			box-shadow: 0 0 1rem white;
			border-color: white;
		}
	}
`;