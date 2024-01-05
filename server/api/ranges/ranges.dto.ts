import {
    IsDateString,
    IsString,
    Validate,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isStartDateBeforeEndDate', async: false })
export class IsStartDateBeforeEndDate implements ValidatorConstraintInterface {
    validate(startDate: string, args: ValidationArguments) {
        const object = args.object as RangesDTO;
        return new Date(startDate).getTime() < new Date(object.endDate).getTime();
    }

    defaultMessage() {
        return 'startDate must be less than endDate';
    }
}

export class RangesDTO {
    @IsDateString()
    @Validate(IsStartDateBeforeEndDate, ['endDate'])
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsString()
    vehicleId: string;
}
