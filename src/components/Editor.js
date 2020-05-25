import React, { Component } from 'react';
import Identicon from 'identicon.js';
import './Editor.css'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
var statement = "Upload Your File"
var Name = ""
var content = ""
var warning = "The article file has been modified"

class Editor extends Component {




  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0]
    const reader = new window.FileReader() // converts the file to a buffer
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', Buffer(reader.result))
      //console.log("state buffer",this.state.buffer)
    }

    console.log("File Captured")

    var labelid = "uploadFile"
    var id = event.target.name
    id = id - 1
    console.log("IDDDDD:", id)
    labelid = labelid.concat(id)
    console.log("labelllll", labelid)
    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf('.');
    var uploadLabel = document.getElementById(labelid);
    var fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);
    fileName.concat(".");
    fileName.concat(ext);
    statement = fileName;
    uploadLabel.value = fileName;

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

  render() {

    const imgurl = "/home/akshada/social-network/src/components/images/image6.jpg"
    // var filehash = "";

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
        <br />
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"

          >
            {this.props.posts.map((post, key) => {
              var link = "";
              link = "https://ipfs.infura.io/ipfs/"
              link = link.concat(post.filehash)
              var titleId = "title"
              titleId = titleId.concat(key)
              var contentId = "content"
              contentId = contentId.concat(key)
              var fileId = "file"
              fileId = fileId.concat(key)
              var labelId = "uploadFile"
              labelId = labelId.concat(key)

              return (
                <div class="card text-white bg-dark mb-3 col-lg-12 ml-auto mr-auto" key={key} id="cardDIV" style={{ maxWidth: '700px' }}>
                  <div class="card-header ml-auto mr-auto">News Article {key}</div>
                  <div class="card-body text-white ">
                    <form onSubmit={(event) => {
                      event.preventDefault()
                    }}>
                      Author:
                        <img
                        className='mr-2'
                        width='30'
                        height='30'
                        alt="Identicon"
                        src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                      />
                      <small className="text-white">{post.author}</small>

                      <ul id="postList" className="list-group list-group-flush text-white">
                        {this.warning(key + 1)}
                        <li className="list-group-item text-white">
                          <input
                            id={titleId}
                            class="title text-white"
                            type="text"
                            ref={(input) => { this.articleName = input }}
                            value={this.props.value}
                            defaultValue={post.articleName}

                            required />


                        </li>
                        <li className="list-group-item text-white" >
                          <input
                            id={contentId}
                            type="text"
                            class="content"
                            ref={(input) => { this.postContent = input }}


                            defaultValue={post.content}

                            required />

                        </li>
                        
                          <a className="btn btn-dark btn-outline-light btn-block" href={link} role="button">Click here to see the File uploaded by the journalist</a>
                        
                        <li className="list-group-item py-2">
                          <div className="custom-file">
                            <input
                              type="file"
                              id={fileId}
                              name={post.id}
                              className="custom-file-input bg-dark"
                              onChange={this.captureFile}
                            />
                            <label className="custom-file-label bg-dark text-white" id={labelId} >
                              {statement}
                            </label>
                          </div>

                        </li>
                        <li key={key} className="list-group-item py-2">
                          <small className="float-left mt-1 text-white">
                            TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                        </small>

                          <button
                            id={key}
                            type="button"
                            className="btn btn-dark btn-outline-light float-right"
                            name={post.id}
                            onClick={(event) => {
                              var Name = ""
                              var content = ""
                              var postId = event.target.name
                              var keyy = postId - 1
                              console.log(keyy)
                              var title = "title"
                              var content = "content"
                              var file = "file"
                              title = title.concat(keyy)
                              content = content.concat(keyy)
                              file = file.concat(keyy)
                              console.log(title, content, file)
                              Name = document.getElementById(title).value
                              content = document.getElementById(content).value
                              console.log(Name);
                              console.log(content);
                              var id = event.target.name;
                              var filehash = "";
                              console.log(fileId)
                              console.log(file)
                              var file1 = document.getElementById(fileId).value
                              console.log(file1)
                              if (file1 != 0x0) {
                                console.log("file not empty")
                                console.log("Submitting the file..")
                                ipfs.add(this.state.buffer, (error, result) => {
                                  console.log('Ipfs result', result)
                                  filehash = result[0].hash
                                  console.log(filehash)
                                  this.setState({ filehash })
                                  console.log(this.state.filehash)
                                  this.setState({ link })
                                  this.props.modifyPost(id, Name, content, filehash)
                                  if (error) {
                                    console.log(error)
                                    return
                                  }
                                })
                              }
                              else {
                                console.log("file empty")
                                this.props.modifyPost(id, Name, content, post.filehash)
                              }


                            }}
                          >
                            Upload
                            </button>
                        </li>
                      </ul>

                    </form>
                  </div>
                </div>

              );
            })}

          </main>
        </div >
      </div>
    );
  }
}

export default Editor;