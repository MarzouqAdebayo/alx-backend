#!/usr/bin/env python3
"""Module '100-lfu_cache.py' """
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """Class LFUCache Represents a LFU Cache"""

    def __init__(self):
        super().__init__()
        self.lfu_map = {}

    def put(self, key, item):
        """Puts an item in cache with key key"""
        if key is None or item is None:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            sorted_items = sorted(self.lfu_map.items(), key=lambda x: x[1])
            lfu_key = sorted_items[0][0]
            del self.cache_data[lfu_key]
            del self.lfu_map[lfu_key]
            print(f"DISCARD: {lfu_key}")
        if key in self.lfu_map:
            self.lfu_map[key] += 1
        else:
            self.lfu_map[key] = 1

    def get(self, key):
        """Gets an item from cache using key"""
        item = self.cache_data.get(key, None)
        if item is None:
            return item
        if key in self.lfu_map:
            self.lfu_map[key] += 1
        else:
            self.lfu_map[key] = 1
        return item
