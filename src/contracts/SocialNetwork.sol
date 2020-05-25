pragma solidity 0.5.0;
//pragma experimental ABIEncoderV2;

contract SocialNetwork {
    // State variable
    string public name;
    uint public postCount = 0;
    uint public Addresscount = 0;
    uint public fakeArticleCount = 0;
    uint public trueArticleCount = 0;

    mapping(uint => Post) public posts;
    mapping(uint => FakeArticles) public fakeArticles;
    mapping(uint => TrueArticles) public trueArticles;
    mapping(uint => AddressStatus) public addressStatus;

    struct FakeArticles{
        uint id;
        uint postid;
        address payable author;
    }

    struct TrueArticles{
        uint id;
        uint postid;
        address payable author;
    }

    struct AddressStatus{
        uint id;
        uint postid;
        uint timestamp;
        bool blocked;
        address payable author;
    }

    struct Post {
        uint id;
        string articleName;
        string content;
        uint tipAmount;
        bool approvalStatus;
        bool authenticity;
        uint fakeCount;
        uint trueCount;
        uint prevId;
        string filehash;
        address payable author;
    }

    event PostCreated(
        uint id,
        string articleName,
        string content,
        uint tipAmount,
        bool approvalStatus,
        bool authenticity,
        uint fakeCount,
        uint trueCount,
        uint prevId,
        string filehash,
        address payable author
    );

    event PostModified(
        uint id,
        string articleName,
        string content,
        uint tipAmount,
        bool approvalStatus,
        bool authenticity,
        uint fakeCount,
        uint trueCount,
        uint prevId,
        string filehash,
        address payable author
    );

   event PostTipped(
    uint id,
    string articleName,
    string content,
    uint tipAmount,
    bool approvalStatus,
    bool authenticity,
    uint fakeCount,
    uint trueCount,
    uint prevId,
    string filehash,
    address payable author
);

 event PostApproved(
    uint id,
    string articleName,
    string content,
    uint tipAmount,
    bool approvalStatus,
    bool authenticity,
    uint fakeCount,
    uint trueCount,
    uint prevId,
    string filehash,
    address payable author
);

event reportPostFake(
    uint id,
    string articleName,
    string content,
    uint tipAmount,
    bool approvalStatus,
    bool authenticity,
    uint fakeCount,
    uint trueCount,
    uint prevId,
    string filehash,
    address payable author
);

event reportPostTrue(
    uint id,
    string articleName,
    string content,
    uint tipAmount,
    bool approvalStatus,
    bool authenticity,
    uint fakeCount,
    uint trueCount,
    uint prevId,
    string filehash,
    address payable author
);

event FakeArticle(
    uint id,
    uint postid,
    address payable author
);

event TrueArticle(
    uint id,
    uint postid,
    address payable author
);

event addAddressStatus(
        uint id,
        uint postid,
        uint timestamp,
        bool blocked,
        address payable author
);

    // Constructor function
    constructor () public {
        name = "News Tracking and Tracing System";
    }

   function createPost(string memory _articleName, string memory _content, string memory filehash) public {
    // Require valid content
    require(bytes(_content).length > 0);
    require(bytes(_articleName).length > 0);
    // Increment the post count
    postCount ++;
    // Create the post
    posts[postCount] = Post(postCount,_articleName, _content, 0,false, true,0,0,postCount,filehash,msg.sender);
    // Trigger event
    emit PostCreated(postCount, _articleName, _content, 0,false,true, 0,0, postCount,filehash, msg.sender);
}

function getHash(uint _id) public view returns (string memory){
  require(_id > 0 && _id <= postCount);
    // Fetch the post
    Post memory _post = posts[_id];
    // Fetch the author
   return _post.filehash;
}

 function modifyPost(uint _id, string memory _articleName, string memory _content, string memory filehash) public {
    //Require valid ID
    require(_id > 0 && _id <= postCount);
    // Require valid content
    require(bytes(_content).length > 0);
    require(bytes(_articleName).length > 0);
    // Increment the post count
   // Post memory _post = posts[_id];
   
    postCount ++;

    // Create the post
    posts[postCount] = Post(postCount,_articleName, _content, 0,false, true,0,0, _id,filehash, msg.sender);
    // Trigger event
    emit PostModified(postCount, _articleName, _content, 0,false,true, 0,0, _id,filehash,msg.sender);
}

   function tipPost(uint _id) public payable {
    // Make sure the id is valid
    require(_id > 0 && _id <= postCount);
    // Fetch the post
    Post memory _post = posts[_id];
    // Fetch the author
    address payable _author = _post.author;
    // Pay the author by sending them Ether
    address(_author).transfer(msg.value);
    // Increment the tip amount
    _post.tipAmount = _post.tipAmount + msg.value;
    // Update the post
    posts[_id] = _post;
    // Trigger an event
        emit PostTipped(postCount,_post.articleName, _post.content, _post.tipAmount,
         _post.approvalStatus, _post.authenticity,_post.fakeCount,_post.trueCount, _post.prevId,_post.filehash,_author);
}
    function approvePost(uint _id) public payable {
        // Make sure the id is Valid
        require(_id > 0 && _id <= postCount, "Post does not exist yet");
        // Fetch the post
        Post memory _post = posts[_id];
        // Increment the tip Amount
        _post.approvalStatus = true;
        // Update the post
        posts[_id] = _post;
        // Trigger an event
        emit PostApproved(
            postCount,
            _post.articleName,
            _post.content,
            _post.tipAmount,
            _post.approvalStatus,
            _post.authenticity,
            _post.fakeCount,
            _post.trueCount,
            _post.prevId,
            _post.filehash,
            _post.author
        );
    }

      function reportFake(uint _id) public payable {
        // Make sure the id is Valid
        require(_id > 0 && _id <= postCount, "Post does not exist yet");
        // Fetch the post
        Post memory _post = posts[_id];
        // Increment the tip Amount
        _post.authenticity = false;
        _post.fakeCount = _post.fakeCount + 1;
        // Update the post
        posts[_id] = _post;
        // Trigger an event
        emit reportPostFake(
            postCount,
            _post.articleName,
            _post.content,
            _post.tipAmount,
            _post.approvalStatus,
            _post.authenticity,
            _post.fakeCount,
            _post.trueCount,
            _post.prevId,
            _post.filehash,
            _post.author
        );
    }

    function reportTrue(uint _id) public payable {
        // Make sure the id is Valid
        require(_id > 0 && _id <= postCount, "Post does not exist yet");
        // Fetch the post
        Post memory _post = posts[_id];
        // Increment the tip Amount
        _post.authenticity = true;
        _post.trueCount = _post.trueCount + 1;
        // Update the post
        posts[_id] = _post;
        // Trigger an event
        emit reportPostTrue(
            postCount,
            _post.articleName,
            _post.content,
            _post.tipAmount,
            _post.approvalStatus,
            _post.authenticity,
            _post.fakeCount,
            _post.trueCount,
            _post.prevId,
            _post.filehash,
            _post.author
        );
    }

    function addFakeArticle(uint _postid) public payable {
        // Make sure the id is Valid
        require(_postid > 0 && _postid <= postCount, "Post does not exist yet");
        // Fetch the post
        Post memory _post = posts[_postid];
        // Increment the fakeArticle count
        fakeArticleCount++;
        //Add it to the fake article list
         fakeArticles[fakeArticleCount] = FakeArticles(fakeArticleCount,_postid, _post.author);
        //Trigger an event
         emit FakeArticle(
             fakeArticleCount,
             _postid,
             _post.author
         );
    }

    function addTrueArticle(uint _postid) public payable {
        // Make sure the id is Valid
        require(_postid > 0 && _postid <= postCount, "Post does not exist yet");
        // Fetch the post
        Post memory _post = posts[_postid];
        // Increment the true article count
        trueArticleCount++;
        //Add it to the true article list
         trueArticles[trueArticleCount] = TrueArticles(trueArticleCount,_postid, _post.author);
        //Trigger an event
         emit TrueArticle(
             trueArticleCount,
             _postid,
             _post.author
         );
    }

    function addBlockedAddress(uint _postid) public payable {
        // Make sure the id is Valid
        require(_postid > 0 && _postid <= postCount, "Post does not exist yet");
        // Fetch the post
        Post memory _post = posts[_postid];
        // Increment the address count
        Addresscount++;
        //Add it to the fake article list
         addressStatus[Addresscount] = AddressStatus(Addresscount,_postid,now ,true, _post.author);
        //Trigger an event
         emit addAddressStatus(
             Addresscount,
             _postid,
             now,
             true,
             _post.author
         );
    }

}