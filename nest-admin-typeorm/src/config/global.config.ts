import { Module, Global } from '@nestjs/common'

@Global()
@Module({
    providers: [
        {
            provide: "Config",
            useValue: { baseApi: "/api" }
        }
    ],
    exports: [
        {
            provide: "Config",
            useValue: { baseApi: "/api" }
        }
    ]
})
export class ConfigModule {

} 