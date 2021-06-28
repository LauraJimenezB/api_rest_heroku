import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LogInUserDto } from './dto/login-user.dto';

@ApiTags('authentication and authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Post(':emailToken/confirm')
  confirmEmail(@Param('emailToken') emailToken: string) {
    return this.authService.confirm(emailToken);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() body: LogInUserDto) {
    return this.authService.login(body.email, body.password);
  }
}
