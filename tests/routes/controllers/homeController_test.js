import { superoak } from '../../../deps.js';
import { app } from '../../../app.js';

Deno.test({
    name: "GET to / should always return HTML-document and status OK",
    sanitizeResources: false,
    sanitizeOps: false,
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/")
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200);
    }
});