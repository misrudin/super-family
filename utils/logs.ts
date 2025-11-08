import { supabase } from "@/utils/supabase";

export interface LogDetails {
    [key: string]: unknown;
}

export interface CreateLogParams {
    details: LogDetails;
    family_id?: string | null;
    user_id: string;
}

/**
 * Utility function untuk membuat log aktivitas user
 * Bisa dipanggil dari berbagai tempat untuk merecord aktivitas
 * 
 * @param params - Parameter untuk membuat log
 * @returns Promise dengan data log yang dibuat atau null jika error
 * 
 * @example
 * ```typescript
 * await createLog({
 *   details: {
 *     action: "create_category",
 *     category_name: "Makanan",
 *     category_id: "123e4567-e89b-12d3-a456-426614174000"
 *   },
 *   user_id: "123e4567-e89b-12d3-a456-426614174000",
 *   family_id: "123e4567-e89b-12d3-a456-426614174000"
 * });
 * ```
 */
export async function createLog(params: CreateLogParams): Promise<{ id: string; created_at: string } | null> {
    try {
        const { details, family_id, user_id } = params;

        const { data: newLog, error: insertError } = await supabase
            .from("logs")
            .insert([
                {
                    details,
                    family_id: family_id || null,
                    user_id,
                },
            ])
            .select("id, created_at")
            .single();

        if (insertError) {
            console.error("Error creating log:", insertError);
            return null;
        }

        return {
            id: newLog.id as string,
            created_at: newLog.created_at as string,
        };
    } catch (error) {
        console.error("Error creating log:", error);
        return null;
    }
}

/**
 * Utility function untuk membuat log aktivitas user dengan error handling yang tidak throw
 * Berguna untuk logging yang tidak critical (jika gagal, tidak mengganggu flow utama)
 * 
 * @param params - Parameter untuk membuat log
 * @returns void (tidak return value, hanya log ke console jika error)
 * 
 * @example
 * ```typescript
 * createLogSilent({
 *   details: {
 *     action: "view_dashboard",
 *     timestamp: new Date().toISOString()
 *   },
 *   user_id: "123e4567-e89b-12d3-a456-426614174000"
 * });
 * ```
 */
export async function createLogSilent(params: CreateLogParams): Promise<void> {
    try {
        await createLog(params);
    } catch (error) {
        console.error("Silent log creation failed:", error);
    }
}
