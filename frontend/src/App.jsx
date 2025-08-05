import {
  Image,
  Quote,
  Button
} from './components';
import useFetch from './hooks/useFetch';
import './App.css';

const App = () => {
  const url = `${import.meta.env.VITE_API_URL}/api/quotes/random`;
  const { data, loading, error, refetch } = useFetch(url);

  // useFetch is called again based on url change so alternatively add/remove '/' to url to change it LOL
  const handleClick = () => {
    refetch();
  }

  return (
      <div className='mainContainer'>

        <div className="imageContainer">
          <Image key={data} imageSrc={data?.daredevil.officialArtwork} />
        </div>

        <div className="contentContainer">
          <Quote 
            data={data}
            loading={loading}
          />
        </div>

        <div className="buttonContainer">
          <Button handleClick={handleClick} />
        </div>
        
      </div>
  );
}

export default App
