# Approaches

1- Project is created in Node js and Express js.\
2- Created the server and established a mongodb atlas connection so that we don't need to hassle install mondodb locally.
Mongodb is used in this project over sql databases because we can easily change schema frequently for starter projects.\
3- Routes and Controllers defined to make logic separate from the routes\
4- Created Models Definition for Dispenser and Record for saving data in database\
5- Routing Configured in one place so that all routing logic will be easy to manage \
6- Refactored the code by creating utility functions so that we don't have to repeat same logic in multiple places.

# How to start project

1. Install dependencies by running this command

```shell
yarn install
```

2. Copy and past .env.example file to .env file and change mongodb uri variable to your mongodb database uri.
3. Start the project by running this command

```shell
  yarn start
```

# End points

```
// To create
POST http://localhost:8000/api/dispenser
{
  "flow_volume": 12
}


```

```
// To open and close the tap
POST http://localhost:8000/api/dispenserOpenClose/{dispenserId}



```

```
// To get the record
Get http://localhost:8000/api/revenue

```
