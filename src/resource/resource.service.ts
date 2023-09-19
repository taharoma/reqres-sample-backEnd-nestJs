import { Injectable } from '@nestjs/common';
import { Resource, ResourceDocument } from './entities/resource.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateResourceDto } from './dto/create-resource.dto';
import { Model } from 'mongoose';

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel(Resource.name) private resourceModel: Model<ResourceDocument>,
  ) {}

  create(createResourceDto: CreateResourceDto) {
    const result = new this.resourceModel(createResourceDto);
    return result.save();
  }

  async countAll() {
    return this.resourceModel.countDocuments();
  }

  async findWithPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    return this.resourceModel.find().skip(skip).limit(perPage);
  }

  async findOne(id: string) {
    return await this.resourceModel.findById(id);
  }
}
