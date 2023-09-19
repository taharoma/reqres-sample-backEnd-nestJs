import { HttpStatus } from '@nestjs/common';

export function paginateResponseHandler(
  data: any[],
  totalCount: number,
  page: number,
  perPage: number,
) {
  const totalPages = Math.ceil(totalCount / perPage);

  return {
    page,
    per_page: perPage,
    total: totalCount,
    total_pages: totalPages,
    data,
    support: {
      url: 'https://droppgroup.com/',
      text: 'We shape the future with our software solutions',
    },
  };
}
