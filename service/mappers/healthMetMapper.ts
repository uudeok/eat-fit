import { HealthMetApiResponse } from '../@types';

export type DecodeHealthMetDataType = {
    id: number;
    met: number;
    exerciseName: string;
};

export type DecodeHealthMetListType = {
    metList: DecodeHealthMetDataType[];
    isEmpty: boolean;
};

export const decodeHealthMetData = (init: HealthMetApiResponse): DecodeHealthMetDataType => ({
    id: init.id,
    met: init.met,
    exerciseName: init.exercise_name,
});

export const decodeHealthMetList = (init: HealthMetApiResponse[]): DecodeHealthMetListType => ({
    metList: init.map(decodeHealthMetData),
    isEmpty: init.length === 0,
});
