import styled from 'styled-components';

export const ImageGrid = styled.section`
	display: flex;
	flex-wrap: nowrap;
	margin-top: 1rem;
`;

export const ImageItem = styled.div`
	width: 20%;
	flex-basis: 20%;
	height: 10rem;
	overflow: hidden;
	
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
	}
`;