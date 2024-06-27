import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEmpty,
} from 'class-validator';

export class SearchListDto {
  id?: number;
  username?: string;
  page?: number;
  pageSize?: number;
}
