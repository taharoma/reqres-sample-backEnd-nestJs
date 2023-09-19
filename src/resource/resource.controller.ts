import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { ResourceService } from './resource.service';
import { ErrorHandler, LoginResponseHandler } from '../handler';
import { paginateResponseHandler } from 'src/handler/paginateResponseHandler';
import { singleResponseHandler } from 'src/handler/singleResponseHandler';
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  @UseInterceptors()
  async create(@Body() createResourceDto: CreateResourceDto) {
    return await this.resourceService.create(createResourceDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 6,
  ) {
    const users = await this.resourceService.findWithPagination(page, perPage);
    const totalCount = await this.resourceService.countAll();

    return paginateResponseHandler(users, totalCount, page, perPage);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.resourceService.findOne(id);

    if (!user) {
      throw new NotFoundException([]);
    }

    return singleResponseHandler(user);
  }
}
