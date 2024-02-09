import './Quote.css';
import propTypes from 'prop-types';

const Quote = ({ data, loading }) => {
    return (
        <div className="quotesContainer">
            {loading ? (
                <p>here comes daredevil...</p>
            ) : (
                <>
                    <p className="quote">{data?.quote}</p>
                    <p className="daredevil"><i>{data?.daredevil.firstName + ' ' + data?.daredevil.lastName}</i></p>
                </>
            )}
        </div>
    );
}

Quote.propTypes = {
    data: propTypes.object,
    loading: propTypes.bool
};


export default Quote;