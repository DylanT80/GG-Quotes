import './App.css'
import {
  Image,
  Quote
} from './components'

function App() {
  return (
      <div className='mainContainer'>

        <div className="imageContainer">
          <Image imageSrc={'https://www.guiltygear.com/ggst/en/wordpress/wp-content/uploads/2020/09/chara@pc.webp'} />
        </div>

        <div className="contentContainer">
          <Quote quote={'Projectiles are bullshit.'} daredevil={'Sol Badguy'} />
        </div>
        
      </div>
  );
}

export default App
