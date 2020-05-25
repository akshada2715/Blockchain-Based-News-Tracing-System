import React, { Component } from 'react';
import Identicon from 'identicon.js';
import ArticleListing from './ArticleListing'
import './App.css'

class Navbar extends Component {
  

  render() {
    var statement = "Unknown"
    if(this.props.account === '0x35555fC7F981cEe05b4f1bDe90dB6f9a8886412D' || this.props.account === '0xDa7E0A8CDaD596F4096a54C01b1eA831AA6a8aCb'){
       statement ="Journalist";
    }
    else if(this.props.account === '0x846b81A8398c8aC69a806Ae1E85d291E5DDA5Fc4' || this.props.account === '0xe857E81E9C5ec4b65C4dEa53548C7cE7A14E1F88'){
      statement = "Editor";
    }
    else if (this.props.account === '0x63047AE4C9BC26D4e424998a25b5c08bc6E8181f' || this.props.account === '0xE4d9263B227121484C680022c0fa35AAb95238F1'){
      statement = "News Agency";
    }
    else{
      statement ="Crowd Auditor";
    }
    return (
      
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse text-white" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto ">
      <li class="nav-item active ">
        <a class="nav-link " href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Profile</a>
      </li>
      <li class="nav-item ">
        <a class="nav-link" href="/#/ArticleListing.js">
          Analytics
        </a>
        </li>
        </ul>
        <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block text-white">
          Welcome {statement}
        
      </li>
    </ul>
  </div>
</nav>
);
      {/*<nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                   <ul className="navbar-nav px-3">
        
        <li className=" nav-item text-nowrap d-none d-sm-none d-sm-block text-white">Home</li>
        
        
        <li  className="nav-item text-nowrap d-none d-sm-none d-sm-block text-white">Profile</li>
        
        <li  className="nav-item text-nowrap d-none d-sm-block text-white">Analytics</li>
        
        </ul>
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          target="_blank"
          href=""
          rel="noopener noreferrer"
        >
          News Tracking and Tracing System
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block text-white">
          Welcome {statement}
           {/* <small className="text-white " >
    <small id="navaccount" >Welcome {statement}</small>
            </small> 
    }
            { this.props.account
              ? <img
                className='ml-2'
                width='30'
                height='30'
                alt="Identicon"
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
              />
              : <span></span>
            }
          </li>
        </ul>*/
          }
    
          }
}

export default Navbar;