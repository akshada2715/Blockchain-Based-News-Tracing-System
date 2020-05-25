Prerequisites:
1) Geth
2) Ganache
3) Truffle
4) Node.js
5) Metamask
6) IPFS API 

Instructions to execute  the project:

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
