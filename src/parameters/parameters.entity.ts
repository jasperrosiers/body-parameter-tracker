import {CosmosDateTime, CosmosPartitionKey} from "@dinohorvat/azure-database/dist";

@CosmosPartitionKey('userName')
export class ParametersEntity {
    userName: string;
    bodyWeight: {
        update: Date[],
        weight: number[]
    };
    fatPercentage: {
        update: Date[],
        percentage: number[]
    };
    musclePercentage: {
        update: Date[],
        percentage: number[]
    };
    @CosmosDateTime() createdAt: Date;
    @CosmosDateTime() updatedAt?: Date;


    constructor(userName: string, bodyWeight: { update: Date[]; weight: number[] }, fatPercentage: { update: Date[]; percentage: number[] }, musclePercentage: { update: Date[]; percentage: number[] }) {
        this.userName = userName;
        this.bodyWeight = bodyWeight;
        this.fatPercentage = fatPercentage;
        this.musclePercentage = musclePercentage;
    }
}
