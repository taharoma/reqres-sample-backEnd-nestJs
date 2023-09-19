import { HttpStatus } from '@nestjs/common';

export function singleResponseHandler(data: any) {
  return {
    data,
    support: {
      url: 'https://droppgroup.com/',
      text: 'We shape the future with our software solutions',
    },
  };
}
