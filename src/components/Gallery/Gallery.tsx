import React from 'react';
import { ImageGrid, ImageItem } from "../Gallery/Gallery.style";

export interface GalleryProps {
	images: object
}

export const Gallery: React.FC<GalleryProps> = function(props: {
	images: object
}) {

	return (
		<ImageGrid>
			{Object.entries(props.images).map(([key, imageData]) => {
				return (
					<ImageItem key={key}>
						<img src={imageData.urls.thumb} alt={imageData.alt_description} />
					</ImageItem>
				)
			})}
		</ImageGrid>
	)
}

export default Gallery;