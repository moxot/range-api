import { IsDateString, IsString } from 'class-validator';

export class RangesDTO {
    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsString()
    vehicleId: string;
}
