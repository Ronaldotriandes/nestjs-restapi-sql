import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseFilters,
} from '@nestjs/common';
import * as Joi from 'joi';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { CREATE, JoiSchema, JoiSchemaOptions, UPDATE } from 'nestjs-joi';
import { HttpExceptionFilter } from 'src/error/http.exception';

class UserValidation {
  @JoiSchema(Joi.string().required())
  @JoiSchema([CREATE], Joi.string().required())
  @JoiSchema([UPDATE], Joi.string().optional())
  fullname!: string;

  @JoiSchema(Joi.string().required())
  @JoiSchema([CREATE], Joi.string().required())
  @JoiSchema([UPDATE], Joi.string().optional())
  username!: string;

  @JoiSchema(Joi.string().required())
  @JoiSchema([CREATE], Joi.string().required())
  @JoiSchema([UPDATE], Joi.string().optional())
  address!: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}
  @Get()
  findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Post()
  store(@Body() user: User): Promise<User> {
    return this.service.store(user);
  }
}
