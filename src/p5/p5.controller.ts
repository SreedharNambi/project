import { Controller, Get, Param } from '@nestjs/common';
import { P5Service } from './p5.service';

@Controller('p5')
export class P5Controller {
    constructor(private readonly p5Service:P5Service){}

    @Get('/:id')
    async getP5Balance(@Param('id') id:string){
        return await this.p5Service.getP5Balance(id);
    }
}
