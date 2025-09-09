# Key-Value Cache Service

A high-performance in-memory key-value cache service with HTTP API, implemented in Go and containerized with Docker.

## Overview

This project implements an in-memory Key-Value Cache service that handles basic operations:
- **PUT**: Insert or update a key-value pair
- **GET**: Retrieve a value for a given key

The service is optimized for performance under high load and is designed to run within resource constraints (2 core, 2 GB RAM).

## Features

- Fast in-memory storage with O(1) access time
- LRU (Least Recently Used) cache eviction strategy
- Thread-safe concurrent operations
- RESTful HTTP API interface
- Containerized with Docker for easy deployment
- Memory-efficient design to prevent Out-of-Memory errors

## API Endpoints

### PUT Operation
- **HTTP Method**: POST
- **Endpoint**: `/put`
- **Request Format**:
  ```json
  {
    "key": "string (max 256 characters)",
    "value": "string (max 256 characters)"
  }
  ```
- **Response Format**:
  ```json
  {
    "status": "OK",
    "message": "Key inserted/updated successfully."
  }
  ```

### GET Operation
- **HTTP Method**: GET
- **Endpoint**: `/get`
- **Query Parameter**: `key`
- **Example**: `/get?key=exampleKey`
- **Response Format** (success):
  ```json
  {
    "status": "OK",
    "key": "exampleKey",
    "value": "the corresponding value"
  }
  ```
- **Response Format** (key not found):
  ```json
  {
    "status": "ERROR",
    "message": "Key not found."
  }
  ```

## Technical Design

### Architecture

The project follows a clean architecture approach with the following components:
- **Cache**: Core in-memory storage with LRU eviction
- **API**: HTTP server with request validation and response formatting
- **Docker**: Containerization for consistent deployments


## Getting Started

### Prerequisites

- Docker

### Running the Service

The service is available as a Docker image on Docker Hub:

```bash
# Pull the image
docker pull charanbhatia/key-value-cache:latest

# Run the container
docker run -d -p 7171:7171 charanbhatia/key-value-cache:latest
```

The service will be available at http://localhost:7171

### Building from Source

```bash
# Clone the repository
git clone https://github.com/charanbhatia/key-value-redis-cache.git
cd key-value-redis-cache

# Build Docker image
docker build -t key-value-cache .

# Run container
docker run -d -p 7171:7171 key-value-cache
```

## Testing the Service

```bash
# Test PUT operation
curl -X POST http://localhost:7171/put \
  -H "Content-Type: application/json" \
  -d '{"key":"test-key","value":"test-value"}'

# Test GET operation
curl http://localhost:7171/get?key=test-key
```

## Vercel live link: https://key-value-redis-cache-1i57.vercel.app/home

## Performance Considerations

- The service is optimized for a balanced mix of GET and PUT operations
- LRU eviction ensures optimal memory usage under high load
- The service maintains low-latency responses even at high request volumes
- Designed to handle thousands of concurrent connections

