
import '../styles/home.scss';
import Textweet from '../components/posts/Textweet';
import {Col,Placeholder } from 'react-bootstrap';
const Blank = () => {

    return <Col xs={6}  > 
    <div className="accueil">
<div className="accueil__text" > Accueil</div>
   <Textweet></Textweet>
   <Placeholder xs={12} bg="success" />
   </div>
    </Col>   
   
    
};

export default Blank;
