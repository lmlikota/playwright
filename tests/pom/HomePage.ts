import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async waitPageLoad() {
        return this.page.waitForLoadState('load');
    }

    async getNewsletterHeading() {
        return this.page.getByText('Stay up to date with Netlify news');
    }

    async getEmailInput() {
        return this.page.getByLabel('Email*');
    }

    async getSubscribeButton() {
        return this.page.getByRole('button', { name: 'Subscribe' });
    }

    async getThankYouMessage() {
        return this.page.getByRole('heading', { name: 'Thank you for signing up!' });
    }

    async submitNewsletterForm(email: string) {
        const emailInput = await this.getEmailInput();
        await emailInput.fill(email);
        const subscribeButton = await this.getSubscribeButton();
        await subscribeButton.click();
    }
}