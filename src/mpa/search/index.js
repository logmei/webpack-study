'use strict'
import React from 'react';
import ReactDom from 'react-dom';
import './search.scss';
import './search.css';
import './search.less';
import image from './images/user-image.png';
import logo from './images/logo.png';
class Search extends React.Component {
    render(){
        return <div>
            <div className='search-class-css'>Search Css Test1</div>
            <div className='search-class-less'>Search Less Test1</div>
            <div className='search-class-scss'>Search Scss Test1</div>
            <img src={image}></img>
            <img src={logo}></img>
            </div>
    }
}

ReactDom.render(
    <Search/>,
    document.getElementById('root')
)