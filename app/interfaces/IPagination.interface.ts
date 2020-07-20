interface IPaginationResponseStandard {
  totalItems: number;
  perPage: number;
  items: Array<any>;
  totalPages: number;
}

interface IPaginationInfiniteScroll {
  perPage: number;
  currentPage: number;
}

export { IPaginationResponseStandard, IPaginationInfiniteScroll };
