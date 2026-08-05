import { getStoryContext, type TestRunnerConfig } from '@storybook/test-runner';

const defaultViewport = { width: 1280, height: 720 };

const config: TestRunnerConfig = {
  async preVisit(page, story) {
    const context = await getStoryContext(page, story);
    const viewportName = context.storyGlobals?.['viewport']?.value;
    const viewport = viewportName
      ? context.parameters?.['viewport']?.options?.[viewportName]
      : undefined;

    if (!viewport) {
      await page.setViewportSize(defaultViewport);
      return;
    }

    await page.setViewportSize({
      width: Number.parseInt(viewport.styles.width, 10),
      height: Number.parseInt(viewport.styles.height, 10),
    });
  },
};

export default config;
