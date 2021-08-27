import React, { PropsWithChildren } from 'react';
import { ResultListContainer } from './ResultList.style';

export const ResultList: React.FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<ResultListContainer>
			{children}
		</ResultListContainer>
	)
};

export default ResultList;