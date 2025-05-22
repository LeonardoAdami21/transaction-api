<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Transaction Statistics API

A RESTful API built with NestJS and TypeScript following Clean Architecture principles. The API manages transactions and provides real-time statistics for transactions occurring within the last 60 seconds.

## Features

- **Transaction Management**: Create and delete transactions
- **Real-time Statistics**: Get statistics for transactions in the last 60 seconds
- **Clean Architecture**: Proper separation of concerns with Controllers, Use Cases, Entities, and Repositories
- **Comprehensive Testing**: Unit and integration tests with high coverage
- **Security**: Rate limiting, input validation, and security headers
- **Monitoring**: Structured logging with Pino and health check endpoint
- **API Documentation**: Swagger/OpenAPI documentation
- **Docker Support**: Full containerization with Docker and Docker Compose

## Tech Stack

- **Framework**: NestJS with TypeScript
- **Architecture**: Clean Architecture with SOLID principles
- **Testing**: Jest for unit and integration tests
- **Logging**: Pino for structured logging
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet.js, Rate limiting, Input validation
- **Containerization**: Docker and Docker Compose

## API Endpoints

### Transactions

#### Create Transaction

```http
POST /transactions
Content-Type: application/json

{
  "amount": 123.45,
  "timestamp": "2024-02-20T12:34:56.789Z"
}
```

**Responses:**

- `201 Created`: Transaction created successfully
- `400 Bad Request`: Invalid JSON or validation errors
- `422 Unprocessable Entity`: Business rule violations (negative amount, future timestamp)

#### Delete All Transactions

```http
DELETE /transactions
```

**Responses:**

- `200 OK`: All transactions deleted successfully

### Statistics

#### Get Statistics

```http
GET /statistics
```

**Response:**

```json
{
  "count": 10,
  "sum": 1234.56,
  "avg": 123.45,
  "min": 12.34,
  "max": 456.78
}
```

**Note**: Only includes transactions from the last 60 seconds.

### Health Check

#### Health Status

```http
GET /health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-02-20T12:34:56.789Z"
}
```

## Installation and Setup

### Prerequisites

- Node.js 18+
- Yarn or npm
- Docker (optional)

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd transaction-api
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   ```

4. **Run the application**

   ```bash
   # Development mode
   yarn start:dev

   # Production mode
   yarn build
   yarn start:prod
   ```

5. **Access the application**
   - API: http://localhost:7000
   - Swagger Documentation: http://localhost:3000/v2/docs
   - Health Check: http://localhost:7000/v2/health

### Docker Deployment

1. **Using Docker Compose (Recommended)**

   ```bash
   docker-compose up --build
   ```

2. **Using Docker directly**

   ```bash
   # Run the container
   docker compose up --build

   # Stop the container
   docker compose down
   ```

## Testing

### Run All Tests

```bash
# Unit tests
yarn test

# Unit tests with coverage
yarn test:cov

# Integration tests
yarn test:e2e

# Watch mode
yarn test:watch
```

### Test Coverage

The project maintains high test coverage with comprehensive unit and integration tests covering:

- Domain entities and business logic
- Use cases and application services
- API endpoints and error handling
- Repository implementations

## Project Structure

```
src/
├── application/           # Application layer
│   ├── dtos/             # Data Transfer Objects
│   └── use-cases/        # Business use cases
├── domain/               # Domain layer
│   ├── entities/         # Business entities
│   └── repositories/     # Repository interfaces
├── infrastructure/       # Infrastructure layer
│   ├── filters/          # Exception filters
│   ├── logger/          # Logging service
│   └── repositories/    # Repository implementations
├── modules/             # NestJS modules
│   ├── health/         # Health check module
│   └── transaction/    # Transaction module
└── main.ts             # Application entry point
```

## Architecture

The project follows Clean Architecture principles with clear separation of concerns:

- **Controllers**: Handle HTTP requests and responses
- **Use Cases**: Implement business logic and orchestrate operations
- **Entities**: Define business objects and rules
- **Repositories**: Abstract data access layer
- **Infrastructure**: External concerns (logging, validation, etc.)

## Security Features

- **Rate Limiting**: Prevents API abuse with configurable limits
- **Input Validation**: Comprehensive validation using class-validator
- **Security Headers**: Helmet.js for basic security protections
- **Error Handling**: Secure error responses without sensitive information
- **Structured Logging**: Security events and audit trails

## Performance Considerations

- **In-Memory Storage**: Fast data access for the 60-second time window
- **Efficient Time Window Queries**: Optimized filtering for recent transactions
- **Minimal Dependencies**: Lightweight runtime with essential packages only
- **Stateless Design**: Horizontally scalable architecture

## Monitoring and Observability

- **Structured Logging**: JSON-formatted logs with Pino
- **Health Checks**: Kubernetes-ready health endpoint
- **Error Tracking**: Comprehensive exception handling and logging
- **Request Tracing**: Request/response logging for debugging

## Development Guidelines

### Code Quality

- **TypeScript**: Strict typing and modern JavaScript features
- **ESLint + Prettier**: Code formatting and linting
- **Clean Code**: SOLID principles and clean code practices
- **Testing**: Test-driven development with high coverage

### Git Workflow

- Feature branches for new functionality
- Commit messages following conventional commits
- Pull request reviews required
- Automated testing in CI/CD pipeline

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Ensure all tests pass
5. Submit a pull request

## License

This project is licensed under the MIT License.

## API Documentation

Once the application is running, visit http://localhost:3000/api to access the interactive Swagger documentation where you can test all endpoints and view detailed API specifications.

- Obs: Before accessing the documentation, you need to run the application in development mode. And use 
LTS version of Node.js or Node.js 22.14.0.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```


## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
