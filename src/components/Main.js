import React, { Component } from 'react';
import Identicon from 'identicon.js';
import './App.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
var statement = "Upload Your File"

class Main extends Component {

  captureFile = (event) => {
    event.preventDefault();
    console.log("File Captured")
    const file = event.target.files[0]
    const reader = new window.FileReader() // converts the file to a buffer
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', Buffer(reader.result))
    }

    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf('.');
    const uploadLabel = document.getElementById("uploadLabel");
    var fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);
    //fileName.concat(".");
    fileName.concat(ext);
    statement = fileName;
    uploadLabel.value = fileName;
  }

  render() {
    return (

      <div className="container-fluid">
<div class="bd-example " >
  <div id="carousel" class="carousel slide" data-ride="carousel">
   
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img id="caroselimg" src={require("/home/akshada/social-network/src/components/images/image6.jpg")} class="d-block w-100" alt="Journalist Page"/>
        <div class="carousel-caption d-none d-md-block d-flex h-100 align-items-center justify-content-center">
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
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
<br/>
<div className="row">

<main role="main" className="col-lg-12 ml-auto mr-auto">
<div class="card text-white bg-dark mb-3 col-lg-12 ml-auto mr-auto" style={{maxWidth: '700px'}}>
  <div class="card-header ml-auto mr-auto">Upload the News Article Here</div>
  <div class="card-body text-white ">
  <form onSubmit={(event) => {
                event.preventDefault()
                const content = this.postContent.value
                const Name = this.articleName.value
                console.log("Submitting the file..")
                ipfs.add(this.state.buffer, (error, result) => {
                  console.log("ipfs")
                  console.log('Ipfs result', result)
                  var filehash = result[0].hash
                  console.log(filehash)
                  
                  
                  this.setState({ filehash })
                  //this.setState({link})
                 // console.log(link)
                  if (error) {
                    console.log(error)
                    return
                  }
                  this.props.createPost(Name, content, filehash)
                })
              }
              }>
              
              <div className="form-group mr-sm-2 bg-transparent text-white" id="bg">
              <ul className="list-group list-group-flush text-white">  
                <li class="list-group-item text-white">
                  <input
                    id="articleName"
                    type="text"
                    ref={(input) => { this.articleName = input }}
                    className="form-control"
                    placeholder="Enter the article Name"
                    required />
                    </li>
                    <br/>
                  <li className="list-group-item text-white">
                  <input
                    id="postContent"
                    type="text"
                    ref={(input) => { this.postContent = input }}
                    className="form-control"
                    placeholder="Enter the article content"
                    required />
                    </li>
                    
                   <br/>
<li className="list-group-item text-white">
                  <div className="custom-file">
                    <input
                    id="fileinput"
                      type="file"
                      className="custom-file-input bg-dark"
                      onChange={this.captureFile}
                    />
                    <label className="custom-file-label bg-dark text-white" id="uploadLabel">
                      {statement}
                      </label>
                  </div>
                  </li>
                  </ul>
                </div>
                <button type="submit" className="btn btn-dark btn-outline-light btn-block">Upload</button>
              </form>
  
  </div>
</div>

       {/* <div className="row">

          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <form onSubmit={(event) => {
                event.preventDefault()
                const content = this.postContent.value
                const Name = this.articleName.value
                console.log("Submitting the file..")
                ipfs.add(this.state.buffer, (error, result) => {
                  console.log("ipfs")
                  console.log('Ipfs result', result)
                  var filehash = result[0].hash
                  console.log(filehash)
                  
                  
                  this.setState({ filehash })
                  //this.setState({link})
                 // console.log(link)
                  if (error) {
                    console.log(error)
                    return
                  }
                  this.props.createPost(Name, content, filehash)
                })
              }
              }>
                <div className="form-group mr-sm-2">
                  <input
                    id="articleName"
                    type="text"
                    ref={(input) => { this.articleName = input }}
                    className="form-control"
                    placeholder="Enter the article Name"
                    required />
                  <input
                    id="postContent"
                    type="text"
                    ref={(input) => { this.postContent = input }}
                    className="form-control"
                    placeholder="Enter the article content"
                    required />

                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      onChange={this.captureFile}
                    />
                    <label className="custom-file-label" id="uploadLabel">
                      {statement}
                      </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Upload</button>
              </form>*/
            }
             
  <div className="content mr-auto ml-auto">

              <br />
              {this.props.posts.map((post, key) => {
                var link="";
                link = "https://ipfs.infura.io/ipfs/"
                link =  link.concat(post.filehash)
                console.log("loop:", link)
                
                return (
                  <div class="card text-white bg-dark mb-3 col-lg-12 ml-auto mr-auto" key={key} id="cardDIV" style={{maxWidth: '700px'}}>
                  <div class="card-header ml-auto mr-auto">News Article {key}</div>
                  <div class="card-body text-white ">
                 {/* <div className="card mb-4" key={key} id="cardDIV" >
                    <div className="card-header">*/}
                    
                      Author  :
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        alt="Identicon"
                        src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                      />
                    
                     <small className="text-white">{post.author}</small>
                    <ul id="postList" className="list-group list-group-flush text-white">
                      <li className="list-group-item text-white">
                        <p>{post.articleName}</p>
                      </li>
                      <li className="list-group-item text-white">
                        <p>{post.content}</p>
                        
                        </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-white">
                          TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                        </small>
                        <a className="btn btn-dark btn-outline-light float-right" href={link} role="button">File Link</a>
                      </li>
                    </ul>
                  </div>
                  </div>
        
                );
              })}
             
            </div>





          </main>
        </div>
      </div >
    );
  }
}

export default Main;