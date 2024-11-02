#!/usr/bin/env python3
"""Module '1-fifo_cache.py' """
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """Class FIFOCache Represents a FIFO Cache"""

    def put(self, key, item):
        """Puts an item in cache with key key"""
        if key is None or item is None:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            first_key = [key for key in self.cache_data][0]
            del self.cache_data[first_key]
            print(f"DISCARD: {first_key}")

    def get(self, key):
        """Gets an item from cache using key"""
        return self.cache_data.get(key, None)
