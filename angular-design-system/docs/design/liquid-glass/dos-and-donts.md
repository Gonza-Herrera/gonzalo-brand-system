# Liquid Glass do and don't

Use these pairs during design and code review. The desired result is a quiet material hierarchy, not
the greatest visible amount of glass.

## Surface and hierarchy

| Do                                                 | Don't                                                       | Why                                            |
| -------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------- |
| Use the lowest depth that explains the composition | Combine three unrelated elevation levels in one local group | Too many levels obscure hierarchy              |
| Start with Solid and justify translucency          | Make every container glass                                  | Glass loses meaning when it is universal       |
| Group related content on one shared material       | Put glass cards inside a glass panel                        | Nested filters create noise and rendering cost |
| Keep one dominant surface in a composition         | Give every sibling an equally strong shadow                 | Competing surfaces remove focus                |
| Let spacing and typography establish structure     | Use blur and glow to compensate for weak layout             | Effects cannot replace information hierarchy   |

## Content and contrast

| Do                                                   | Don't                                                 | Why                                             |
| ---------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------- |
| Validate composited contrast over approved backdrops | Test text only over a neutral design-tool canvas      | Transparency makes contrast contextual          |
| Make text and controls visually stable               | Apply container opacity to content                    | Content must not inherit material transparency  |
| Use Solid over uncontrolled imagery                  | Assume blur makes every image safe                    | High-frequency backdrops can remain distracting |
| Keep state cues explicit                             | Communicate selected or error state only through tint | Color and material alone are insufficient       |
| Preserve a visible focus ring                        | Let a highlight or glow resemble focus                | Users need an unambiguous interaction indicator |

## Lighting and color

| Do                                               | Don't                                                        | Why                                                  |
| ------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------------- |
| Use one soft light direction                     | Mix highlights and shadows from different directions         | The material loses physical coherence                |
| Let one brand family tint the environment subtly | Combine saturated Lavender, Peach, Blue, Mint, and Sky glows | Brand color becomes visual noise                     |
| Use a restrained reflection away from content    | Place a bright streak behind a heading                       | Reflection must not impair reading                   |
| Use theme-aware soft shadows                     | Use pure black cut-out shadows                               | Harsh shadows conflict with the calm visual language |
| Use contextual boundaries                        | Use fully white or fully black glass borders                 | Extreme borders look pasted on                       |

## Blur and transparency

| Do                                              | Don't                                                     | Why                                             |
| ----------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------- |
| Use blur only to support separation             | Choose the largest blur because it looks premium          | Strong blur becomes the subject                 |
| Keep one filter per material region             | Stack backdrop filters in descendants and pseudo-elements | Cost and appearance become unpredictable        |
| Increase containment when contrast is uncertain | Increase transparency at higher depth                     | Depth and transparency are different properties |
| Provide a complete Solid fallback               | Treat no-blur as a broken version                         | Material enhancement must be optional           |
| Keep reading surfaces stable                    | Apply blur to long lists and dense forms                  | Repetition multiplies distraction and cost      |

## Motion

| Do                                           | Don't                                             | Why                                                    |
| -------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------ |
| Animate a meaningful state or spatial change | Animate materials continuously                    | Persistent motion distracts and consumes resources     |
| Keep hover and focus prompt                  | Stage essential feedback behind a long transition | Interaction must feel immediate                        |
| Use quiet settling motion                    | Use bounce, elastic overshoot, or dramatic scale  | Exaggerated motion conflicts with precision            |
| Preserve the final state with reduced motion | Remove content or state along with animation      | Motion is not information                              |
| Keep blur and large shadows static           | Animate filter intensity on routine interaction   | These properties are expensive and visually aggressive |

## Composition examples

### Recommended

```text
Ambient background (Depth 0)
└── One restrained panel (Depth 1)
    ├── Opaque heading and body content
    ├── Native controls with visible focus
    └── One temporary popover when requested (Depth 3)
```

### Avoid

```text
Animated gradient and glow
└── Full-page glass filter
    └── Glass card grid
        └── Glass tags and controls
            └── Multiple reflections and floating shadows
```

The second composition has no clear material owner, multiplies rendering cost, and makes every
element compete for attention.

## Review shortcut

Before approval, temporarily remove blur, reflection, and glow. If hierarchy, contrast, or state
becomes unclear, fix the underlying surface and content structure before restoring any effect.
