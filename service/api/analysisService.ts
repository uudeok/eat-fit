import { API_ENDPOINTS } from './config';
import { CreateAnalysisArgs, UpdateAnalysisArgs } from '../@types';
import { DecodeAnalysis, decodeAnalysis } from '../mappers/analysisMapper';

export async function fetchAnalysis(): Promise<DecodeAnalysis> {
    const data = await fetch(`${API_ENDPOINTS.ANALYSIS}`);

    if (!data.ok) {
        throw new Error('Failed to fetch Analysis Data');
    }

    const result = await data.json();

    return decodeAnalysis(result);
}

export async function createAnalysis(createData: CreateAnalysisArgs): Promise<DecodeAnalysis> {
    const data = await fetch(`${API_ENDPOINTS.ANALYSIS}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(createData),
    });

    if (!data.ok) {
        throw new Error('Failed to update Analysis Data');
    }

    const result = await data.json();

    return decodeAnalysis(result);
}

export async function updateAnalysis(updateData: UpdateAnalysisArgs): Promise<DecodeAnalysis> {
    const data = await fetch(`${API_ENDPOINTS.ANALYSIS}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    });
    if (!data.ok) {
        throw new Error('Failed to update Analysis Data');
    }

    const result = await data.json();

    return decodeAnalysis(result);
}
