import './Quote.css';
import propTypes from 'prop-types';

const Quote = ({ quote, daredevil }) => {
    return (
        <div className="quotesContainer">
            <p className="quote">{quote}</p>
            <p className="daredevil"><i>{daredevil}</i></p>
        </div>
    );
}

Quote.propTypes = {
    quote: propTypes.string,
    daredevil: propTypes.string
};


export default Quote;