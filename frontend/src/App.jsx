import {
  Image,
  Quote,
  Button
} from './components';
import useFetch from './hooks/useFetch';
import './App.css';

const App = () => {
  const { data, loading, error } = useFetch('http://localhost:3000/api/quotes/random');
  alert(data);
  return (
      <div className='mainContainer'>

        <div className="imageContainer">
          <Image imageSrc={'https://www.guiltygear.com/ggst/en/wordpress/wp-content/uploads/2020/09/chara@pc.webp'} />
        </div>

        <div className="contentContainer">
          <Quote quote={'Projectiles are bullshit.'} daredevil={'Sol Badguy'} />
          <Button handleClick={handleClick} />
        </div>
        
      </div>
  );
}

export default App
