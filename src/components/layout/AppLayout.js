import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Stats from '../stats/Stats';


const AppLayout = () => {
    return <div style={{
        padding: '0px 0px 0px 320px',
         display: 'inline-flex'
        
    }}>      
        <Sidebar />
        <Outlet />
        <Stats></Stats>
    </div>
    ;
};

export default AppLayout;
