# Glass Panel

`gh-glass-panel` is a constrained convenience composition for common Liquid Glass panels. It
renders a public `gh-surface` internally and does not duplicate the material mapping or styles.

## Import

```ts
import { GhGlassPanelComponent } from 'gh-design-system';
```

## API and defaults

| Input         | Type                                      | Default   |
| ------------- | ----------------------------------------- | --------- |
| `variant`     | `glass-subtle \| glass \| glass-elevated` | `glass`   |
| `padding`     | `none \| xs \| sm \| md \| lg \| xl`      | `md`      |
| `radius`      | `none \| small \| default \| large`       | `default` |
| `interactive` | `boolean`                                 | `false`   |
| `disabled`    | `boolean`                                 | `false`   |

`solid` is excluded because it contradicts the component's intent. `glass-floating` is excluded
because popovers, menus and tooltips require positioning, dismissal and accessibility contracts
beyond a panel primitive.

```html
<gh-glass-panel padding="lg">
  <h2>Project summary</h2>
  <p>One clear material boundary around related content.</p>
</gh-glass-panel>
```

Use `gh-surface` when the material must include `solid` or `glass-floating`, or when a shared API is
more useful than the explicit panel intent. Glass Panel remains semantically neutral and inherits
Surface's interaction, disabled, fallback, theme, accessibility and performance rules.
