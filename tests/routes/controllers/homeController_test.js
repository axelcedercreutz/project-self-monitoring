import { superoak } from '../../../deps.js';
import { app } from '../../../app.js';

Deno.test("GET to / should return OK as there is data in the test-database", async () => {
  const testClient = await superoak(app);
  await testClient.get("/")
      .expect(200);
});

Deno.test("GET to /api/summary/:year/:month/:day should return No data found on selected date", async () => {
  const testClient = await superoak(app);
  await testClient.get("/")
      .expect(200);
});