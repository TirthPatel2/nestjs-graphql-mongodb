import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return (await this.userService.create(createUserInput)) as User;
  }

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return (await this.userService.findAll()) as User[];
  }

  @Query(() => User, { name: 'user', nullable: true })
  async findOne(@Args('id') id: string): Promise<User | null> {
    return ((await this.userService.findOne(id)) as User) || null;
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: string) {
    return (await this.userService.remove(id)) !== null;
  }
}
