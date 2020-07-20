import FeedbackNotification from '../../../app/utils/FeedbackNotification';

describe('FeedbackNotification.ts', () => {
    it('sets the default data - feedback ', () => {
        expect(FeedbackNotification.feedback).toBeDefined();
    });

    it('has a show()', () => {
        expect(typeof FeedbackNotification.feedback.show).toBe('function');
    });

    it('has a hide()', () => {
        expect(typeof FeedbackNotification.feedback.hide).toBe('function');
    });

    it('has a success()', () => {
        expect(typeof FeedbackNotification.feedback.success).toBe('function');
    });

    it('has a info()', () => {
        expect(typeof FeedbackNotification.feedback.info).toBe('function');
    });

    it('has a warning()', () => {
        expect(typeof FeedbackNotification.feedback.warning).toBe('function');
    });

    it('has a error()', () => {
        expect(typeof FeedbackNotification.feedback.error).toBe('function');
    });
});