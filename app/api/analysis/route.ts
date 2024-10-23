import { CreateAnalysisArgs } from '@/service/@types';
import { API_ENDPOINTS } from '@/service/supabase/config';
import { createClient } from '@/shared/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const supabase = createClient();

    try {
        const { data, error } = await supabase.from('analysis').select('*').maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching Analysis Data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

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
        role: 'user',
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
                "possibility": "percentage chance",
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

        const messages = createAnalysisMessage(body);

        const response = await fetch(`${API_ENDPOINTS.CHAT_GPT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`,
            },
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

        const { data, error } = await supabase
            .from('analysis')
            .insert([
                {
                    possibility: parsedMessage.possibility,
                    evaluates: parsedMessage.evaluates,
                    cheering: parsedMessage.cheering,
                    tips: parsedMessage.tips,
                },
            ])
            .select()
            .throwOnError()
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        console.error('Error creating Analysis Data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const supabase = createClient();

    try {
        const body = await request.json();
        const { goalData, weeklyWeight, burnedCalories, calories, progressionRate, id } = body;

        if (!goalData || !weeklyWeight || !burnedCalories || !calories || !progressionRate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const messages = createAnalysisMessage(body);

        const response = await fetch(`${API_ENDPOINTS.CHAT_GPT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`,
            },
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

        const { data, error } = await supabase
            .from('analysis')
            .update({
                possibility: parsedMessage.possibility,
                evaluates: parsedMessage.evaluates,
                cheering: parsedMessage.cheering,
                tips: parsedMessage.tips,
                created_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .throwOnError()
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        console.error('Error updating Analysis Data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
