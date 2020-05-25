const SocialNetwork = artifacts.require('./SocialNetwork.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('SocialNetwork', ([deployer, author, tipper, approver,crowdauditor1, crowdauditor2]) => {
  let socialNetwork
  
  before(async () => {
    socialNetwork = await SocialNetwork.deployed()
  })
   describe('deployment', async () => {
    it('deploys successfully', async () => {
     // socialNetwork = await SocialNetwork.deployed() 
      const address = await socialNetwork.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async() =>{
      const name = await socialNetwork.name()
      assert.equal(name, 'News Tracking and Tracing System')
    })
  })

  describe('posts', async() => {
    let result, postCount

    before(async () => {
      result = await socialNetwork.createPost('Test Article','This is my first post','abc123',{ from: author })
      postCount = await socialNetwork.postCount()
    })

    

    it('creates posts', async()=> {
    
     //Success
     assert.equal(postCount, 1)
     const event = result.logs[0].args
     assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
     assert.equal(event.articleName, 'Test Article', 'Article name is correct' )
     assert.equal(event.content, 'This is my first post', 'content is correct')
     assert.equal(event.tipAmount, '0', 'tip amount is correct')
     assert.equal(event.approvalStatus, false, 'approvalStatus is correct')
     assert.equal(event.authenticity, true, 'The article is authentic')
     assert.equal(event.fakeCount,'0', 'The fakeCount is correct')
     assert.equal(event.trueCount,'0', 'The trueCount is correct')
     assert.equal(event.prevId, '1', 'The previous post id is correct')
     assert.equal(event.filehash, 'abc123', 'The filehash is correct')
     //Failure

     await socialNetwork.createPost('','','','', {from: author}).should.be.rejected;
    })

    it('lists posts', async()=> {
        const post = await socialNetwork.posts(postCount)
        assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
        assert.equal(post.articleName, 'Test Article', 'Article name is correct' )
     assert.equal(post.content, 'This is my first post', 'content is correct')
     assert.equal(post.tipAmount, '0', 'tip amount is correct')
     assert.equal(post.approvalStatus, false, 'approvalStatus is correct')
     assert.equal(post.authenticity, true, 'The post is authentic')
     assert.equal(post.author, author, 'author is correct')
     assert.equal(post.filehash, 'abc123', 'The fielhash is correct')
    })

    it('allows users to tip posts', async()=> {
      const post = await socialNetwork.posts(postCount)

      let oldAuthorBalance
      oldAuthorBalance = await web3.eth.getBalance(author)
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

      result = await socialNetwork.tipPost(postCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

      //Success
     const event = result.logs[0].args
     assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
     assert.equal(event.articleName, 'Test Article', 'Article name is correct' )
     assert.equal(event.content, 'This is my first post', 'content is correct')
     assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
    // assert.equal(event.approvalStatus, , 'approvalStatus is correct')
     assert.equal(event.author, author, 'author is correct')
     assert.equal(event.filehash, 'abc123', 'The fielhash is correct')

     //Check if the author received funds or not 
     let newAuthorBalance
     newAuthorBalance = await web3.eth.getBalance(author)
     newAuthorBalance = new web3.utils.BN(newAuthorBalance)

     let tipAmount
     tipAmount = web3.utils.toWei('1', 'Ether')
      tipAmount = new web3.utils.BN(tipAmount)

      const expectedBalance = oldAuthorBalance.add(tipAmount)
      assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

      //failure: tries to tip a post that does not exist

      await socialNetwork.tipPost(99,{ from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
    })

     it('allows users to approve posts', async()=> {
       const post = await socialNetwork.posts(postCount)

      let oldApprovalStatus
      oldApprovalStatus = post.approvalStatus;

      result = await socialNetwork.approvePost(postCount,{ from: approver})

      //Success
     const event = result.logs[0].args
     assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
     assert.equal(event.articleName, 'Test Article', 'Article name is correct' )
     assert.equal(event.content, 'This is my first post', 'content is correct')
     assert.equal(event.approvalStatus, true, 'approvalStatus is correct')
     assert.equal(event.authenticity, true, 'The post is authentic')
     assert.equal(event.author, author, 'author is correct')
     assert.equal(event.filehash, 'abc123', 'The fielhash is correct')

     //Check if the author received funds or not 
     let newApprovalStatus
     newApprovalStatus = post.approvalStatus

    let expectedApprovalStatus
    expectedApprovalStatus = post.approvalStatus

    assert.equal(expectedApprovalStatus,newApprovalStatus)
    
      //failure: tries to tip a post that does not exist

      await socialNetwork.tipPost(99,{ from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
    })

  it('allows users to report posts as fake', async()=> {
    const post = await socialNetwork.posts(postCount)

   let oldAuthenticity, oldCount
   oldAuthenticity = post.authenticity
   oldCount = post.fakeCount

   result = await socialNetwork.reportFake(postCount,{ from: crowdauditor1 || crowdauditor2})

   //Success
  const event = result.logs[0].args
  assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
  assert.equal(event.articleName, 'Test Article', 'Article name is correct' )
  assert.equal(event.content, 'This is my first post', 'content is correct')
 // assert.equal(event.approvalStatus, true, 'approvalStatus is correct')
  assert.equal(event.authenticity, false, 'The post is reported fake')
  assert.equal(event.author, author, 'author is correct')
  assert.equal(event.filehash, 'abc123', 'The fielhash is correct')

  //Check if the author received funds or not 
  let newAuthenticity, newCount
  newAuthenticity = event.authenticity
  newCount = event.fakeCount

 let expectedAuthenticity, expectedCount
 expectedAuthenticity = !(oldAuthenticity)
 expectedCount = 1

 assert.equal(expectedAuthenticity.toString(),newAuthenticity.toString())
 assert.equal(expectedCount, newCount)
 
   //failure: tries to tip a post that does not exist

   await socialNetwork.reportFake(99,{ from: crowdauditor1 || crowdauditor2}).should.be.rejected;
 })

 it('allows users to report posts as true', async()=> {
  const post = await socialNetwork.posts(postCount)

 let oldAuthenticity, oldCount
 oldAuthenticity = post.authenticity
 oldCount = post.trueCount

 result = await socialNetwork.reportTrue(postCount,{ from: crowdauditor1 || crowdauditor2})

 //Success
const event = result.logs[0].args
assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
assert.equal(event.articleName, 'Test Article', 'Article name is correct' )
assert.equal(event.content, 'This is my first post', 'content is correct')
// assert.equal(event.approvalStatus, true, 'approvalStatus is correct')
assert.equal(event.authenticity, true, 'The post is reported fake')
assert.equal(event.author, author, 'author is correct')
assert.equal(event.filehash, 'abc123', 'The fielhash is correct')

//Check if the author received funds or not 
let newAuthenticity, newCount
newAuthenticity = event.authenticity
newCount = event.trueCount.toString()

let expectedAuthenticity, expectedCount
expectedAuthenticity = !(oldAuthenticity)
expectedCount = oldCount++
expectedCount = 1

assert.equal(expectedAuthenticity.toString(),newAuthenticity.toString())
assert.equal(expectedCount, newCount)

 //failure: tries to tip a post that does not exist

 await socialNetwork.reportFake(99,{ from: crowdauditor1 || crowauditor2}).should.be.rejected;
})

it('modified posts', async()=> {
  //fetch the current post 
  const post = await socialNetwork.posts(postCount)
  // fetch the current post id and previous id
  let _id, oldprevId
  _id = post.id
  oldprevId = post.prevId
  //define new content
  const title = "modified article"
  const content = "modified content"
  const filehash = "abc123456"
  // modifying the post 
  result = await socialNetwork.modifyPost(_id,title,content,filehash,{from: tipper})
  postCount = await socialNetwork.postCount()
  //Success
  assert.equal(postCount,2)
  const event = result.logs[0].args
  assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
  assert.equal(event.articleName, 'modified article', 'Article name is correct' )
  assert.equal(event.content, 'modified content', 'content is correct')
  assert.equal(event.tipAmount, '0', 'tip amount is correct')
  assert.equal(event.approvalStatus, false, 'approvalStatus is correct')
  assert.equal(event.authenticity, true, 'The article is authentic')
  assert.equal(event.fakeCount,'0', 'The fakeCount is correct')
  assert.equal(event.trueCount,'0', 'The trueCount is correct')
  assert.equal(event.prevId, '1', 'The previous post id is correct')
  assert.equal(event.filehash, 'abc123456', 'The fielhash is correct')

  //Failure
  
  await socialNetwork.modifyPost('','','', {from: author}).should.be.rejected;
 })

 it('retrieves the fileHash', async () => {
  const post = await socialNetwork.posts(postCount)
  let filehash = post.filehash
  const result = await socialNetwork.getHash(postCount)
  assert.equal(result, filehash,'get hash function works properly ')
  
})

})

describe('fakeArticles', async() => {
  let result1, fakeArticleCount, result, postCount

  before(async () => {
      result = await socialNetwork.createPost('Test Article','This is my first post','abc123',{ from: author })
      postCount = await socialNetwork.postCount()
    //fetch the current post 
  const post = await socialNetwork.posts(postCount)
  // fetch the current post id and previous id
   let _id
  _id = post.id
    result1 = await socialNetwork.addFakeArticle(_id)
    fakeArticleCount = await socialNetwork.fakeArticleCount()
  })

  it('add the post id to the fake articles list', async()=> {
    
    //Success
    assert.equal(postCount,3)
    assert.equal(fakeArticleCount,1)
    const event = result1.logs[0].args
    assert.equal(event.id.toNumber(), fakeArticleCount.toNumber(), 'id is correct')
    assert.equal(event.postid.toNumber(),postCount.toNumber(), 'Post id is correct' )
    
    //Failure
  
    await socialNetwork.addFakeArticle('').should.be.rejected;
   })
})

describe('trueArticles', async() => {
  let result1, trueArticleCount, result, postCount

  before(async () => {
      result = await socialNetwork.createPost('Test Article','This is my first post','abc123',{ from: author })
      postCount = await socialNetwork.postCount()
    //fetch the current post 
  const post = await socialNetwork.posts(postCount)
  // fetch the current post id and previous id
   let _id
  _id = post.id
    result1 = await socialNetwork.addTrueArticle(_id)
    trueArticleCount = await socialNetwork.trueArticleCount()
  })

  it('add the post id to the true articles list', async()=> {
    
    //Success
    assert.equal(postCount,4)
    assert.equal(trueArticleCount,1)
    const event = result1.logs[0].args
    assert.equal(event.id.toNumber(), trueArticleCount.toNumber(), 'id is correct')
    assert.equal(event.postid.toNumber(),postCount.toNumber(), 'Post id is correct' )
    
    //Failure
  
    await socialNetwork.addTrueArticle('').should.be.rejected;
   })
})


describe('addressStatus', async() => {
  let result1, addressCount, result, postCount

  before(async () => {
      result = await socialNetwork.createPost('Test Article','This is my first post','abc123',{ from: author })
      postCount = await socialNetwork.postCount()
    //fetch the current post 
  const post = await socialNetwork.posts(postCount)
  // fetch the current post id and previous id
   let _id
  _id = post.id
    result1 = await socialNetwork.addBlockedAddress(_id)
    addressCount = await socialNetwork.Addresscount()
  })

  it('add the address to a blocked address list', async()=> {
    
    //Success
    assert.equal(postCount,5)
    assert.equal(addressCount,1)
    const event = result1.logs[0].args
    assert.equal(event.id.toNumber(), addressCount.toNumber(), 'id is correct')
    assert.equal(event.postid.toNumber(),postCount.toNumber(), 'Post id is correct' )
    assert.equal(event.blocked,true, 'status is correct')
    
    //Failure
  
    await socialNetwork.addBlockedAddress('').should.be.rejected;
   })
})

})



