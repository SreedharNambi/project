import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    // View all users
    @Get()
    async getAll(@Query('limit') limit:number, @Query('offset') offset:number){
        return await this.userService.getAll(limit || 10, offset  || 0);
    }

    // View User
    @Get('/:id')
    async getById(@Param('id')id:string){
        return await this.userService.getById(id);
    }

    // Create User
    @Post('new')
    async createUser(@Body() data:any){
        return await this.userService.createUser(data);
    }

    // Update user details
    @Patch()
    async updateUser(@Param() id:string, @Body() data:any){
        return await this.userService.updateUser(id, data);
    }
}
