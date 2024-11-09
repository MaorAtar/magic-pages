import { defineConfig } from "drizzle-kit";
export default defineConfig({
    schema:"./config/schema.tsx",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://MagicPages_owner:sMBNe60Lanyz@ep-royal-frog-a5k10yqz.us-east-2.aws.neon.tech/Magic-Pages?sslmode=require",
    },
    verbose: true,
    strict: true,
});