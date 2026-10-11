import {defineConfig,devices} from '@playwright/test';
export default defineConfig({
 testDir:'./e2e',fullyParallel:true,retries:process.env.CI?1:0,
 reporter:process.env.CI?'github':'list',
 use:{baseURL:'http://127.0.0.1:4173/entrelinhas/',...devices['Desktop Chrome'].use,trace:'retain-on-failure'},
 webServer:{command:'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',url:'http://127.0.0.1:4173/entrelinhas/',reuseExistingServer:!process.env.CI,timeout:60000}
});
