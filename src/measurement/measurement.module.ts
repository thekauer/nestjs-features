import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { MeasurementRepository } from './measurement.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [],
  controllers: [MeasurementController],
  exports: [MeasurementService, MeasurementRepository],
  providers: [MeasurementService, MeasurementRepository],
})
export class MeasurementModule {}
