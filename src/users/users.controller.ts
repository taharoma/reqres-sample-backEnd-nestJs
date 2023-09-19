import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UseGuards,
  Query,
  ParseIntPipe,
  NotFoundException,
  Put,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { CreateNewUserMiddleware } from '../middleware/validators/users/createNewUser';
import { CreateNewUserByClient } from '../middleware/validators/users/createNewUserByClient';
import { MailService } from '../nest-mailer/mail.service';
import { Heimdall } from '../middleware/heimdall';
import { DelayMiddleware } from '../middleware/delayed';
import { IsAdmin } from '../middleware/isAdmin';
import ArgonService from '../utils/argon';
import generateToken from '../jwt/generateToken';
import { ErrorHandler, LoginResponseHandler } from '../handler';
import { paginateResponseHandler } from 'src/handler/paginateResponseHandler';
import { singleResponseHandler } from 'src/handler/singleResponseHandler';
interface UserRequest {
  userId: string;
  role: string;
}

@Controller('users')
export class UsersController {
  constructor(
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const to = loginUserDto.email;
    const subject = 'Login successful';
    const html = '<h1>WelCome to my Project</h1>';

    await this.mailService.sendMail(to, subject, html);
    const foundedUser = await this.usersService.findOneWithEmail(
      loginUserDto.email,
    );

    if (!foundedUser) {
      throw new ErrorHandler('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await ArgonService.comparePassword(
      loginUserDto.password,
      foundedUser.password,
    );

    if (!isPasswordValid) {
      throw new ErrorHandler('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const token = await generateToken({
      payload: { userId: foundedUser._id, role: foundedUser.role },
    });

    await this.usersService.updateToken(foundedUser._id, token);

    return LoginResponseHandler.handle({ token: token }, HttpStatus.ACCEPTED);
  }

  @Post()
  @UseInterceptors(Heimdall, IsAdmin, CreateNewUserMiddleware)
  async create(@Body() createUserDto: CreateUserDto) {
    const isEmailExist = await this.usersService.findOneWithEmail(
      createUserDto.email,
    );
    if (isEmailExist)
      throw new ErrorHandler('Email already exists', HttpStatus.CONFLICT);
    console.log({ isEmailExist });
    createUserDto.password = await ArgonService.hashPassword(
      createUserDto.password,
    );
    return await this.usersService.create(createUserDto);
  }

  @Post('register')
  @UseInterceptors(CreateNewUserByClient)
  async createClientWithoutToken(@Body() createUserDto: CreateUserDto) {
    const isEmailExist = await this.usersService.findOneWithEmail(
      createUserDto.email,
    );
    if (isEmailExist)
      throw new ErrorHandler('Email already exists', HttpStatus.CONFLICT);
    console.log({ isEmailExist });
    createUserDto.password = await ArgonService.hashPassword(
      createUserDto.password,
    );
    return await this.usersService.create(createUserDto);
  }

  @Put(':id')
  @UseInterceptors(Heimdall)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: UserRequest,
  ) {
    const foundedUser = await this.usersService.findOne(id);
    if (!foundedUser) {
      throw new ErrorHandler('user not found', HttpStatus.NOT_FOUND);
    }
    if (updateUserDto?.password)
      updateUserDto.password = await ArgonService.hashPassword(
        updateUserDto.password,
      );

    if (
      (req.role === 'CLIENT' && req.userId !== id) ||
      updateUserDto.role === 'ADMIN'
    ) {
      throw new ErrorHandler('AUTH_FAILED', HttpStatus.FORBIDDEN);
    }

    return this.usersService.update(id, updateUserDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 6,
  ) {
    const users = await this.usersService.findWithPagination(page, perPage);
    const totalCount = await this.usersService.countAll();

    return paginateResponseHandler(users, totalCount, page, perPage);
  }

  @Get('delayed')
  @UseInterceptors(DelayMiddleware)
  async delayed(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 6,
  ) {
    const delayTime = 50000;
    const users = await this.usersService.findWithPagination(page, perPage);
    const totalCount = await this.usersService.countAll();

    return paginateResponseHandler(users, totalCount, page, perPage);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException([]);
    }

    return singleResponseHandler(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: UserRequest) {
    if (req.role === 'CLIENT' && req.userId !== id)
      throw new ErrorHandler('AUTH_FAILED', HttpStatus.FORBIDDEN);
    const foundedUser = await this.usersService.findOne(id);
    if (!foundedUser) {
      throw new ErrorHandler('user not found', HttpStatus.NOT_FOUND);
    }
    return this.usersService.remove(id);
  }
}
