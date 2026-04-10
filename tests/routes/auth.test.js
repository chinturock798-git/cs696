// Load test environment variables
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../server');

describe('POST /api/auth/logout', () => {
    it('should successfully logout and clear cookies', async () => {
        const response = await request(app)
            .post('/api/auth/logout')
            .expect('Content-Type', /json/)
            .expect(200);

        // Verify response
        expect(response.body).toHaveProperty('success', true);

        // Verify cookies are cleared
        const cookies = response.headers['set-cookie'];
        expect(cookies).toBeDefined();
        
        // Check that accessToken cookie is being cleared
        const accessTokenCookie = cookies.find(cookie => cookie.includes('accessToken='));
        expect(accessTokenCookie).toBeDefined();
        expect(accessTokenCookie).toMatch(/accessToken=;/);
        
        // Check that refreshToken cookie is being cleared
        const refreshTokenCookie = cookies.find(cookie => cookie.includes('refreshToken='));
        expect(refreshTokenCookie).toBeDefined();
        expect(refreshTokenCookie).toMatch(/refreshToken=;/);
    });
});
