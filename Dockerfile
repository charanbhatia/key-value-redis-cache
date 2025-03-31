# Build stage
FROM golang:1.23 AS build

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod ./

# Download dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o key-value-cache .

# Final stage
FROM alpine:3.18

# Install ca-certificates for HTTPS
RUN apk --no-cache add ca-certificates

# Set working directory
WORKDIR /app

# Copy the binary from the build stage
COPY --from=build /app/key-value-cache .

# Expose port 7171
EXPOSE 7171

# Run the application
CMD ["./key-value-cache"]