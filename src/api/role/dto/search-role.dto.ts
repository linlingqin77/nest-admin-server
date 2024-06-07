import { IsNotEmpty } from 'class-validator';
export class SearchRoleDto {
    name: string;
    code: string;
    status: string;
    start_time: string;
    end_time: string;
    page: number;
    pageSize: number;
    all: number
}
