import { FoodApiResponse, FoodItemType } from '../@types';

export type DecodeFoodMetaDataType = {
    pageNum: number;
    pageSize: number;
    totalCount: number;
};

export type DecodeFoodDataType = {
    id: number;
    foodName: string;
    calories: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    sugars?: number;
    sodium?: number;
    cholesterol?: number;
    transFat?: number;
    servingSize: number;
    content: string;
};

export type DecodeFoodDataListType = {
    foodList: DecodeFoodDataType[];
    isEmpty: boolean;
    meta: DecodeFoodMetaDataType;
};

export const decodeFoodData = (init: FoodItemType): DecodeFoodDataType => ({
    id: Number(init.NUM),
    foodName: init.FOOD_NM_KR,
    calories: Number(init.AMT_NUM1) || 0,
    carbohydrate: Number(init.AMT_NUM7) || 0,
    protein: Number(init.AMT_NUM3) || 0,
    fat: Number(init.AMT_NUM4) || 0,
    sugars: Number(init.AMT_NUM8) || 0,
    sodium: Number(init.AMT_NUM14) || 0,
    cholesterol: Number(init.AMT_NUM24) || 0,
    transFat: Number(init.AMT_NUM26) || 0,
    servingSize: Number(init.SERVING_SIZE.replace('g', '').trim()) || 0,
    content: '',
});

export const decodeFoodMetaData = (init: FoodApiResponse): DecodeFoodMetaDataType => ({
    pageNum: Number(init.body.pageNo),
    pageSize: Number(init.body.numOfRows),
    totalCount: Number(init.body.totalCount),
});

export const decodeFoodDataList = (init: FoodApiResponse): DecodeFoodDataListType => ({
    foodList: init.body.items.map(decodeFoodData),
    isEmpty: init.body.items.length === 0,
    meta: decodeFoodMetaData(init),
});

/** 응답 결과표
 * NUM 번호
 * AMT_NUM1 에너지(kcal)
 * AMT_NUM3 단백질(g)
 * AMT_NUM4 지방(g)
 * AMT_NUM7 탄수화물(g)
 * AMT_NUM8 당류(g)
 * AMT_NUM14 나트륨(mg)
 * AMT_NUM24 콜레스테롤(mg)
 * AMT_NUM26 트랜스지방산(g)
 * NUTRI_AMOUNT_SERVING 1회 섭취참고량
 * FOOD_NM_KR 식품코드
 */
