import React from 'react';
import { Paragraph } from 'grape-ui-react';
import { MessageCard } from './Message.style';

export interface MessageProps {
	color: string,
	text: string
}

export const Message: React.FC<MessageProps> = function(props: {
	color: string,
	text: string
}) {

	return (
		<MessageCard color={props.color}>
			<Paragraph>{props.text}</Paragraph>
		</MessageCard>
	)

}

export default Message;