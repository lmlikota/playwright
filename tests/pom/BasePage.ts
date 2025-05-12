import { Page } from '@playwright/test';

export class BasePage {
    constructor(protected page: Page) {}

    async navigate(path: string) {
        await this.page.goto(`https://www.netlify.com${path}`);
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }
}