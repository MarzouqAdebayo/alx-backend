#!/usr/bin/env python3
"""Module '1-simple_pagination.py' contains
function index_range and class Server """
import csv
import math
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int]:
    """
    Take two integers and returns a tuple of size two containe the start
    and end indexes corresponding to the range of indexes to return in a list
    """
    start_idx = (page - 1) * page_size
    end_idx = page * page_size
    return (start_idx, end_idx)


class Server:
    """Server class to paginate a database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Gets paginated data"""
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0
        idx_range = index_range(page, page_size)
        if idx_range[0] >= len(self.dataset()):
            return []
        return self.__dataset[idx_range[0]:idx_range[1]]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Gets paginated data"""
        data = self.get_page(page, page_size)
        next_page = page + 1 if len(data) >= page_size else None
        prev_page = None if page <= 1 else page - 1
        return {
            'page_size': len(data),
            'page': page,
            'data': data,
            'next_page': next_page,
            'prev_page': prev_page,
            'total_pages': math.ceil(len(self.dataset()) / page_size)
        }
