# **News Tracing System Using Blockchain**

## **Introduction**
   The current pandemic situation has made us realize how fake news can have detrimental impacts on society. Although we can't ignore the benefits of social media, we surely can't overlook the misuse of these mediums to spread rumors and fake articles. These posts/articles/ messages can be commonly called "Fake News" and they not only create misinformation but also create panic among the public. Blockchain is a disruptive technology that is being used to make innovative solutions in the sectors of food, fashion, supply chain, and banking. The decentralized and transparent nature of blockchain can not only be used in the above sectors but it can also be used to tackle the problem of fake news. Several solutions have been proposed to combat the problem using blockchain. This project will propose one such solution to combat the fake news problem that can be used by all the news agencies. The system is called the "News Tracking and Tracing System " and is built using Ethereum and React. (Technology Stack below)

## **Working**:
   The journalist will have to log in to his Metamask wallet. After the journalist logs in the wallet, he can see his Home page. He can create a post, by entering the article name and he can upload a file related to the article. He can upload the post by clicking on the "upload" button. The file uploaded by the journalist will be stored on the IPFS and the file hash will be returned by IPFS API. The journalist will have to pay the gas fee, after confirming the transaction on metamask and all the post content and the file hash will be stored on the blockchain network. The Editor (after logging into his metamask wallet) can see his Home Page on which all the posts uploaded by the Journalist along with the related file will be displayed. The editor can modify the post, he can change the name of the post, file uploaded, etc. The modified post will be displayed on the News Agency's home page when he will log in to his metamask account. The Newsagency can see a warning line above each post that has been modified by the editor. The news agency has the option to trace the post to the origin on the click of a button. When clicked, the news agency can trace back the post to its origin which will display all the modifications done on the original content. The news agency can approve or disapprove of the post on the click of a button. If the post is disapproved, no further action will be taken. If the post is approved, then the news agency will by default tip an amount of 1 ether to the editor and the journalist. The necessary contract interactions will be stored in the respective metamask wallets. The posts that have been approved by the news agency will be displayed on the homepage of the crowd auditors. The crowd auditors will also have the feature of tracing the post to display all of its modifications. A warning line for the modified posts will be displayed on their homepage as well. The crowd auditors can report the post as fake or true. Reporting the post as fake will increase the "fake count" of the post and reporting the post as true will increase the "true count" of the post. Additionally, the system will have a threshold limit for the fake count. If the fake count has crossed above the threshold, then the post will be removed from the crowd auditors page and will be added to the list of "Fake Articles.". There will be another threshold for the number of fake articles a journalist, editor, and news agency can upload. If the threshold is crossed, the respective entity will be blocked from using the system. The "Fake Articles " will be compiled to create a database that can be used in the future for fact-checking other news articles. 
   
## **System UI and Working Flow**
![Landing Page](https://github.com/akshada2715/Blockchain--News-Tracing-System-/blob/master/img1.png)

![Enter your articles here](https://github.com/akshada2715/Blockchain--News-Tracing-System-/blob/master/img2.png)

![File Capture to IPFS -- Check the console](https://github.com/akshada2715/Blockchain--News-Tracing-System-/blob/master/img3.png)

![UI component](https://github.com/akshada2715/Blockchain--News-Tracing-System-/blob/master/img4.png)

## **Steps to get the system working**

### **Prerequisites:**
1) Geth
2) Ganache
3) Truffle
4) Node.js
5) Metamask
6) IPFS API 


1) After you clone the repository, navigate to the repository folder and run "npm install"
2) Start ganache 
3) You will need 8 addresses for this project, mainly for 8 entitities listed as below:
    1] Journalist 1, Journalist 2
    2] Editor 1, Editor 2
    3] News Agency 1, News Agency 2
    4] Crowd Auditor 1, Crowd Auditor 2
4) Replace the public key in App.js (line 230 ) with the public key of Journalist 1 and Journalist 2 (according to your ganache public keys).
5) Replace the public key in App.js (line 248 ) with the public key of Editor 1 and Editor 2 (according to your ganache public keys).
6) Replace the public key in App.js (line 268 ) with the public key of News Agency 1 and News Agency 2 (according to your ganache public keys).
7) Replace the public key in Navbar.js (line 11) with the public key of Journalist 1 and Journalist 2 (according to your ganache public keys).
8) Replace the public key in Navbar.js (line 14) with the public key of Editor 1 and Editor 2 (according to your ganache public keys).
9) Replace the public key in Navbar.js (line 17) with the public key of News Agency 1 and News Agency 2 (according to your ganache public keys).
10) Replace the path for the images according to the respective paths in your device: Main.js[line 44] , Editor.js[line 75], NewsAgency.js [line 125], CrowdAuditor.js[line 111]
11) In truffle.config.js -> go to development{network{ change the port and host respective to your ganache}}
12) remove the build directory. 
13) navigate to the project folder in your terminal, run these commands:
      truffle compile
      truffle migrate --reset
      npm run start
14) If you still get errors then create a new project repository and then navigate to it in the terminal and type
      truffle init 
     Now go into the repository and copy the src folder, test folder, package.json file and repeat the steps from (3)
     
### Contact Information:
   Getting this application to work on your local setup is a task if you are a beginner, hence, you can contact me if any difficulties. 
   Contact : babar.akshada07@gmail.com 
   
   Paper Link : ![Link to the paper](https://www.ijeast.com/papers/554-562,Tesma502,IJEAST.pdf)
