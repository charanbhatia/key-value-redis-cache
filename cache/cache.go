package cache

import (
	"sync"
)

type Cache struct {
	lru   *LRUCache
	mutex sync.RWMutex
}

func NewCache(capacity int) *Cache {
	return &Cache{
		lru: NewLRU(capacity),
	}
}

func (c *Cache) Get(key string) (string, bool) {
	c.mutex.RLock()
	defer c.mutex.RUnlock()
	return c.lru.Get(key)
}

func (c *Cache) Put(key, value string) {
	c.mutex.Lock()
	defer c.mutex.Unlock()
	c.lru.Put(key, value)
}

func (c *Cache) Len() int {
	c.mutex.RLock()
	defer c.mutex.RUnlock()
	return c.lru.Len()
}
