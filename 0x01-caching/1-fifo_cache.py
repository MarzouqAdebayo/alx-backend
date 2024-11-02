#!/usr/bin/env python3
"""Module '1-fifo_cache.py' """
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """Class FIFOCache Represents a FIFO Cache"""

    def put(self, key, item):
        """Puts an item in cache with key key"""
        if key is None or item is None:
            return
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            temp = [key for key in self.cache_data]
            to_discard_key = temp.pop(0)
            del self.cache_data[to_discard_key]
            print(f"DISCARD: {key}")
        self.cache_data[key] = item

    def get(self, key):
        """Gets an item from cache using key"""
        return self.cache_data.get(key, None)
