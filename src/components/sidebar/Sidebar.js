import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Col } from 'react-bootstrap';

import './sidebar.scss';

const sidebarNavItems = [
    {
        display: 'Accueil',
        icon: <i className='bx bx-home'></i>,
        to: '/',
        section: ''
    },
    {
        display: 'Explorer',
        icon: <i className='bx bx-hash'></i>,
        to: '/started',
        section: 'started'
    },
    {
        display: 'Notifications',
        icon: <i className='bx bx-bell'></i>,
        to: '/calendar',
        section: 'calendar'
    },
    {
        display: 'Messages',
        icon: <i className='bx bx-message'></i>,
        to: '/user',
        section: 'user'
    },
    {
        display: 'Signets',
        icon: <i className='bx bx-save'></i>,
        to: '/order',
        section: 'order'
    },
    {
        display: 'Listes',
        icon: <i className='bx bx-receipt'></i>,
        to: '/listes',
        section: 'listes'
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return  <Col xs={4}> 
        <div className="sidebar__logo">
            Spreader
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {sidebarNavItems.map((item, index) => (
                <Link to={item.to} key={index}>
                    <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                        <div className="sidebar__menu__item__icon">
                            {item.icon}
                        </div>
                        <div className="sidebar__menu__item__text">
                            {item.display}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
  
   
    </Col>
  
    ;
};

export default Sidebar;
