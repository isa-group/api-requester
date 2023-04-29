# Generic API Requester

This project is a simple API that make requests to URLs based on the request body. It can be used to deploy microservices infrastructures containing multiple services that interact with each other or with external APIs. The docker image is published on [Docker Hub](https://hub.docker.com/r/alesancor1/api-requester).

This project leverages the [OAS Tools v3](https://oas-tools.github.io) framework to route requests and simplify the development of the API. The API is defined in the [Open API Document](api/oas-doc.yaml) file and API documentation can be accessed at [http://localhost:8080/docs](http://localhost:8080/docs) once the API is deployed.

## How to use

The API can be deployed locally or containerized. The following sections explain how to deploy the API in both ways, and make requests to it.

### Local deployment

To deploy the API locally, you need to have [Node.js](https://nodejs.org/en/) installed. Once you have it, you can clone this repository and run the following command:

```bash
> npm start
```

This will start the API on port 8080. You can change the port by setting the environment variable `PORT` to the desired value.

### Containerized deployment

To deploy the API in a container, you need to have [Docker](https://www.docker.com/) installed. Once you have it, you can pull the image from Docker Hub and run it with the following commands:

```bash
> docker pull alesancor1/api-requester
> docker run -p 8080:8080 alesancor1/api-requester
```

### Deploying with Docker Compose

You can also deploy a microservice infrastructure using only this API through [Docker Compose](https://docs.docker.com/compose/). The following `docker-compose.yml` file shows an example with 3 services:

```yaml
version: "3.8"
services:
    microservice-one:
        container_name: microservice-one
        image: alesancor1/api-requester
        ports:
            - "8080:80"
    microservice-two:
        container_name: microservice-two
        image: alesancor1/api-requester
        ports:
            - "8081:80"
    microservice-three:
        container_name: microservice-three
        image: alesancor1/api-requester
        ports:
            - "8082:80"
```

### Making requests

Once the API is deployed, you can make POST requests to it. The request body must be a JSON object with the following structure:

```json
{
    "url": "https://example.com",
    "method": "GET",
    "headers": {
        "Content-Type": "application/json"
    },
    "body": {
        "key": "value"
    }
}
```

Additionally, having deployed multiple instances of the API, you can make requests to them from each other. For example, if you have deployed the API on port 8080 and 8081, you can make a request to the second one from the first one with the following body:

```json
[{
    "url": "http://localhost:8081/api/v1/request",
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    },
    "body": {
        "url": "https://example.com",
        "method": "GET"
    }
},
{
    "url": "https://example.com",
    "method": "GET"
}]
```

> Note that the above example declares an array instead of an object. When request body is an Array, the API will make a request to each element of the array and return an array with the responses.

## License
This project is licensed under the GNU GPLv3 License - see the [LICENSE](LICENSE) file for details.
