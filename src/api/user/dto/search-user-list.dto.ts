import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEmpty,
} from 'class-validator';

export class SearchListDto {
  id?: number;
  nickname?: string;
  page?: number;
  pageSize?: number;
}
