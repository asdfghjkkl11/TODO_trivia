# TODO_trivia

## initial setting (if not installed).
  ```
  sudo apt-get install git-core
  sudo apt-get install npm
  sudo apt-get install curl
  ```
## get clone from repository.
  ```
  git clone http://github.com/asdfghjkkl11/TODO_trivia.git
  cd TODO_trivia
  ```
## in ubuntu, realm can be used at node.js v8. so reinstall nodejs & realm.
  ```
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  sudo apt-get install -y nodejs
  sudo npm install nodemon
  sudo npm uninstall realm
  sudo npm install realm --allow-root=true  --unsafe-perm=true
  ```
## if modules are uninstalled, install modules below.
  ```
  sudo npm install express
  sudo npm install express-generator
  sudo npm install express-session
  sudo npm install session-file-store
  sudo npm install body-parser
  sudo npm install fs
  ```
## if you want start app, command these.
  ```
  npm node app.js //nodejs
  npm run serve //nodemon
  ```
you can experience at 

[aws EC2](http://13.125.216.93:3000)

[git](https://github.com/asdfghjkkl11/TODO_trivia.git)
