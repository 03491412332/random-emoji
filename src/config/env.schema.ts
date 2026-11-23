import {z} from "zod";
export const envSchema = z.object({
    NODE_ENV: z.enum(['development','test','production']).default('development'),
    PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    APP_VERSION: z.string().min(1).default('dev'),
    MONGODB_URI: z.string().regex(/^mongodb(\+srv)?:\/\//,'must start with mongodb:// or mongodb+srv://'),
    CORS_ORIGINS: z.string().default('').transform((value)=>value.split(',').map((origin)=>origin.trim()).filter(Boolean))

});

export type Env = z.infer<typeof envSchema>;