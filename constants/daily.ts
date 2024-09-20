import { EmojiKey } from './emotion';
import { GoalsType } from '@/service/@types/req.type';

type DailyType = {
    id: number;
    goal_id: number;
    user_id: string;
    entry_date: string;
    today_weight: number | null;
    mood: EmojiKey | null;
};

const Goal: GoalsType = {
    id: 100,
    user_id: 'abc',
    goal_status: 'progress',
    gender: 'F',
    age: 29,
    height: 170,
    weight: 60,
    activity_level: 1,
    terget_weight: 55,
    goal: 'loss',
    daily_calories: 2500,
    goal_period: 30,
    goal_start_date: '2024-09-04',
    goal_end_date: '2024-10-03',
    updated_at: 'updated_at',
    created_at: 'created_at',
};

const Daily: DailyType = {
    id: 1,
    goal_id: 100,
    user_id: 'abc',
    entry_date: '2024-09-05',
    today_weight: 60.05, // default null
    mood: 'good', // default null
};

const Daily2: DailyType = {
    id: 2,
    goal_id: 100,
    user_id: 'abc',
    entry_date: '2024-09-06',
    today_weight: 60,
    mood: 'hungry',
};

const Daily3: DailyType = {
    id: 3,
    goal_id: 100,
    user_id: 'abc',
    entry_date: '2024-09-07',
    today_weight: null,
    mood: null,
};

// 1. 로그인 후 정보 입력 하면 Goal 테이블 생성 된다.
// 2. 현재 생각 : Goal 테이블이 생성될때 goal 데이터를 브라우저 저장소(로컬, 세션스토리지, 쿠키) 에 저장
// 3. 사용자가 오늘의 기분, 몸무게 등을 설정할때 Daily 테이블 생성 된다.

// 접속하면 유저 id 로 현재 goal_status : progress 인 goal 테이블을 찾는다
// 해당 goal_id 를 저장한다
