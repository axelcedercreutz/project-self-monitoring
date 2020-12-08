import { superoak } from '../../../deps.js';
import { app } from '../../../app.js';

Deno.test({
    name: "GET to /api/summary should return data found for the past week",
    sanitizeResources: false,
    sanitizeOps: false,
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/api/summary")
            .expect(200);
    },
  });

Deno.test({
    name: "GET to /api/summary/:year/:month/:day should return 200 on a date that there is data",
    sanitizeResources: false,
    sanitizeOps: false,
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/api/summary/2020/12/02")
        .expect(200);
    },
  });

Deno.test({
    name: "GET to /api/summary/:year/:month/:day should return 200 on a date that there is data even when given without 0",
    sanitizeResources: false,
    sanitizeOps: false,
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/api/summary/2020/12/02")
        .expect(200);
    }
  });

Deno.test({
    name: "GET to /api/summary/:year/:month/:day should return 404 on a date that there is no data",
    sanitizeResources: false,
    sanitizeOps: false,
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/api/summary/2020/01/30")
        .expect('No data found on selected date')
        .expect(404);
    }
  });
