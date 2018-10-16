# network-insight-service
# To start app:
1. Pre-requisites
   - NodeJS 8.X
        - curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
        - nano nodesource_setup.sh
        - sudo bash nodesource_setup.sh
        - sudo apt-get install nodejs
    - node-gyp
1. clone this repo from github
2. cd to network-insight-service
3. run: npm install
4. run: utils/get-remote-config.sh with appropriate parameters
6. run: npm start

  If it shows up: [API Server is running at http://localhost:3000/] means that api server is started up successfuly.
