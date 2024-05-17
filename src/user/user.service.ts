import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserServiceInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(cretaeUserInput: CreateUserInput): Promise<User> {
    const user = new this.userModel(cretaeUserInput);

    await user.save();

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    console.log(id);
    return this.userModel.findById(id);
  }

  async update(
    id: string,
    updateUserInput: UpdateUserServiceInput,
  ): Promise<User> {
    const user = JSON.parse(JSON.stringify(await this.findOne(id)));

    await this.userModel.findByIdAndUpdate(id, updateUserInput);

    return {
      ...user,
      ...updateUserInput,
    };
  }

  async remove(id: string): Promise<number> {
    return this.userModel.findByIdAndDelete(id);
  }
}
