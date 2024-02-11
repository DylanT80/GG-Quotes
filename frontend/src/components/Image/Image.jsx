import './Image.css';
import propTypes from 'prop-types';

const Image = ({ imageSrc }) => {
    return (
        <>
            <img style={{'--delay': '38ms'}} className='daredevilImgLag animate shadow red' src={imageSrc} />
            <img style={{'--delay': '18ms'}} className='daredevilImgLag animate shadow green' src={imageSrc} />
            <img style={{'--delay': '2ms'}} className='daredevilImgLag animate shadow blue' src={imageSrc} />
            <img className='daredevilImg animate' src={imageSrc} />
        </>
    );
}

Image.propTypes = {
    imageSrc: propTypes.string
};

export default Image;