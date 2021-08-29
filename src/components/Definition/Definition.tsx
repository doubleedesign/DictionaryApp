import React from 'react';
import { Header, List, ListItem } from 'grape-ui-react';
import InlineList from '../ui/InlineList/InlineList';
import { DefinitionCard, DefinitionCardContent } from './Definition.style';
import { GrHistory } from "react-icons/gr";

export interface DefinitionProps {
	word: string,
	type: string,
	date?: string,
	definitions: string[]
}

export const Definition: React.FC<DefinitionProps> = function(props: {
	word: string,
	type: string,
	date?: string,
	definitions: string[]
}) {

	const DateOutput = () => {
		return (
			<React.Fragment>
				<GrHistory/>
				{props.date}
			</React.Fragment>
		)
	}

	return (
		<DefinitionCard>
			<DefinitionCardContent>
				<Header sm>{props.word}</Header>
				<InlineList>
					<ListItem sm>{props.type}</ListItem>
					{props.date ?  <ListItem sm><DateOutput/></ListItem>  : null}
				</InlineList>
				<List.ol>
					{props.definitions.map((definition, index) => (
						<ListItem key={index} sm>{definition}</ListItem>
					))}
				</List.ol>
			</DefinitionCardContent>
		</DefinitionCard>
	)
}

export default Definition;