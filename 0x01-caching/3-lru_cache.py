#!/usr/bin/env python3
"""Module '3-lru_cache.py' """
from collections import deque
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """Class LRUCache Represents a LRU Cache"""

    def __init__(self):
        super().__init__()
        self.lru = deque()

    def put(self, key, item):
        """Puts an item in cache with key key"""
        if key is None or item is None:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            least_recently_used = self.lru.popleft()
            del self.cache_data[least_recently_used]
            print(f"DISCARD: {least_recently_used}")
        if key in self.lru:
            self.lru.remove(key)
        self.lru.append(key)

    def get(self, key):
        """Gets an item from cache using key"""
        item = self.cache_data.get(key, None)
        if item is None:
            return item
        if key in self.lru:
            self.lru.remove(key)
        self.lru.append(key)
        return item
