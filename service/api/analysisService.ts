import { API_ENDPOINTS } from './config';
import { CreateAnalysisArgs, UpdateAnalysisArgs } from '../@types';
import { DecodeAnalysis, decodeAnalysis } from '../mappers/analysisMapper';
import { defaultFetch } from '../utils/defaultFetch';

export async function fetchAnalysis(): Promise<DecodeAnalysis> {
    const data = await defaultFetch(`${API_ENDPOINTS.ANALYSIS}`);

    const result = await data.json();

    return decodeAnalysis(result);
}

export async function createAnalysis(createData: CreateAnalysisArgs): Promise<DecodeAnalysis> {
    const data = await defaultFetch(`${API_ENDPOINTS.ANALYSIS}`, {
        method: 'POST',
        body: JSON.stringify(createData),
    });

    const result = await data.json();

    return decodeAnalysis(result);
}

export async function updateAnalysis(updateData: UpdateAnalysisArgs): Promise<DecodeAnalysis> {
    const data = await defaultFetch(`${API_ENDPOINTS.ANALYSIS}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
    });

    const result = await data.json();

    return decodeAnalysis(result);
}
