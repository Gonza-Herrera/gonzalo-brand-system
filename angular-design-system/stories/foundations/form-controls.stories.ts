import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { expect, userEvent } from 'storybook/test';
import {
  GhAmbientBackgroundComponent,
  GhButtonComponent,
  GhCardComponent,
  GhIconButtonComponent,
} from 'gh-design-system';

const meta: Meta = {
  title: 'Foundations/Form Controls',
  tags: ['autodocs', 'pr27-forms'],
  decorators: [
    moduleMetadata({
      imports: [
        GhAmbientBackgroundComponent,
        GhButtonComponent,
        GhCardComponent,
        GhIconButtonComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Public CSS foundations for native form elements. They preserve browser semantics, Angular Forms compatibility and stable consumer-owned IDs while mapping every visual state through Form component tokens. No parallel Angular control family is introduced.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DefaultInput: Story = {
  render: () => ({
    template: `
      <div class="gh-form-story-field gh-form-field">
        <label class="gh-form-field__label" for="story-default-name">Name</label>
        <p class="gh-form-field__hint" id="story-default-name-hint">Use your full name.</p>
        <input class="gh-input" id="story-default-name" type="text" aria-describedby="story-default-name-hint" placeholder="Gonzalo Herrera" />
      </div>
    `,
  }),
};

export const InputTypes: Story = {
  render: () => ({
    template: `
      <div class="gh-form-story-grid">
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-email">Email</label><input class="gh-input" id="story-email" type="email" inputmode="email" autocomplete="email" /></div>
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-password">Password</label><input class="gh-input" id="story-password" type="password" autocomplete="current-password" value="demonstration" /></div>
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-number">Number</label><input class="gh-input" id="story-number" type="number" min="0" max="100" step="1" /></div>
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-search">Search</label><input class="gh-input" id="story-search" type="search" placeholder="Search documentation" /></div>
      </div>
    `,
  }),
};

export const Focus: Story = {
  render: () => ({
    template: `
      <div class="gh-form-story-field gh-form-field">
        <label class="gh-form-field__label" for="story-focus">Keyboard focus</label>
        <input class="gh-input" id="story-focus" type="text" value="Press Tab to focus" />
      </div>
    `,
  }),
  play: async ({ canvas }) => {
    await userEvent.tab();
    await expect(canvas.getByLabelText('Keyboard focus')).toHaveFocus();
  },
};

export const InputStates: Story = {
  render: () => ({
    template: `
      <div class="gh-form-story-grid">
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-filled">Filled</label><input class="gh-input" id="story-filled" value="Angular Design System" /></div>
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-invalid">Invalid</label><input class="gh-input" id="story-invalid" value="invalid" aria-invalid="true" aria-describedby="story-invalid-error" /><p class="gh-form-field__error" id="story-invalid-error">Enter a valid value.</p></div>
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-readonly">Read-only</label><input class="gh-input" id="story-readonly" value="Selectable content" readonly /></div>
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-disabled">Disabled</label><input class="gh-input" id="story-disabled" placeholder="Unavailable" disabled /></div>
      </div>
    `,
  }),
};

export const RequiredAndOptional: Story = {
  render: () => ({
    template: `
      <div class="gh-form-story-grid">
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-required">Project name <span class="gh-form-field__required">(required)</span></label><input class="gh-input" id="story-required" required aria-required="true" /></div>
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-optional">Company <span class="gh-form-field__optional">(optional)</span></label><input class="gh-input" id="story-optional" /></div>
      </div>
    `,
  }),
};

export const Textarea: Story = {
  render: () => ({
    template: `
      <div class="gh-form-story-field gh-form-field">
        <label class="gh-form-field__label" for="story-message">Message</label>
        <textarea class="gh-textarea" id="story-message" maxlength="240" aria-describedby="story-message-hint" placeholder="Describe the engineering challenge."></textarea>
        <p class="gh-form-field__hint" id="story-message-hint">Up to 240 characters. Resize vertically when needed.</p>
      </div>
    `,
  }),
};

export const InvalidTextarea: Story = {
  render: () => ({
    template: `
      <div class="gh-form-story-field gh-form-field">
        <label class="gh-form-field__label" for="story-message-invalid">Message</label>
        <textarea class="gh-textarea" id="story-message-invalid" aria-invalid="true" aria-describedby="story-message-invalid-error">Too short</textarea>
        <p class="gh-form-field__error" id="story-message-invalid-error">Add at least 20 characters.</p>
      </div>
    `,
  }),
};

export const NativeSelect: Story = {
  render: () => ({
    template: `
      <div class="gh-form-story-field gh-form-field">
        <label class="gh-form-field__label" for="story-role">Primary role</label>
        <select class="gh-select" id="story-role">
          <option value="">Choose a role</option>
          <option value="frontend">Frontend engineering</option>
          <option value="leadership" selected>Technical leadership</option>
          <option value="ai">AI-augmented development</option>
        </select>
      </div>
    `,
  }),
};

export const InvalidAndDisabledSelect: Story = {
  render: () => ({
    template: `
      <div class="gh-form-story-grid">
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-select-invalid">Invalid Select</label><select class="gh-select" id="story-select-invalid" aria-invalid="true" aria-describedby="story-select-error"><option value="">Choose an option</option></select><p class="gh-form-field__error" id="story-select-error">Choose one option.</p></div>
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-select-disabled">Disabled Select</label><select class="gh-select" id="story-select-disabled" disabled><option>Unavailable</option></select></div>
      </div>
    `,
  }),
};

export const CheckboxStates: Story = {
  render: () => ({
    template: `
      <fieldset class="gh-form-group">
        <legend class="gh-form-field__label">Checkbox states</legend>
        <label class="gh-checkbox"><input class="gh-checkbox__control" type="checkbox" /><span>Unchecked</span></label>
        <label class="gh-checkbox"><input class="gh-checkbox__control" type="checkbox" checked /><span>Checked</span></label>
        <label class="gh-checkbox"><input class="gh-checkbox__control" id="story-indeterminate" type="checkbox" /><span>Indeterminate</span></label>
        <label class="gh-checkbox"><input class="gh-checkbox__control" type="checkbox" checked disabled /><span>Disabled</span></label>
      </fieldset>
    `,
  }),
  play: async ({ canvas, canvasElement }) => {
    const indeterminate = canvasElement.querySelector<HTMLInputElement>('#story-indeterminate');
    if (indeterminate) {
      indeterminate.indeterminate = true;
    }
    const unchecked = canvas.getByLabelText('Unchecked');
    await userEvent.click(unchecked);
    await expect(unchecked).toBeChecked();
    await expect(indeterminate?.indeterminate).toBe(true);
  },
};

export const RadioGroup: Story = {
  render: () => ({
    template: `
      <fieldset class="gh-form-group">
        <legend class="gh-form-field__label">Choose a plan</legend>
        <label class="gh-radio"><input class="gh-radio__control" type="radio" name="story-plan" value="starter" /><span>Starter</span></label>
        <label class="gh-radio"><input class="gh-radio__control" type="radio" name="story-plan" value="professional" checked /><span>Professional</span></label>
        <label class="gh-radio"><input class="gh-radio__control" type="radio" name="story-plan" value="enterprise" disabled /><span>Enterprise unavailable</span></label>
      </fieldset>
    `,
  }),
  play: async ({ canvas }) => {
    const starter = canvas.getByLabelText('Starter');
    await userEvent.click(starter);
    await expect(starter).toBeChecked();
  },
};

export const SwitchStates: Story = {
  render: () => ({
    template: `
      <fieldset class="gh-form-group">
        <legend class="gh-form-field__label">Switch states</legend>
        <label class="gh-switch"><input class="gh-switch__control" type="checkbox" role="switch" /><span>Off</span></label>
        <label class="gh-switch"><input class="gh-switch__control" type="checkbox" role="switch" checked /><span>On</span></label>
        <label class="gh-switch"><input class="gh-switch__control" type="checkbox" role="switch" checked disabled /><span>Disabled</span></label>
      </fieldset>
    `,
  }),
  play: async ({ canvas }) => {
    const off = canvas.getByRole('switch', { name: 'Off' });
    await userEvent.click(off);
    await expect(off).toBeChecked();
  },
};

export const PrefixAndSuffix: Story = {
  render: () => ({
    template: `
      <div class="gh-form-story-field gh-form-field">
        <label class="gh-form-field__label" for="story-budget">Budget</label>
        <div class="gh-control-shell">
          <span class="gh-control-shell__prefix" aria-hidden="true">€</span>
          <input class="gh-input" id="story-budget" type="number" min="0" />
          <span class="gh-control-shell__suffix" aria-hidden="true">EUR</span>
        </div>
      </div>
    `,
  }),
};

export const TrailingAction: Story = {
  render: () => ({
    template: `
      <div class="gh-form-story-field gh-form-field">
        <label class="gh-form-field__label" for="story-action-search">Search documentation</label>
        <div class="gh-control-shell">
          <span class="gh-control-shell__prefix" aria-hidden="true">⌕</span>
          <input class="gh-input" id="story-action-search" type="search" />
          <gh-icon-button class="gh-control-shell__action" type="button" size="sm" variant="ghost" aria-label="Run search"><span aria-hidden="true">→</span></gh-icon-button>
        </div>
      </div>
    `,
  }),
};

export const SolidCardContext: Story = {
  render: () => ({
    template: `
      <gh-card variant="outlined"><form class="gh-form-story-stack" (submit)="$event.preventDefault()"><h2>Solid form</h2><div class="gh-form-field"><label class="gh-form-field__label" for="story-solid-email">Email</label><input class="gh-input" id="story-solid-email" type="email" /></div><gh-button type="submit">Continue</gh-button></form></gh-card>
    `,
  }),
};

export const GlassCardContext: Story = {
  render: () => ({
    template: `
      <gh-ambient-background class="gh-form-story-stage" preset="brand"><gh-card variant="glass"><form class="gh-form-story-stack" (submit)="$event.preventDefault()"><h2>Glass parent, Solid controls</h2><div class="gh-form-field"><label class="gh-form-field__label" for="story-glass-email">Email</label><input class="gh-input" id="story-glass-email" type="email" /></div><gh-button type="submit">Continue</gh-button></form></gh-card></gh-ambient-background>
    `,
  }),
};

export const AmbientBackground: Story = {
  render: () => ({
    template: `
      <gh-ambient-background class="gh-form-story-stage" preset="cool"><div class="gh-form-story-field gh-form-field"><label class="gh-form-field__label" for="story-ambient-search">Search</label><input class="gh-input" id="story-ambient-search" type="search" placeholder="Controls stay legible without blur" /></div></gh-ambient-background>
    `,
  }),
};

export const DarkTheme: Story = {
  globals: { theme: 'dark' },
  render: () => ({
    template: `
      <div class="gh-form-story-grid">
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-dark-default">Default</label><input class="gh-input" id="story-dark-default" value="Dark theme value" /></div>
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-dark-invalid">Invalid</label><input class="gh-input" id="story-dark-invalid" value="Invalid" aria-invalid="true" aria-describedby="story-dark-error" /><p class="gh-form-field__error" id="story-dark-error">Correct this value.</p></div>
      </div>
    `,
  }),
};

export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'mobile320' } },
  render: () => ({
    template: `
      <div class="gh-form-story-stack">
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-mobile-email">Email</label><input class="gh-input" id="story-mobile-email" type="email" inputmode="email" /></div>
        <label class="gh-switch"><input class="gh-switch__control" type="checkbox" role="switch" checked /><span>A long mobile switch label wraps without horizontal overflow</span></label>
      </div>
    `,
  }),
};

export const LongEnglishAndSpanishContent: Story = {
  render: () => ({
    template: `
      <div class="gh-form-story-grid">
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-long-en">Describe the frontend architecture decision that your team needs to evaluate</label><textarea class="gh-textarea" id="story-long-en" aria-describedby="story-long-en-hint"></textarea><p class="gh-form-field__hint" id="story-long-en-hint">Include constraints, accessibility requirements and the expected engineering outcome.</p></div>
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-long-es">Describe la decisión de arquitectura frontend que tu equipo necesita evaluar</label><textarea class="gh-textarea" id="story-long-es" aria-invalid="true" aria-describedby="story-long-es-error"></textarea><p class="gh-form-field__error" id="story-long-es-error">Agrega suficiente contexto para poder comprender el problema y proponer una solución.</p></div>
      </div>
    `,
  }),
};

export const ReducedMotionAndForcedColors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use browser emulation to verify reduced motion and forced colors. Transitions are removed, compact controls restore native appearance, and focus/invalid boundaries use system colors.',
      },
    },
  },
  render: () => ({
    template: `
      <div class="gh-form-story-stack">
        <div class="gh-form-field"><label class="gh-form-field__label" for="story-resilience">Resilient input</label><input class="gh-input" id="story-resilience" aria-invalid="true" aria-describedby="story-resilience-error" /><p class="gh-form-field__error" id="story-resilience-error">Error remains text, not color alone.</p></div>
        <label class="gh-checkbox"><input class="gh-checkbox__control" type="checkbox" checked /><span>Checked remains recognizable</span></label>
        <label class="gh-switch"><input class="gh-switch__control" type="checkbox" role="switch" checked /><span>Switch remains operable</span></label>
      </div>
    `,
  }),
};
