import React from 'react';
import { Header, List, ListItem, Paragraph } from 'grape-ui-react';
import InlineList from '../ui/InlineList/InlineList';
import { DefinitionCard, DefinitionCardContent } from './Definition.style';

export interface DefinitionProps {
	word: string,
	type: string,
	date?: string,
	definitions: string[],
	synonyms: []
}

export const Definition: React.FC<DefinitionProps> = function(props: {
	word: string,
	type: string,
	definitions: string[],
	synonyms: [][]
}) {

	return (
		<DefinitionCard>
			<DefinitionCardContent>
				<Header sm>{props.word}</Header>
				<InlineList>
					<ListItem sm>{props.type}</ListItem>
				</InlineList>
				<List.ol>
					{props.definitions.map((definition, index) => (
						<ListItem key={index} sm>
							<Paragraph sm>{definition}</Paragraph>
							{props.synonyms[index] ?
								<InlineList>
									{(props.synonyms[index].slice(0,5)).map((synonym, index) => (
										<ListItem key={index}>{synonym}</ListItem>)
									)}
								</InlineList>
							: null }
						</ListItem>
					))}
				</List.ol>
			</DefinitionCardContent>
		</DefinitionCard>
	)
}

export default Definition;