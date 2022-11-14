import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loader/Loader";
import React from "react";
import { Modal } from "components/Modal/Modal";
import { GalleryContainer } from "./ImageGallery.styled";
import PropTypes from 'prop-types';

class ImageGallery extends React.Component {

    state = {
        query: [],
        loading: false,
        showModal: false,
        modalImg: null,
    }

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }))
    }

    onImgClick = id => {
        const clickedImg = this.state.query.find(object => object.id === id);
        this.setState({ modalImg: clickedImg });
        this.toggleModal();
    };

    componentDidUpdate(prevProps, prevState) {

        if(prevProps.input !== this.props.input || prevProps.page !== this.props.page) {
            this.setState({loading: true})

            fetch(`https://pixabay.com/api/?q=${this.props.input}&page=${this.props.page}&key=29632801-66d18c979cc1b04cff9f90142&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response => response.json())
            .then(query => {
                if(prevProps.input !== this.props.input) {
                    this.setState({
                        query: query.hits,
                        loading: false,
                    })
                }
                
                if(prevProps.input === this.props.input) {
                    this.setState(prevState => ({
                        query: [...prevState.query, ...query.hits],
                        loading: false,
                    }))
                }
            })
            }
    }

    render() {
        return(
            <>
            <GalleryContainer>
                {this.state.query.map(({id, webformatURL, tags}) => (
                    <ImageGalleryItem
                    key={id}
                    id={id}
                    url={webformatURL}
                    title={tags}
                    onImgClick={this.onImgClick}
                    />
                ))}
                {this.state.loading && <Loader />}
            </GalleryContainer>
            {this.state.showModal && (
                <Modal onClose={this.toggleModal}>
                    <img src={this.state.modalImg.largeImageURL} alt={this.state.modalImg.tags} />
                </Modal>
            )}
            </>
        )
    }

}

export {ImageGallery}

ImageGallery.propTypes = {
    page: PropTypes.number.isRequired,
    input: PropTypes.string.isRequired,
};