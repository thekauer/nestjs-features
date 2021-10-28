import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import Measurement from './measurement.entity';
import { MeasurementService } from './measurement.service';

@Controller('measurement')
export class MeasurementController {
  constructor(private measurementService: MeasurementService) {}
  @Get()
  getAll() {
    return this.measurementService.getAll();
  }
  @Post('create')
  create(@Body() data: Measurement) {
    return this.measurementService.create(data);
  }
  @Delete('delete')
  delete() {
    return this.measurementService.deleteAll();
  }
  @Delete('delete/:id')
  deleteById(@Param('id') id: number) {
    return this.measurementService.deleteById(id);
  }
}
