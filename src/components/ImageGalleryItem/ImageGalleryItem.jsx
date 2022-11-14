import React from "react";
import { ImageContainer, Image } from "./ImageGalleryItem.styled";
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({url, title, id, onImgClick}) => {
    return (
        <ImageContainer onClick={() => {
            onImgClick(id);
            }}>
            <Image src={url} alt={title} width={400} />
        </ImageContainer>
    )
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onImgClick: PropTypes.func.isRequired,
};