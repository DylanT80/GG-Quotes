import './Image.css';
import propTypes from 'prop-types';

const Image = ({ imageSrc }) => {
    return (
        <img className='daredevilImg' src={imageSrc} />
    );
}

Image.propTypes = {
    imageSrc: propTypes.string
};

export default Image;