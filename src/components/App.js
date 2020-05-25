import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar'
import SocialNetwork from '../abis/SocialNetwork.json'
import Main from './Main'
import Editor from './Editor'
import NewsAgency from './NewsAgency'
import CrowdAuditor from './CrowdAuditor'


class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }


  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
   // console.log(account)
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = SocialNetwork.networks[networkId]
    if(networkData) {
      const socialNetwork = new web3.eth.Contract(SocialNetwork.abi, networkData.address)
      this.setState({ socialNetwork })
      const postCount = await socialNetwork.methods.postCount().call()
      this.setState({ postCount })
      // Load Posts
      for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call()
        this.setState({
          posts: [...this.state.posts, post]
        })
      }

      const fakeArticleCount = await socialNetwork.methods.fakeArticleCount().call()
      this.setState({ fakeArticleCount })
      // Load Fake Articles
      for (var j = 1; j <= fakeArticleCount; j++) {
        const fakeArticle = await socialNetwork.methods.fakeArticles(j).call()
        this.setState({
          fakeArticles: [...this.state.fakeArticles, fakeArticle]
        })
      }

      const trueArticleCount = await socialNetwork.methods.trueArticleCount().call()
      this.setState({ trueArticleCount })
      // Load True Articles
      for (var k = 1; k <= trueArticleCount; k++) {
        const trueArticle = await socialNetwork.methods.trueArticles(k).call()
        this.setState({
          trueArticles: [...this.state.trueArticles, trueArticle]
        })
      }

      const Addresscount = await socialNetwork.methods.Addresscount().call()
      this.setState({ Addresscount })
      // Load Blocked Addresses
      for (var l = 1; l <= Addresscount; l++) {
        const addressStatus = await socialNetwork.methods.addressStatus(l).call()
        this.setState({
          addressStatus: [...this.state.addressStatus, addressStatus]
        })
        if (addressStatus.author === this.state.account){
          this.setState({ status: false})
          console.log(this.state.account)
          console.log("Has a false status")
        }
      }

      this.setState({ loading: false})
    } else {
      window.alert('SocialNetwork contract not deployed to detected network.')
    }
  }

  createPost(articleName , content,filehash) {
    this.setState({ loading: true })
    console.log(content)
    console.log(articleName)
    console.log(filehash)
    this.state.socialNetwork.methods.createPost(articleName,content,filehash).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }


  modifyPost(prevId,articleName , content,filehash) {
    this.setState({ loading: true })
    console.log(prevId)
    console.log(content)
    console.log(articleName)
    console.log(filehash)
    this.state.socialNetwork.methods.modifyPost(prevId,articleName,content,filehash).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })

    })
  }
  
  tipPost(id, tipAmount) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  approvePost(id) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.approvePost(id).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  reportFake(id) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.reportFake(id).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  reportTrue(id) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.reportTrue(id).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  returnLink(id) {
   var filehash = this.state.socialNetwork.methods.getHash(id);
    var link = "https://ipfs.infura.io/ipfs/"
    link = link.concat(filehash)
    console.log(link)
    return link
    //return prevId
  }

  listFakeArticle(postid) {
    this.setState({ loading: true })
    console.log(postid)
    this.state.socialNetwork.methods.addFakeArticle(postid).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  listTrueArticle(postid) {
    this.setState({ loading: true })
    console.log(postid)
    this.state.socialNetwork.methods.addTrueArticle(postid).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  addBlockAddress(postid){
    this.setState({ loading: true })
    console.log(this.state.account)
    console.log("Blocking this address")
    const curArticle = this.state.posts[postid-1]
    console.log(curArticle)
    var previousPostId = curArticle.prevId
    console.log(previousPostId)
    console.log("Blocking editor")
   this.state.socialNetwork.methods.addBlockedAddress(postid-1).send({ from: this.state.account })
    console.log("Blocking the journalist")
   this.state.socialNetwork.methods.addBlockedAddress(previousPostId-1).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      status: true,
      socialNetwork: null,
      postCount: 0,
      fakeArticleCount :0,
      trueArticleCount : 0,
      Addresscount :0,
      posts: [],
      fakeArticles :[],
      trueArticles :[],
      addressStatus :[],
      loading: true,
      filehash: '',
      buffer: null,
    }
    this.createPost = this.createPost.bind(this)
    this.tipPost = this.tipPost.bind(this)
    this.approvePost = this.approvePost.bind(this)
    this.reportFake = this.reportFake.bind(this)
    this.reportTrue = this.reportTrue.bind(this)
    this.modifyPost = this.modifyPost.bind(this)
    this.returnLink = this.returnLink.bind(this)
    this.listFakeArticle = this.listFakeArticle.bind(this)
    this.listTrueArticle = this.listTrueArticle.bind(this)
    this.addBlockAddress = this.addBlockAddress.bind(this)
  }
  render() {
    
   if(this.state.status === true){

    if(this.state.account === '0x35555fC7F981cEe05b4f1bDe90dB6f9a8886412D' || this.state.account === '0xDa7E0A8CDaD596F4096a54C01b1eA831AA6a8aCb')
        {
    return (
      <div>
        <Navbar account={this.state.account} />
      

            <Main
          posts={this.state.posts}
          addressStatus = {this.state.addressStatus}
          createPost={this.createPost}
          tipPost={this.tipPost}
          modifyPost = {this.modifyPost}
    />
        </div>
    );
  }
  else{
    if(this.state.account === '0x846b81A8398c8aC69a806Ae1E85d291E5DDA5Fc4' || this.state.account === '0xe857E81E9C5ec4b65C4dEa53548C7cE7A14E1F88')
    {
    return(
      <div>
        <Navbar account={this.state.account} />
        <Editor 
        account={this.state.account}
        posts={this.state.posts}
        addressStatus = {this.state.addressStatus}
        createPost={this.createPost}
        tipPost={this.tipPost}
        modifyPost = {this.modifyPost}
        buffer = {this.state.buffer}
        returnLink = {this.returnLink}
        
        />
        </div>
    );
    }
    else{
      if(this.state.account === '0x63047AE4C9BC26D4e424998a25b5c08bc6E8181f' || this.state.account === '0xE4d9263B227121484C680022c0fa35AAb95238F1')
      {
        return(
          <div>
          <Navbar account={this.state.account} />
          <NewsAgency account={this.state.account}
          posts={this.state.posts}
          addressStatus = {this.state.addressStatus}
          createPost={this.createPost}
          approvePost = {this.approvePost}
          tipPost={this.tipPost}
          modifyPost={this.modifyPost}
          />
          </div>
        );
      }
      else{
        return(
          <div>
          <Navbar account={this.state.account} />
          <CrowdAuditor account={this.state.account}
           posts={this.state.posts}
           addressStatus = {this.state.addressStatus}
          createPost={this.createPost}
          tipPost={this.tipPost}
          reportFake={this.reportFake}
          reportTrue = {this.reportTrue}
          listFakeArticle = {this.listFakeArticle}
          listTrueArticle = {this.listTrueArticle}
          addBlockAddress = {this.addBlockAddress}
          />
          </div>
        );
      }
    }
  }
}
else{
  return(
    <div>
    <Navbar account={this.state.account} />
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
          <font color="red">
          <b><h1>Opps! You have been blocked by the system</h1></b>
          
          <h5>The article posted by you is a "Fake Article"
          </h5>
          </font>
          <font color="black">
          <p>Please Contact your Agency for further details!</p>
          </font>
        </div>
        
      
      
      </div>
    </div>
    
  </div>
</div>
</div>
    </div>
      
  );
}
  }

}

export default App;
