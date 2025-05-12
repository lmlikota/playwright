import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class NavigationPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async getAllLinks(): Promise<string[]> {
        return this.page.$$eval('a', elements =>
            Array.from(new Set(elements.map(el => el.href)))
                .filter(href => href.startsWith('http'))
        );
    }

    async checkPath(path: string) {
        const response = await this.page.request.get(path);
        return response;
    }
}