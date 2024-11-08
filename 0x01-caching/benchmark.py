#!/usr/bin/env python3
import time
import random


def genvalues(operations=10000):
    ops = []
    keys = []

    for i in range(operations):
        op = random.random()
        key = str(random.randint(1, 100))
        ops.append(op)
        keys.append(key)
    return (keys, ops)


def benchmark_implementation(cache_impl, items, operations=10000):
    cache = cache_impl()
    start_time = time.time()

    # Simulate mixed operations
    for key, op in zip(items[0], items[1]):
        # op = random.random()
        # key = str(random.randint(1, 100))

        if op < 0.6:  # 60% puts
            cache.put(key, f"value_{key}")
        else:  # 40% gets
            cache.get(key)

    end_time = time.time()
    return end_time - start_time


LFUCacheA = __import__("lfu_impl").LFUCache
LFUCacheB = __import__("100-lfu_cache").LFUCache

# Generate values
items = genvalues()
# Run benchmarks
impl_a_time = benchmark_implementation(LFUCacheA, items)
impl_b_time = benchmark_implementation(LFUCacheB, items)

print(f"Implementation A time: {impl_a_time:.4f} seconds")
print(f"Implementation B time: {impl_b_time:.4f} seconds")
