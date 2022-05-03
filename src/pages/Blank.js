
import '../styles/home.scss';
import Textweet from '../components/posts/Textweet';
import {Col } from 'react-bootstrap';
const Blank = () => {
    return <Col xs={4}> 
<div > Accueil</div>
   <Textweet></Textweet>
    </Col>   
    
};

export default Blank;
