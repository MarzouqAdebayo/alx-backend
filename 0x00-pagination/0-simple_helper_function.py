#!/usr/bin/env python3
"""Module '0-simple_helper_function.py' contains function index_range """
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int]:
    """
    Take two integers and returns a tuple of size two containe the start
    and end indexes corresponding to the range of indexes to return in a list
    """
    start_idx = (page - 1) * page_size
    end_idx = page * page_size
    return (start_idx, end_idx)
