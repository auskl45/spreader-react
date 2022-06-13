
import '../styles/home.scss';
import Textweet from '../components/posts/Textweet';
import {Col} from 'react-bootstrap';
import Spread from '../components/posts/Spread';
const Blank = () => {

    return <Col xs={6}  > 
    <div className="accueil">
    <div className="accueil__text" > Accueil</div>
   <Textweet></Textweet>
   <Spread></Spread>
   </div>
    </Col>   
   
    
};

export default Blank;
