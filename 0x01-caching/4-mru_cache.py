#!/usr/bin/env python3
"""Module '4-mru_cache.py' """
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """Class MRUCache Represents a MRU Cache"""

    def __init__(self):
        super().__init__()
        self.mru_key = None

    def put(self, key, item):
        """Puts an item in cache with key key"""
        if key is None or item is None:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            del self.cache_data[self.mru_key]
            print(f"DISCARD: {self.mru_key}")
        self.mru_key = key

    def get(self, key):
        """Gets an item from cache using key"""
        item = self.cache_data.get(key, None)
        if item is None:
            return item
        self.mru_key = key
        return item
