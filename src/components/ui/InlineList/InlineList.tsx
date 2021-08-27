import React, { PropsWithChildren } from 'react';
import { InlineListContainer } from './InlineList.style';

export const InlineList: React.FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<InlineListContainer>
			{children}
		</InlineListContainer>
	)
};

export default InlineList;