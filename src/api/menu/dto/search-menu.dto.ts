import { IsNotEmpty } from 'class-validator';
export class SearchMenuDto {
    name?: string;
    status?: string;
    @IsNotEmpty({message:'page不能为空'})
    page: number;
    @IsNotEmpty({message:'pageSzie不能为空'})
    pageSize: number;
}
