import { superoak } from '../../../deps.js';
import { app } from '../../../app.js';

Deno.test("GET to /behavior/reporting should return HTML-document and status OK without user in cookies", async () => {
    const testClient = await superoak(app);
    await testClient.get("/behavior/reporting")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});
/*
Deno.test("GET to /behavior/reporting should return HTML-document and status OK with user in session", async () => {
    const user = {
        id: 1,
        email: 'my@email.net'
    }
    const testClient = await superoak(app);
    let response = await testClient.get("/behavior/reporting")
        .set('Session', `user=${user}`)
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});

Deno.test("GET to /behavior/reporting/morning should always return HTML-document and status OK", async () => {
    const testClient = await superoak(app);
    await testClient.get("/behavior/reporting")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});

Deno.test("GET to /behavior/reporting/morning should return HTML-document and status OK with user in session", async () => {
    const testClient = await superoak(app);
    await testClient.get("/behavior/reporting")
        .set('session', {user: {id: 1, email: 'me@email.net'}})
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});

Deno.test("GET to /behavior/reporting/evening should always return HTML-document and status OK", async () => {
    const testClient = await superoak(app);
    await testClient.get("/behavior/reporting")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});

Deno.test("GET to /behavior/reporting/evening should return HTML-document and status OK with user in session", async () => {
    const testClient = await superoak(app);
    await testClient.get("/behavior/reporting")
        .set('session', {user: {id: 1, email: 'me@email.net'}})
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});
*/
/*
Deno.test("POST to /behavior/reporting/evening should always return error if no userId ", async () => {
    const testClient = await superoak(app);
    await testClient.post("/behavior/reporting")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});
*/