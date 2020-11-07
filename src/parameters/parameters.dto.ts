import { IsNotEmpty } from "class-validator";

export class ParametersDto {
    @IsNotEmpty()
    userName: string;
    bodyWeight: number;
    fatPercentage: number;
    musclePercentage: number;
}
