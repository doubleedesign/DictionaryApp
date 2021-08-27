import React from 'react';
import { Header, Paragraph, List, ListItem } from 'grape-ui-react';
import { DefinitionCard, DefinitionCardContent } from './Definition.style';

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

	return (
		<DefinitionCard>
			<DefinitionCardContent>
				<Header>{props.word}</Header>
				<Paragraph>{props.type} {props.date ? props.date : null}</Paragraph>
				<List.ol>
					{props.definitions.map((definition, index) => (
						<ListItem key={index}>{definition}</ListItem>
					))}
				</List.ol>
			</DefinitionCardContent>
		</DefinitionCard>
	)
}

export default Definition;