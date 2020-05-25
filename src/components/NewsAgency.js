import React, { Component } from 'react';
import Identicon from 'identicon.js';
import './NewsAgency.css'


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
var warning = "The article file has been modified"

class NewsAgency extends Component {
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

  displayTable(id) {
    var x = document.getElementById("myDIV");
    x.style.display = "table";
    var _id = id - 1;
    console.log(_id);
    var post = this.props.posts[_id];
    console.log(post);
    var prev = post.prevId;
    console.log(prev);

    while (post.id !== post.prevId) {
      this.addRow(_id);
      _id = post.prevId - 1;
      post = this.props.posts[_id];
    }
    this.addRow(_id);
  }

  warning(id) {
    id = id - 1
    console.log(id)
    console.log(this.props.posts[id])
    var post = this.props.posts[id]
    if (post.id !== post.prevId) {
      return (
        <li className="list-group-item-warning">
          The article file has been modified.
        </li>

      )
    }

  }

  approval(id) {
    id = id - 1
    console.log(id)
    console.log(this.props.posts[id])
    var post = this.props.posts[id]
    if (post.approvalStatus.toString() === "true") {
      return (
        <li key={id} className="list-group-item-success">
          <small className="float-left mt-1 ">
            TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                      </small>
          <small className="float-right mt-1 ">
            Approved: {post.approvalStatus.toString()}
          </small>
        </li>
      )
    }
    else {
      return (
        <li key={id} className=" list-group-item-danger">
          <small className="float-left mt-1 ">
            TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                      </small>
          <small className="float-right mt-1">
            Approved: {post.approvalStatus.toString()}
          </small>
        </li>
      )
    }

  }

  render() {
    var currentId = 0;
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

      <div className="row">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"

        >
          <br/>
              {this.props.posts.map((post, key) => {

                if (post.id !== post.prevId) {
                  var link = "";
                  link = "https://ipfs.infura.io/ipfs/"
                  link = link.concat(post.filehash)

                  return (
                    <div class="card text-white bg-dark mb-3 col-lg-12 ml-auto mr-auto" key={key} id="cardDIV" style={{ maxWidth: '700px' }}>
                      <div class="card-header ml-auto mr-auto">News Article {key}</div>
                      <div class="card-body text-white ">
                        <form onSubmit={(event) => {
                          event.preventDefault()
                        }}>

                          <img
                            className='mr-2'
                            width='30'
                            height='30'
                            alt="Identicon"
                            src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                          />
                          <small className="text-white">{post.author}</small>
                          <button
                              type="button"
                              className="btn btn-dark btn-outline-light float-right"

                              name={post.id}
                              onClick={(event) => {
                                currentId = event.target.name
                                this.displayTable(currentId)
                              }
                              }
                            >
                              Trace Post
                          </button>
                          <ul id="postList" className="list-group list-group-flush">
                            {this.warning(key + 1)}
                      
                            <li className="list-group-item text-white">
                              <input
                                id="articleName"
                                type="text"
                                ref={(input) => { this.articleName = input }}
                                value={this.props.value}
                                defaultValue={post.articleName}
                                className="form-control text-white"
                                required />
                            </li>
                            <li className="list-group-item text-wwhite" >
                              <input
                                id="postContent"
                                type="text"
                                ref={(input) => { this.postContent = input }}
                                defaultValue={post.content}
                                className="form-control text-white"
                                required />
                            </li>
                            </ul>

                              <a className="btn btn-dark btn-outline-light btn-block" href={link} role="button">Click here to see the File uploaded by the journalist</a>
                          <br/>
                            {this.approval(key + 1)}
                            <br/>
                              <button
                                type="button"
                                className="btn btn-danger btn-outline-light float-left "
                                name={post.id}
                                onClick={(event) => {
                                  console.log("Checking approval status")
                                  console.log(post.approvalStatus.toString())
                                  if (post.approvalStatus.toString() === "false") {
                                    console.log("Disapproving the post")
                                    window.alert(" Post has been disapproved!")

                                  }
                                  else {
                                    console.log("Post is already approved and tipped !")
                                    window.alert(" Post has already been approved and tipped !")
                                  }

                                }}
                              >
                                Disapprove
</button>



                              <button
                                type="button"
                                className="btn btn-success btn-outline-light float-right"
                                name={post.id}
                                onClick={(event) => {
                                  console.log("Checking approval status")
                                  if (post.approvalStatus.toString() === "false") {
                                    console.log("Approving the post")
                                    this.props.approvePost(event.target.name)
                                    console.log("Tipping the Post")
                                    let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                                    this.props.tipPost(event.target.name, tipAmount)
                                  }
                                  else {
                                    console.log("Post is already approved and tipped !")
                                    window.alert(" Post has already been approved and tipped !")
                                  }

                                }}
                              >
                                Approve
</button>





                        </form>
                        </div>
                        </div>
          );
                    }
        })}
                    <div className="container-fluid mt-5 text-white" border="1 px white solid" id="myDIV">

                      <div className="card text-white bg-dark text-center ml-auto mr-auto">
                        <div className="card-header" >
                          TRACING THE ARTICLE
    </div>
                        <table className="table table-hover table-striped text-white" id="tracingTable" border="1 px white solid">
                          <thead>
                            <tr className="text-white">
                              <th >ID</th>
                              <th>Title</th>
                              <th >Content</th>
                              <th>File </th>
                              <th >Author Address</th>
                            </tr>
                          </thead>
                          <tbody className="text-white">
                          </tbody>
                        </table>
                      </div>
                    </div>

        </main>
          </div >
          </div>
      
      
    );
  }
}

export default NewsAgency;