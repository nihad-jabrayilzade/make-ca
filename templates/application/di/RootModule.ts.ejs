import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { InfrastructureModule } from "@application/di/InfrastructureModule";
import { ApplicationModule } from "@application/di/ApplicationModule";
import { FeatureModule } from "@application/di/FeatureModule";
import { RestApiResponseInterceptor } from "@application/api/rest/common/interceptor/RestApiResponseInterceptor";
import { RestApiHttpExceptionFilter } from "@application/api/rest/common/filter/RestApiHttpExceptionFilter";

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          stopAtFirstError: true,
          transformOptions: {
            exposeUnsetFields: false,
          },
        }),
    },
    {
      provide: APP_FILTER,
      useClass: RestApiHttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RestApiResponseInterceptor,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", `.env.${process.env.NODE_ENV}`],
    }),

    FeatureModule,
    ApplicationModule,
    InfrastructureModule,
  ],
})
export class RootModule {}
