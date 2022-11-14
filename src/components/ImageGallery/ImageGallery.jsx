import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loader/Loader";
import {useState, useEffect} from "react";
import Modal from "components/Modal/Modal";
import { GalleryContainer } from "./ImageGallery.styled";
import PropTypes from 'prop-types';

export default function ImageGallery({page, input}) {

    const [query, setQuery] = useState([])
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalImg, setModalImg] = useState(null)

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const onImgClick = id => {
        const clickedImg = query.find(object => object.id === id);
        setModalImg(clickedImg)
        toggleModal();
    };

    useEffect(() => {
        if (input === '') {
            return;
        }

        if (page === 1) {
            setQuery([]);
        }

        setLoading(true)
        fetch(`https://pixabay.com/api/?q=${input}&page=${page}&key=29632801-66d18c979cc1b04cff9f90142&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => response.json())
        .then(query => {
            setQuery(prevState => [...prevState, ...query.hits])
            setLoading(false)
        })
    }, [page, input])


        return(
            <>
            <GalleryContainer>
                {query.map(({id, webformatURL, tags}) => (
                    <ImageGalleryItem
                    key={id}
                    id={id}
                    url={webformatURL}
                    title={tags}
                    onImgClick={onImgClick}
                    />
                ))}
                {loading && <Loader />}
            </GalleryContainer>
            {showModal && (
                <Modal onClose={toggleModal}>
                    <img src={modalImg.largeImageURL} alt={modalImg.tags} />
                </Modal>
            )}
            </>
        )
}


ImageGallery.propTypes = {
    page: PropTypes.number.isRequired,
    input: PropTypes.string.isRequired,
};