import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    return this.userModel.find().skip(skip).limit(perPage);
  }

  async findOneWithEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findOneWithEmailSelectedPassword(email: string) {
    return await this.userModel.findOne({ email }).select('+password');
  }

  async countAll() {
    return this.userModel.countDocuments();
  }

  async findWithPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    return this.userModel.find().skip(skip).limit(perPage);
  }

  updateToken(id: string, token: string) {
    return this.userModel.findByIdAndUpdate(id, { token });
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id, // _id because by default mongo uses the _id variable
      },
      {
        $set: updateUserDto,
      },
      {
        new: true, // if this variable is omitted the query is never saved
      },
    );
  }

  remove(id: string) {
    return this.userModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
