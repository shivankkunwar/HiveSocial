import { createServer } from 'miragejs';
import posts from '../post.json';

export const startMockServer = () => {
createServer({
  routes() {
    this.namespace = 'api';
    
    // Define API endpoints and responses here
    this.post('/login', (_,request) => {
      const attrs = JSON.parse(request.requestBody);
      
      // Mock successful login
      if (attrs.email === 'test@test.com' && attrs.password === 'password') {
        return {
          status: 'ok',
          token: '1234567890',
        };
      }
      
      // Mock failed login
      return {
        status: 'fail',
      };
    });
    
    this.get('/data', () => {
        return posts;
      });
    
    this.post('/signup', (_, request) => {
      const attrs = JSON.parse(request.requestBody);
      
      // Mock successful signup
      if (attrs.email && attrs.password) {
        return {
          status: 'ok',
        };
      }
      
      // Mock failed signup
      return {
        status: 'fail',
      };
    });
  },
});
};