#!/usr/bin/env python3
"""Module '2-fifo_cache.py' """
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """Class LIFOCache Represents a LIFO Cache"""

    def __init__(self):
        super().__init__()
        self.last_inserted_key = None

    def put(self, key, item):
        """Puts an item in cache with key key"""
        if key is None or item is None:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            del self.cache_data[self.last_inserted_key]
            print(f"DISCARD: {self.last_inserted_key}")
        self.last_inserted_key = key

    def get(self, key):
        """Gets an item from cache using key"""
        return self.cache_data.get(key, None)
