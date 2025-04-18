import { CreateAnalysisArgs } from '@/service/@types';
import { chatGPTFetch } from '@/service/utils/chatGPTFetch';
import { createClient } from '@/shared/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import dayjs from 'dayjs';

const createAnalysisMessage = (data: CreateAnalysisArgs) => [
    {
        role: 'system',
        content: `
               You are a healthcare expert who analyzes exercise and eating habits. Provide a detailed analysis based on the user's data, including specific examples. 
                Always respond in Korean. 
                Follow the instructions below step by step.
            `,
    },
    {
        role: 'system',
        content: `
            ## User Data ##
            goalData: ${JSON.stringify(data.goalData)},
            weeklyWeight: ${JSON.stringify(data.weeklyWeight)},
            burnedCalories: ${JSON.stringify(data.burnedCalories)},
            calories: ${JSON.stringify(data.calories)}
            progressionRate : ${JSON.stringify(data.progressionRate)}
    
            1. progressionRate : Represents the progress to the target date, in % and for example, 5% means that 5% of the total target period has passed.
            2. [possibility]: Compare the targetWeight of goalData with weeklyWeight and evaluate the possibility of reaching the targetWeight when looking at progressionRate up to the endDate.
            3. [evaluates]: Analyze the relationship between burnedCalories and calories to evaluate the user's eating and exercise habits. Specify any concerning patterns.
            4. [tips]: Provide 3 actionable tips that will be beneficial for the user’s situation in achieving their goals.
            5. [cheering]: Write an encouraging message to motivate the user to consistently manage their progress and reach their target weight by the endDate.
    
            **반드시 위의 분석을 한국어로 번역하여 응답해 주세요!** 형식은 다음과 같아야 합니다:

            {
                "possibility": "Please indicate the probability in percentages(%) only",
                "evaluates": "analysis of habits",
                "cheering": "motivational message",
                "tips": ["tip1", "tip2", "tip3"]
            }
            `,
    },
];

export async function POST(request: NextRequest) {
    const supabase = createClient();

    try {
        const body = await request.json();
        const { goalData, weeklyWeight, burnedCalories, calories, progressionRate } = body;

        if (!goalData || !weeklyWeight || !burnedCalories || !calories || !progressionRate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data: analysisData, error: fetchError } = await supabase.from('analysis').select('*').maybeSingle();

        if (fetchError) {
            throw new Error(fetchError.message);
        }

        if (analysisData) {
            const { created_at } = analysisData;

            // createdAt 기준으로 일주일 뒤 날짜 계산
            const deadline = dayjs(created_at).add(7, 'day').toDate();
            const now = dayjs();

            console.log('createdAt', created_at);
            console.log('deadline', deadline);
            console.log(1, now.isBefore(deadline));

            // 유효한 데이터라면 기존 데이터를 반환
            if (now.isBefore(deadline)) {
                return NextResponse.json(analysisData, { status: 200 });
            }
        }

        // 데이터가 없거나 만료된 경우 ChatGPT API 호출
        const messages = createAnalysisMessage(body);

        const response = await chatGPTFetch('', {
            method: 'POST',
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages,
                temperature: 0.7,
            }),
        });

        const responseData = await response.json();

        let parsedMessage;
        try {
            parsedMessage = JSON.parse(responseData.choices[0].message.content);
        } catch (parseError) {
            throw new Error('Failed to parse OpenAI response');
        }

        // 새 데이터 작성 또는 기존 데이터 업데이트
        if (analysisData) {
            // 기존 데이터 업데이트
            const { error: updateError } = await supabase
                .from('analysis')
                .update({
                    possibility: parsedMessage.possibility,
                    evaluates: parsedMessage.evaluates,
                    cheering: parsedMessage.cheering,
                    tips: parsedMessage.tips,
                })
                .eq('id', analysisData.id)
                .throwOnError();

            if (updateError) {
                throw new Error(updateError.message);
            }
        } else {
            const { error: insertError } = await supabase
                .from('analysis')
                .insert([
                    {
                        possibility: parsedMessage.possibility,
                        evaluates: parsedMessage.evaluates,
                        cheering: parsedMessage.cheering,
                        tips: parsedMessage.tips,
                    },
                ])
                .throwOnError();

            if (insertError) {
                throw new Error(insertError.message);
            }
        }

        // 새 데이터를 반환
        return NextResponse.json(parsedMessage, { status: 201 });
    } catch (error: any) {
        console.error('Error processing Analysis Data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
