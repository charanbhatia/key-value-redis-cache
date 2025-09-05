package main

import (
    "fmt"
    "key-value-cache/api"
    "key-value-cache/cache"
    "log"
    "os"
)

func main() {
    c := cache.NewCache(100000)

    server := api.NewServer(c)
    
    // Get port from environment variable (Render will set this)
    port := os.Getenv("PORT")
    if port == "" {
        port = "7171" // Default port for local development
    }
    
    addr := ":" + port
    fmt.Printf("Starting server on %s\n", addr)
    if err := server.Start(addr); err != nil {
        log.Fatalf("Failed to start server: %v", err)
    }
}