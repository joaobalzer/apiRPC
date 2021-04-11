# RPC API V1.0.0

-This api counsumes "Globo`s lineup" api to show the programmes of the user`s acess or required date

## Installing the project

- Clone the project to you local machine or server;
- Open the root diretory;
- Make sure you have NodeJS, NPM, and YARN installed in your enviroment;
- Create a file on root diretory, called `.env`;
- The `.env` file contains private variables that must not be exposed on the web for security purposes. **You might get these keys with a system administrator**;
- Run `yarn install`;
- Run `yarn dev` to development mode (_default on port 8080_);

> Disclaimer of liability: this version do not have production configurations yet; I do not recommend using this version of the project for production purposes.

### API Usage

> The api is deployed at heroku in the link: https://rpcapi.herokuapp.com/
> The api have 2 routes:

> GET . api/lineup/rpc/now.  Example:(https://rpcapi.herokuapp.com/api/lineup/rpc/now) wich you can see in the highlight the program that is LIVE, and all the other programs 


> GET . api/lineup?dateRef=YYYY-MM-DD Example: (https://rpcapi.herokuapp.com/api/lineup?dateRef=2021-04-10)  wich you can see all the programmes of an specific filter with information Based in (https://redeglobo.globo.com/sao-paulo/programacao/)

> Any other questions of the usage  you can check the postman colletion in this repository

