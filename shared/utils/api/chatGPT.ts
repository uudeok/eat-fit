import { DecodeGoalType } from '@/service/mappers/goalMapper';

export type CallGPTType = {
    goalData: DecodeGoalType;
    weeklyWeight: any;
    burnedCalories: any;
    calories: any;
    progressionRate: any;
};

export type AnalyzeDataType = {
    possibility: string;
    tips: string[];
    cheering: string;
    evaluates: string;
};

export const fetchGPTAnalysis = async ({
    goalData,
    weeklyWeight,
    burnedCalories,
    calories,
    progressionRate,
}: CallGPTType) => {
    const messages = [
        {
            role: 'system',
            content: `
            You are a healthcare expert who analyzes exercise and eating habits. Provide a detailed analysis based on the user's data, including specific examples. 
            Follow the instructions below step by step.
            `,
        },
        {
            role: 'user',
            content: `
            ## User Data ##
            goalData: ${JSON.stringify(goalData)},
            weeklyWeight: ${JSON.stringify(weeklyWeight)},
            burnedCalories: ${JSON.stringify(burnedCalories)},
            calories: ${JSON.stringify(calories)}
            progressionRate : ${JSON.stringify(progressionRate)}
    
            1. progressionRate : Represents the progress to the target date, in % and for example, 5% means that 5% of the total target period has passed.
            2. [possibility]: Compare the targetWeight of goalData with weeklyWeight and evaluate the possibility of reaching the targetWeight when looking at progressionRate up to the endDate.
            3. [evaluates]: Analyze the relationship between burnedCalories and calories to evaluate the user's eating and exercise habits. Specify any concerning patterns.
            4. [tips]: Provide 3 actionable tips that will be beneficial for the user’s situation in achieving their goals.
            5. [cheering]: Write an encouraging message to motivate the user to consistently manage their progress and reach their target weight by the endDate.
    
            Please translate your analysis into Korean and format the output as follows:
            {
                "possibility": "percentage chance",
                "evaluates": "analysis of habits",
                "cheering": "motivational message",
                "tips": ["tip1", "tip2", "tip3"]
            }
            `,
        },
    ];
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
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

    const message = responseData.choices[0].message.content;

    return message;
};
