import { superoak } from '../../../deps.js';
import { app } from '../../../app.js';


/*
Deno.test("GET to /auth/login should always return HTML-document and status OK", async () => {
    const testClient = await superoak(app);
    await testClient.get("/auth/login")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});

Deno.test("GET to /auth/registration should always return HTML-document and status OK", async () => {
    const testClient = await superoak(app);
    await testClient.get("/auth/registration")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});

Deno.test("POST to /auth/login should status 401 if email not found", async () => {
    const testClient = await superoak(app);
    await testClient.post("/auth/login")
        .send('email=letsgo@email.com&&password=password')
        .expect(401)
});
Deno.test("POST to /auth/login should status 401 if password is wrong", async () => {
    const testClient = await superoak(app);
    await testClient.post("/auth/login")
        .send('email=my@email.com&&password=sponge')
        .expect(401)
});


Deno.test("POST to /auth/registration should return status 401 if verification is not same as password", async () => {
    const testClient = await superoak(app);
    await testClient.post("/auth/registration")
        .send('email=me@email.com&&password=password&&verification=pas')
        .expect(401);
});

Deno.test("POST to /auth/registration should return 'The email is already reserved.' if existing email", async () => {
    const testClient = await superoak(app);
    await testClient.post("/auth/registration")
        .send('email=me@email.com&&password=password&&verification=password')
        .expect('The email is already reserved.');
});
*/

Deno.test({
    name: "GET to /auth/login should always return HTML-document and status OK",
    sanitizeResources: false,
    sanitizeOps: false,
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/auth/login")
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200);
    }
});

Deno.test({
    name: "GET to /auth/registration should always return HTML-document and status OK",
    sanitizeResources: false,
    sanitizeOps: false,
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/auth/registration")
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200);
    }
});

Deno.test({
    name: "POST to /auth/login should status 401 if email not found",
    sanitizeResources: false,
    sanitizeOps: false,
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/login")
            .send('email=letsgo@email.com&&password=password')
            .expect(401)
    }
});

Deno.test({
    name: "POST to /auth/login should status 401 if password is wrong",
    sanitizeResources: false,
    sanitizeOps: false,
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/login")
            .send('email=my@email.com&&password=sponge')
            .expect(401)
    }
});

/*

Deno.test("POST to /auth/login should return HTML-document and status OK if successful", async () => {
    const testClient = await superoak(app);
    await testClient.post("/auth/login")
        .send('email=my@email.com&&password=password')
        .expect(200);
});

Deno.test("POST to /auth/registration should return status OK if successful", async () => {
    const testClient = await superoak(app);
    const randomNumber = 1000000000 * Math.random();
    await testClient.post("/auth/registration")
        .send(`email=${randomNumber}@email.com&&password=password&&verification=password`)
        .expect(200);
});
*/

Deno.test({
    name: "POST to /auth/registration should return status 401 if verification is not same as password",
    sanitizeResources: false,
    sanitizeOps: false,
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/registration")
            .send('email=me@email.com&&password=password&&verification=pas')
            .expect(401);
    }
});

Deno.test({
    name: "POST to /auth/registration should return 'The email is already reserved.' if existing email",
    sanitizeResources: false,
    sanitizeOps: false,
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/registration")
            .send('email=me@email.com&&password=password&&verification=password')
            .expect('The email is already reserved.');
    }
});


