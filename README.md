## Project Description

- Angular 14.0.0
- NestJs 9.0.0
- Client test coverage 100%
- Server test coverage 30%

### Preview

<img src="https://raw.githubusercontent.com/midnai/reign-challenge/main/preview.png" width="450"/>

### Docker commands

Command to build:
`docker-compose build`

Command to start:  
`docker-compose up`

Command to remove all images:  
`docker rmi -f $(docker images -a -q)`

Command to remove all containers:  
`docker rm -vf $(docker ps -a -q)`
