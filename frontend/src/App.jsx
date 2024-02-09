import {
  Image,
  Quote,
  Button
} from './components';
import useFetch from './hooks/useFetch';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [url, setUrl] = useState('http://localhost:3000/api/quotes/random');
  const { data, loading, error } = useFetch(url);

  // useFetch is called again based on url change so alternatively add/remove '/' to url to change it LOL
  const handleClick = () => {
    url.charAt(url.length - 1) === '/' ? setUrl(url.substring(0, url.length - 1)) : setUrl(url.concat('/'));
  }

  return (
      <div className='mainContainer'>

        <div className="imageContainer">
          <Image imageSrc={data?.daredevil.officialArtwork} />
        </div>

        <div className="contentContainer">
          <Quote 
            data={data}
            loading={loading}
          />
          <Button handleClick={handleClick} />
        </div>
        
      </div>
  );
}

export default App
