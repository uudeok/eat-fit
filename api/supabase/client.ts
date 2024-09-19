import { createClient } from '@/shared/utils/supabase/client';

const supabase = createClient();

const applyConditions = (query: any, conditions: any) => {
    conditions.forEach((condition: { type: string; args: any[] }) => {
        if (query[condition.type]) {
            query = query[condition.type](...condition.args);
        }
    });
    return query;
};

const api = {
    selectData: async (tableName: string, conditions?: any, customSelect: string = '*'): Promise<any> => {
        let query = supabase.from(tableName).select(customSelect);

        if (conditions) {
            query = applyConditions(query, conditions);
        }

        const { data, error } = await query;
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },

    insertData: async (tableName: string, data: Record<string, any>, conditions?: any): Promise<any> => {
        let query = supabase.from(tableName).insert(data);

        if (conditions) {
            query = applyConditions(query, conditions);
        }

        const { data: result, error } = await query;
        if (error) {
            throw new Error(error.message);
        }
        return result;
    },

    updateData: async (tableName: string, data: Record<string, any>, conditions?: any): Promise<any> => {
        let query = supabase.from(tableName).update(data);

        if (conditions) {
            query = applyConditions(query, conditions);
        }

        const { data: result, error } = await query;
        if (error) {
            throw new Error(error.message);
        }
        return result;
    },

    deleteData: async (tableName: string, conditions?: any): Promise<any> => {
        let query = supabase.from(tableName).delete();

        if (conditions) {
            query = applyConditions(query, conditions);
        }

        const { data, error } = await query;
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },
};

export default api;
