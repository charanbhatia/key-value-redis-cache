package main

import (
    "fmt"
    "key-value-cache/api"
    "key-value-cache/cache"
    "log"
)

func main() {
    c := cache.NewCache(100000)

    server := api.NewServer(c)
    fmt.Println("Starting server on :7171")
    if err := server.Start(":7171"); err != nil {
        log.Fatalf("Failed to start server: %v", err)
    }
}