import { superoak } from '../../../deps.js';
import { app } from '../../../app.js';

Deno.test("GET to /api/summary should return data found for the past week", async () => {
  const testClient = await superoak(app);
  await testClient.get("/api/summary")
      .expect(200);
});

Deno.test("GET to /api/summary/:year/:month/:day should return 200 on a date that there is data", async () => {
  const testClient = await superoak(app);
  await testClient.get("/api/summary/2020/12/02")
      .expect(200);
});

Deno.test("GET to /api/summary/:year/:month/:day should return 200 on a date that there is data even when given without 0", async () => {
  const testClient = await superoak(app);
  await testClient.get("/api/summary/2020/12/2")
      .expect(200);
});

Deno.test("GET to /api/summary/:year/:month/:day should return 404 on a date that there is no data", async () => {
    const testClient = await superoak(app);
    await testClient.get("/api/summary/2020/01/30")
        .expect('No data found on selected date')
        .expect(404);
});
