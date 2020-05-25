import React, { Component } from 'react';
import Identicon from 'identicon.js';
import './CrowdAuditor.css';

class CrowdAuditor extends Component {

 
 addRow(id) {
  var arrHead = new Array();
  arrHead = ['ID', 'Title', 'Content','FileUploaded', 'Author Address'];
  var traceTable = document.getElementById('tracingTable');
  var rowCnt = traceTable.rows.length;  
  var tr = traceTable.insertRow(rowCnt);  
  var _id = id;
  var post = this.props.posts[_id];

  for (var c = 0; c <arrHead.length; c++) {
      var td = document.createElement('td'); 
               // TABLE DEFINITION.
      td = tr.insertCell(c);
      

      if (c === 0) {           // FIRST COLUMN.
        td.innerHTML = post.id; 
      }
      else if(c === 1) {
        td.innerHTML = post.articleName;
      }
      else if(c === 2){
        td.innerHTML = post.content;
  
      }
      else if(c === 3){  
        var link = "";
            link = "https://ipfs.infura.io/ipfs/";
            link = link.concat(post.filehash);
            td.innerHTML=  '<a  className="btn btn-link" href="'+link+'">File Link</a>';
      }
      else {
        td.innerHTML = post.author;
      
      }
  }

}

displayTable(id){
  var x = document.getElementById("myDIV");
  x.style.display = "table";
  var _id = id-1;
  console.log(_id);
  var post = this.props.posts[_id];
  console.log(post);
  var prev = post.prevId;
  console.log(prev);
  
  while(post.id !== post.prevId){
    this.addRow(_id);
    _id=post.prevId-1;
    post = this.props.posts[_id];
  }
  this.addRow(_id);
}

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
            <img id="caroselimg" src={require("/home/akshada/social-network/src/components/images/image6.jpg")} class="d-block w-100" alt="Editor Page" />
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
    <br/>
          <div className="row">
            <div className="col order-1">
            <main
              role="main"
              className="col-lg-12"
              
            >
          
                {this.props.posts.map((post, key) => {
                  if(post.approvalStatus === true){
                    var link = "";
            link = "https://ipfs.infura.io/ipfs/"
            link = link.concat(post.filehash)
                

                  return (
                    <div class="card text-white bg-dark mb-3 col-lg-12 " key={key} id="cardDIV" style={{ maxWidth: '700px' }}>
                    <div class="card-header">News Article {key}</div>
                    <div class="card-body text-white ">
                        Author :
                        <img
                          className='mr-2 text-white'
                          width='30'
                          height='30'
                          alt ="identicon "
                          src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                        />
                        
                        <small className="text-white">{post.author}</small>
                        <button
                          type = "button"
                            className=" btn btn-dark btn-outline-light float-right"
                            name={post.id}
                            onClick={(event) => {
                              var currentId=0;
                             currentId = event.target.name
                             this.displayTable(currentId)
                            }
                            }
                          >
                            Trace Post
                          </button>
                  
                      <ul id="postList" className="list-group ">
                        {this.displayGreen(key)}
                        <br/>
                      {this.warning(key+1) }
                      <br/>
                        <li className="list-group-item text-white">
                          <p>{post.articleName}</p>
                        </li>
                        <li className="list-group-item text-white">
                          <p>{post.content}</p>
                        </li>
                      
                            <a className="btn btn-dark btn-outline-light btn-block" href={link} role="button">Click here to see the File uploaded for the article</a>
                          
                        <li className="list-group-item text-white">
                          <p className="float-right text-white">FAKECOUNT : {post.fakeCount} </p>
                          <p className="float-left text-white">TRUECOUNT : {post.trueCount} </p>
                        </li>
                       
                      </ul>
                      <br/>
                        
                          <button
                            className="btn btn-success btn-outline-light float-left "
                            name={post.id}
                            onClick={(event) => {
                              console.log("Reporting the article as true")
                              if(post.trueCount === 1){
                                console.log("Post count =1")
                                this.props.reportTrue(event.target.name)
                                this.props.listTrueArticle(event.target.name)
                              }
                              else if(post.trueCount <= 0){
                                console.log("postcount less than 0")
                                this.props.reportTrue(event.target.name)
                              }
                              else{
                                console.log("if more than 1 ")
                                this.props.reportTrue(event.target.name)
                              }
                              
                            }
                            }
                          >

                            Report True
                          </button>
                          <button
                          type="button"
                            className="btn btn-danger btn-outline-light float-right"
                            name={post.id}
                            onClick={(event) => {
                              console.log("Reporting the article as fake")
                              if(post.fakeCount === 1){
                                console.log("when article count is 1")
                              this.props.reportFake(event.target.name)
                              console.log("before  blocked address")
                              this.props.addBlockAddress(event.target.name)
                              }
                              else if(post.fakeCount <= 0){
                                console.log("postcount less than 0")
                                this.props.reportFake(event.target.name)
                              }
                              else{
                                console.log("if more than 1 ")
                                this.props.reportFake(event.target.name)
                                console.log("before  blocked address")
                              this.props.addBlockAddress(event.target.name)
                              }
                              
                            }
                            }
                          >
                            Report Fake
                          </button>
  
            
                        
                        </div>
                        </div>
                  );
                  }
                })}
              
              <div className="container-fluid mt-5" id="myDIV"> 

        <div className="card text-white bg-dark">
          <div className="card-header text-white ml-auto mr-auto" >
            TRACING THE ARTICLE
    </div>
        <table className="table table-hover table-striped text-white" id="tracingTable" border="1 px black solid">
          <thead>
            <tr className="text-white" >
              <th >ID</th>
              <th>Title</th>
              <th >Content</th>
              <th>File Uploaded</th>
              <th >Author Address</th>
            </tr>
          </thead>
          <tbody className="text-white">
          </tbody>
          </table>
          </div>
          </div>
            </main>
            </div>


            <div className="col order-2">
              <h1>coloumn 2</h1>
              {this.props.posts.map((post, key) => {
                  if(post.approvalStatus === true && post.trueCount >= 2){
                    var link = "";
            link = "https://ipfs.infura.io/ipfs/"
            link = link.concat(post.filehash)
                

                  return (
                    <div class="card text-white bg-dark mb-3 col-lg-12 " key={key} id="cardDIV" style={{ maxWidth: '700px' }}>
                    <div class="card-header">News Article {key}</div>
                    <div class="card-body text-white ">
                        Author :
                        <img
                          className='mr-2 text-white'
                          width='30'
                          height='30'
                          alt ="identicon "
                          src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                        />
                        
                        <small className="text-white">{post.author}</small>
                  
                  
                      <ul id="postList" className="list-group ">
              
                        <li className="list-group-item text-white">
                          <p>{post.articleName}</p>
                        </li>
                        <li className="list-group-item text-white">
                          <p>{post.content}</p>
                        </li>
                      
                            <a className="btn btn-dark btn-outline-light btn-block" href={link} role="button">Click here to see the File uploaded for the article</a>
                          
                        <li className="list-group-item text-white">
                          <p className="float-right text-white">FAKECOUNT : {post.fakeCount} </p>
                          <p className="float-left text-white">TRUECOUNT : {post.trueCount} </p>
                        </li>
                       
                      </ul>
                      <br/>
                        </div>
                        </div>
                  );
                  }
                })}
              </div>


              <div className="col order-3">
              <h1>coloumn 3</h1>
              {this.props.posts.map((post, key) => {
                  if(post.approvalStatus === true && post.fakeCount >= 2){
                    var link = "";
            link = "https://ipfs.infura.io/ipfs/"
            link = link.concat(post.filehash)
                

                  return (
                    <div class="card text-white bg-dark mb-3 col-lg-12 " key={key} id="cardDIV" style={{ maxWidth: '700px' }}>
                    <div class="card-header">News Article {key}</div>
                    <div class="card-body text-white ">
                        Author :
                        <img
                          className='mr-2 text-white'
                          width='30'
                          height='30'
                          alt ="identicon "
                          src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                        />
                        
                        <small className="text-white">{post.author}</small>
                  
                  
                      <ul id="postList" className="list-group ">
              
                        <li className="list-group-item text-white">
                          <p>{post.articleName}</p>
                        </li>
                        <li className="list-group-item text-white">
                          <p>{post.content}</p>
                        </li>
                      
                            <a className="btn btn-dark btn-outline-light btn-block" href={link} role="button">Click here to see the File uploaded for the article</a>
                          
                        <li className="list-group-item text-white">
                          <p className="float-right text-white">FAKECOUNT : {post.fakeCount} </p>
                          <p className="float-left text-white">TRUECOUNT : {post.trueCount} </p>
                        </li>
                       
                      </ul>
                      <br/>
                        </div>
                        </div>
                  );
                  }
                })}
                </div>
          </div>
       
      </div>
       
    );
  }

}

export default CrowdAuditor;