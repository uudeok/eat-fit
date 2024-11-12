import { FoodDataType } from '../@types';

export type DecodeFoodDataType = {
    id: number;
    foodName: string; // DESC_KOR: 음식 이름
    calories: number; // NUTR_CONT1: 칼로리 (kcal)
    carbohydrate: number; // NUTR_CONT2: 탄수화물 (g)
    protein: number; // NUTR_CONT3: 단백질 (g)
    fat: number; // NUTR_CONT4: 지방 (g)
    sugars?: number; // NUTR_CONT5: 당류 (g)
    sodium?: number; // NUTR_CONT6: 나트륨 (mg)
    cholesterol?: number; // NUTR_CONT7: 콜레스테롤 (mg)
    transFat?: number; // NUTR_CONT9: 트랜스지방 (g)
    servingSize: number; // SERVING_SIZE: 총 내용량
    content: string;
};

export type DecodeFoodDataListType = {
    foodList: DecodeFoodDataType[];
    isEmpty: boolean;
};

export const decodeFoodData = (init: FoodDataType): DecodeFoodDataType => ({
    id: parseInt(init.FOOD_CD.slice(1)),
    foodName: init.DESC_KOR,
    calories: parseFloat(init.NUTR_CONT1) || 0,
    carbohydrate: parseFloat(init.NUTR_CONT2) || 0,
    protein: parseFloat(init.NUTR_CONT3) || 0,
    fat: parseFloat(init.NUTR_CONT4) || 0,
    sugars: parseFloat(init.NUTR_CONT5) || 0,
    sodium: parseFloat(init.NUTR_CONT6) || 0,
    cholesterol: parseFloat(init.NUTR_CONT7) || 0,
    transFat: parseFloat(init.NUTR_CONT9) || 0,
    servingSize: parseFloat(init.SERVING_SIZE) || 0,
    content: '',
});

export const docodeFoodDataList = (init: FoodDataType[]): DecodeFoodDataListType => ({
    foodList: init.map(decodeFoodData),
    isEmpty: init.length === 0,
});
