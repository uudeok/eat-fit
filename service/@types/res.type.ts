import { EmojiKey, ExerciseIntensityKeysType } from '@/constants';
import { ActivityLevelType, GenderType, GoalStatusType, MealItemType, MealPlanType } from './req.type';
import { MealsKeysType } from '@/constants/meals';
import { Nullable } from '@/@types';

export type GoalType = {
    id: number;
    user_id: string;
    goal_status: GoalStatusType;
    gender: GenderType;
    age: number;
    height: number;
    weight: number;
    activity_level: ActivityLevelType;
    target_weight: number;
    daily_calories: number;
    goal_period: number;
    goal_start_date: string;
    goal_end_date: string;
    created_at: string;
    meal_plan: MealPlanType;
    daily_carb: number;
    daily_protein: number;
    daily_fat: number;
};

export type DailySpecType = {
    id: number;
    goal_id: number;
    user_id: string;
    entry_date: string;
    today_weight: Nullable<number>;
    mood: Nullable<EmojiKey>;
    created_at: string;
    diary: string;
};

/* meals 테이블 가져올때  */
export type MealsType = {
    id: number;
    daily_id: number;
    created_at: string;
    user_id: string;
    entry_date: string;
    meal_type: MealsKeysType;
    serving_time: Date;
    meal: MealItemType[];
    photo_url: string[];
};

/* daily & meals & exercises 테이블 join  */
export type DailyStepType = {
    created_at: string;
    entry_date: string;
    goal_id: number;
    id: number;
    meals: MealPickType[];
    exercises: ExercisePickType[];
    mood: EmojiKey;
    diary: string;
    today_weight: number;
    user_id: string;
};

/* daily & meals 테이블 join 할때 meals 테이블에서 가져오는 데이터의 타입 */
export type MealPickType = Pick<MealsType, 'id' | 'meal_type' | 'photo_url' | 'serving_time' | 'meal'>;
export type ExercisePickType = Pick<ExercisesType, 'id' | 'photo_url' | 'exercise'>;

/* exercises 테이블 가져올때 */
export type ExercisesType = {
    id: number;
    daily_id: number;
    created_at: string;
    user_id: string;
    entry_date: string;
    exercise: ExerciseType[];
    photo_url: string[];
};

export type ExerciseType = {
    id: number;
    exercise_name: string;
    duration_min: number;
    calories_burned: number;
    exercise_intensity: ExerciseIntensityKeysType;
    content: string;
};

export type UserRoleType = 'general' | 'manager' | 'admin';
export type UserExposeType = 'pubilc' | 'privacy' | 'follower';

export type UserType = {
    id: string;
    username: string;
    nickname: string;
    avatar_url: string | null;
    email: string;
    created_at: string;
    role: UserRoleType;
    expose: UserExposeType;
    content: string;
};

export type AnalyzeDataType = {
    user_id: string;
    id: number;
    created_at: Date;
    possibility: string;
    tips: string[];
    cheering: string;
    evaluates: string;
};

export type FoodItemType = {
    AMT_NUM115: string;
    AMT_NUM48: string;
    AMT_NUM49: string;
    AMT_NUM50: string;
    AMT_NUM51: string;
    AMT_NUM52: string;
    AMT_NUM53: string;
    AMT_NUM54: string;
    AMT_NUM55: string;
    AMT_NUM56: string;
    AMT_NUM57: string;
    AMT_NUM58: string;
    AMT_NUM59: string;
    AMT_NUM60: string;
    AMT_NUM61: string;
    AMT_NUM62: string;
    AMT_NUM63: string;
    AMT_NUM64: string;
    AMT_NUM65: string;
    FOOD_OR_NM: string;
    FOOD_CAT1_CD: string;
    FOOD_CAT1_NM: string;
    FOOD_REF_CD: string;
    FOOD_REF_NM: string;
    FOOD_CAT2_CD: string;
    FOOD_CAT2_NM: string;
    FOOD_CAT3_CD: string;
    FOOD_CAT3_NM: string;
    FOOD_CAT4_CD: string;
    FOOD_CAT4_NM: string;
    SERVING_SIZE: string;
    AMT_NUM1: string;
    AMT_NUM2: string;
    AMT_NUM3: string;
    AMT_NUM4: string;
    AMT_NUM5: string;
    AMT_NUM6: string;
    AMT_NUM7: string;
    AMT_NUM8: string;
    AMT_NUM9: string;
    AMT_NUM10: string;
    AMT_NUM11: string;
    AMT_NUM12: string;
    AMT_NUM13: string;
    AMT_NUM14: string;
    AMT_NUM15: string;
    AMT_NUM16: string;
    AMT_NUM17: string;
    AMT_NUM18: string;
    AMT_NUM19: string;
    AMT_NUM20: string;
    AMT_NUM21: string;
    AMT_NUM22: string;
    AMT_NUM23: string;
    AMT_NUM24: string;
    AMT_NUM25: string;
    AMT_NUM26: string;
    AMT_NUM27: string;
    AMT_NUM28: string;
    AMT_NUM29: string;
    AMT_NUM30: string;
    AMT_NUM116: string;
    AMT_NUM117: string;
    AMT_NUM159: string;
    AMT_NUM160: string;
    AMT_NUM161: string;
    AMT_NUM162: string;
    AMT_NUM163: string;
    AMT_NUM164: string;
    AMT_NUM165: string;
    AMT_NUM166: string;
    AMT_NUM167: string;
    AMT_NUM168: string;
    AMT_NUM169: string;
    AMT_NUM68: string;
    AMT_NUM69: string;
    AMT_NUM70: string;
    AMT_NUM71: string;
    AMT_NUM72: string;
    AMT_NUM73: string;
    AMT_NUM74: string;
    AMT_NUM75: string;
    AMT_NUM76: string;
    AMT_NUM77: string;
    AMT_NUM78: string;
    AMT_NUM79: string;
    AMT_NUM80: string;
    AMT_NUM81: string;
    AMT_NUM82: string;
    AMT_NUM93: string;
    AMT_NUM94: string;
    AMT_NUM95: string;
    AMT_NUM170: string;
    AMT_NUM171: string;
    AMT_NUM172: string;
    AMT_NUM173: string;
    AMT_NUM174: string;
    AMT_NUM175: string;
    AMT_NUM176: string;
    AMT_NUM177: string;
    AMT_NUM178: string;
    AMT_NUM179: string;
    AMT_NUM180: string;
    AMT_NUM181: string;
    SUB_REF_CM: string;
    SUB_REF_NAME: string;
    NUTRI_AMOUNT_SERVING: string;
    Z10500: string;
    ITEM_REPORT_NO: string;
    MAKER_NM: string;
    IMP_MANUFAC_NM: string;
    SELLER_MANUFAC_NM: string;
    IMP_YN: string;
    NATION_CM: string;
    DB_GRP_NM: string;
    FOOD_OR_CD: string;
    NUM: string;
    FOOD_CD: string;
    FOOD_NM_KR: string;
    DB_GRP_CM: string;
    AMT_NUM31: string;
    AMT_NUM32: string;
    AMT_NUM33: string;
    AMT_NUM34: string;
    AMT_NUM35: string;
    AMT_NUM36: string;
    AMT_NUM37: string;
    AMT_NUM38: string;
    AMT_NUM39: string;
    AMT_NUM40: string;
    AMT_NUM41: string;
    AMT_NUM42: string;
    AMT_NUM43: string;
    AMT_NUM44: string;
    AMT_NUM45: string;
    AMT_NUM46: string;
    AMT_NUM47: string;
    AMT_NUM119: string;
    AMT_NUM120: string;
    AMT_NUM121: string;
    AMT_NUM122: string;
    AMT_NUM123: string;
    AMT_NUM124: string;
    AMT_NUM125: string;
    AMT_NUM126: string;
    AMT_NUM127: string;
    AMT_NUM128: string;
    AMT_NUM129: string;
    AMT_NUM130: string;
    AMT_NUM131: string;
    AMT_NUM132: string;
    AMT_NUM133: string;
    AMT_NUM134: string;
    AMT_NUM135: string;
    AMT_NUM136: string;
    AMT_NUM137: string;
    AMT_NUM138: string;
    AMT_NUM139: string;
    AMT_NUM140: string;
    AMT_NUM141: string;
    AMT_NUM142: string;
    AMT_NUM143: string;
    AMT_NUM144: string;
    AMT_NUM145: string;
    AMT_NUM146: string;
    AMT_NUM147: string;
    AMT_NUM148: string;
    AMT_NUM149: string;
    AMT_NUM150: string;
    AMT_NUM151: string;
    AMT_NUM152: string;
    AMT_NUM153: string;
    AMT_NUM154: string;
    RESEARCH_YMD: string;
    UPDATE_YMD: string;
    NATION_NM: string;
    CRT_MTH_CD: string;
    CRT_MTH_NM: string;
    AMT_NUM155: string;
    AMT_NUM156: string;
    AMT_NUM157: string;
    AMT_NUM158: string;
    AMT_NUM96: string;
    AMT_NUM97: string;
    AMT_NUM98: string;
    AMT_NUM99: string;
    AMT_NUM100: string;
    AMT_NUM101: string;
    AMT_NUM102: string;
    AMT_NUM103: string;
    AMT_NUM104: string;
    AMT_NUM105: string;
    AMT_NUM106: string;
    AMT_NUM107: string;
    AMT_NUM108: string;
    AMT_NUM109: string;
    AMT_NUM110: string;
    AMT_NUM111: string;
    AMT_NUM66: string;
    AMT_NUM67: string;
    AMT_NUM118: string;
    AMT_NUM83: string;
    AMT_NUM84: string;
    AMT_NUM85: string;
    AMT_NUM90: string;
    AMT_NUM91: string;
    AMT_NUM92: string;
    AMT_NUM86: string;
    AMT_NUM87: string;
    AMT_NUM88: string;
    AMT_NUM89: string;
    AMT_NUM112: string;
    AMT_NUM113: string;
    AMT_NUM114: string;
};

export type FoodApiResponse = {
    header: {
        resultCode: string;
        resultMsg: string;
    };
    body: {
        numOfRows: string;
        pageNo: string;
        totalCount: string;
        items: FoodItemType[];
    };
};

export type HealthMetApiResponse = {
    id: number;
    met: number;
    exercise_name: string;
};
