import propTypes from 'prop-types';
import './Button.css';

const Button = ({ handleClick }) => {
    return (
        <div className="buttonContainer">
            <button className='hitbox' onClick={handleClick}>
                <img className='buttonImg' src='https://media.discordapp.net/attachments/653648487707050034/1000481246444540004/gordon_high_res_logo2.png' />
            </button>
        </div>
    );
}

Button.propTypes = {
    handleClick: propTypes.func
};

export default Button;

/**
 * Make grid area have a constrained max area, then
 * Fill the image up to that constraint area
 */