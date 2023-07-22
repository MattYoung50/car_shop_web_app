# Example Node/Express RESTFul Server

## Running
This server consists of a simple node.js server with a set of routes for car shop entries
- GET /cars - fetch all cars
- POST /cars - create a new car entry
- GET /cars/:id - fetch car by id
- PUT /cars/:id - update car by id
- DELETE /cars/:id - delete car by id

You can see how its structure in the carshop.yaml openapi 3.0 spec. 

All requests were tested by using postman and importing the carshop.yml openapi file. The curl commands below were copied from what postman generated for me. *I recommend using postman since that's how I tested it*

`GET: To get all car entries`
```shell
curl --location 'http://localhost:3000/cars' \
--header 'Accept: application/json'
```

`POST: To create a new car entry`
```shell
curl -X 'POST' \
  'http://localhost:3000/cars' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "vin": "string",
  "plate": "string",
  "state": "string",
  "make": "string",
  "model": "string",
  "year": "string",
  "owner": {
    "name": "string",
    "address": "string",
    "license": "string"
  },
  "ticket": {
    "description": "string",
    "in_time": "string",
    "out_time": "string",
    "workers": "string"
  }
}'
```

`GET: To get car entry by id (where 6496fb909aca1913801a42es is the id of that entry)`
```shell
curl --location 'http://localhost:3000/cars/6496fb909aca1913801a42es' \
--header 'Accept: application/json' \
--data ''
```

`PUT: To update car entry by id (where 6496fb909aca1913801a42es is the id of that entry)`
```shell
curl --location --request PUT 'http://localhost:3000/cars/6496fb909aca1913801a42ee' \
--header 'Content-Type: application/json' \
--data '{
    "vin": "sdrgesaddsf",
    "plate": "wefdasdfdsa",
    "state": "Alabama",
    "make": "Ford",
    "model": "F150",
    "year": "2001",
    "owner": {
        "name": "Matt",
        "address": "Young",
        "license": "mylicensenumber"
    },
    "ticket": {
        "description": "air conditioning doesn'\''t work anymore",
        "in_time": "06/24/2023 1:47 PM CST",
        "out_time": "TBD",
        "workers": "Donald Trump"
    }
}'
```

`DELETE: To delete car entry by id (where 6496fb909aca1913801a42es is the id of that entry)`
```shell
curl --location --request DELETE 'http://localhost:3000/cars/649732c1f3c1ee458b9174c4'
```

`GET: To get part price and delivery date by id using a soap web service`
```shell
curl --location 'http://localhost:3000/cars/partprice/1234'
```

To run, 
```shell
docker-compose build 
```
this will express image and pull the mongo image if need be. 
```shell
docker-compose up
```
This will start the two containers (express app & mongo)

To make sure its working got to [http://localhost:3000/cars](http://localhost:3000/cars)

To close the containers, you can hit ctrl^c in the terminal you started it in or 
```shell
docker-compose down -v 
```