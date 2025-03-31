package cache

import (
	"container/list"
	"sync"
)

type LRUCache struct {
	capacity int
	items    map[string]*list.Element
	queue    *list.List
	mutex    sync.RWMutex
}

type entry struct {
	key   string
	value string
}

func NewLRU(capacity int) *LRUCache {
	return &LRUCache{
		capacity: capacity,
		items:    make(map[string]*list.Element),
		queue:    list.New(),
	}
}

func (c *LRUCache) Get(key string) (string, bool) {
	c.mutex.RLock()
	defer c.mutex.RUnlock()

	if elem, ok := c.items[key]; ok {
		c.queue.MoveToFront(elem)
		return elem.Value.(*entry).value, true
	}
	return "", false
}

func (c *LRUCache) Put(key, value string) {
	c.mutex.Lock()
	defer c.mutex.Unlock()

	if elem, ok := c.items[key]; ok {
		c.queue.MoveToFront(elem)
		elem.Value.(*entry).value = value
		return
	}

	if c.queue.Len() >= c.capacity {
		oldest := c.queue.Back()
		if oldest != nil {
			c.queue.Remove(oldest)
			delete(c.items, oldest.Value.(*entry).key)
		}
	}

	elem := c.queue.PushFront(&entry{key, value})
	c.items[key] = elem
}

func (c *LRUCache) Len() int {
	c.mutex.RLock()
	defer c.mutex.RUnlock()
	return len(c.items)
}
