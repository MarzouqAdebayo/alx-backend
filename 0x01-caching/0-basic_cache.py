#!/usr/bin/env python3
"""Module '0-basic_cache.py' """
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """BasicCache that inherits from
    from class BaseCaching
    Represents a Cache
    """

    def put(self, key, item):
        """Puts an item in cache with key key"""
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """Gets an item from cache using key"""
        return self.cache_data.get(key, None)
