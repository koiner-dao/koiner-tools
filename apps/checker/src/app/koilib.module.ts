import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Provider, Signer } from 'koilib';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: Provider,
      useFactory: (configService: ConfigService) => {
        return new Provider(
          configService.get<string[]>('koinos.rpcNodes'),
        );
      },
      inject: [ConfigService],
    },
    {
      provide: Signer,
      useFactory: (configService: ConfigService) => {
        return Signer.fromSeed(configService.get<string>('koinos.signerSeed'));
      },
      inject: [ConfigService],
    },
  ],
  exports: [Provider, Signer],
})
export class KoilibModule {}
