import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { EmailModule } from './email/email.module';
import { BookingTourModule } from './booking-tour/booking-tour.module';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';
import { TourModule } from './tour/tour.module';
import { RatingModule } from './rating/rating.module';
import { LocationModule } from './location/location.module';
import { HotelModule } from './hotel/hotel.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions)
    ,UserModule, EmailModule, BookingTourModule, TourModule, RatingModule, LocationModule, HotelModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({path:'*',method:RequestMethod.ALL})
  }
}
