import {Row} from 'react-bootstrap';
import Sidebar from "../sidebar/Sidebar";
import Stats from '../stats/Stats';
import Blank from "../../pages/Blank";


const AppLayout = () => {
    return <div>  
        <Row>
        <Sidebar />
        <Blank/>
        <Stats></Stats>
        </Row>    
    </div>
    ;
};

export default AppLayout;
