import { Module, Global, DynamicModule } from '@nestjs/common'

interface IOption {
    path: string
}

@Global()
@Module({

})
export class ConfigModule {
    static dynamicModule(option: IOption): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: "Config",
                    useValue: { baseApi: "/api" + option.path }
                }
            ],
            exports: [
                {
                    provide: "Config",
                    useValue: { baseApi: "/api" + option.path }
                }
            ]
        }

    }
} 