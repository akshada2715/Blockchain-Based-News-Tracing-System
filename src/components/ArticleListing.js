import React, { Component } from 'react';
import Identicon from 'identicon.js';
import './ArticleListing.css';


class ArticleListing extends Component {

warning(id){
    id=id-1
   // console.log(id)
   // console.log(this.props.posts[id])
    var post = this.props.posts[id]
    if(post.id !== post.prevId){
      return(
        <li className=" list-group-item-warning">
          The article file has been modified. 
  
         
          </li>
      )
    }
    
  }
  
  displayGreen(id){
    var post = this.props.posts[id]
    if(post.trueCount >= 2){
      return(
        <li className="list-group-item-success">
          This aticle is termed as "AUTHENTIC"
          </li>
      )
    }
    else if(post.fakeCount >= 2){
      return(
        <li className="list-group-item-danger">
          This aticle is termed as "FAKE" 
          </li>
      )
    }
  }

  render() {
    var currentId =0;
    return (
      <div className="container-fluid">
      <div class="bd-example " >
      <div id="carousel" class="carousel slide" data-ride="carousel">

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img id="caroselimg" src={require("/home/akshada/social-network/src/components/images/image6.jpg")} class="d-block w-100" alt="Article Listing Page" />
            <div class="carousel-caption d-none d-md-block d-flex h-100 align-items-center justify-content-center">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <font color="black">
                <b><h2>News Tracking and Tracing System Using Blockchain</h2></b>

                <h5>The News Tracking and Tracing System is built using</h5><h5> Ethereum, Ganache, Truffle and IPFS.
      </h5>
              </font>
            </div>



          </div>
        </div>

      </div>
    </div>
    </div>
    );
    }
}
export default ArticleListing;