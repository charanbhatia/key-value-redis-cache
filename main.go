package main

import (
	"fmt"
	"key-value-cache/cache"
)

func main() {
	// Create a new cache with a capacity of 100 items
	c := cache.NewCache(100)

	// Test putting and getting values
	c.Put("key1", "value1")
	c.Put("key2", "value2")

	if val, ok := c.Get("key1"); ok {
		fmt.Printf("key1: %s\n", val)
	} else {
		fmt.Println("key1 not found")
	}

	if val, ok := c.Get("key2"); ok {
		fmt.Printf("key2: %s\n", val)
	} else {
		fmt.Println("key2 not found")
	}

	if val, ok := c.Get("key3"); ok {
		fmt.Printf("key3: %s\n", val)
	} else {
		fmt.Println("key3 not found")
	}

	fmt.Printf("Cache size: %d\n", c.Len())
}
