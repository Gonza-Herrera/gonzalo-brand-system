# Liquid Glass motion

Motion communicates continuity between material states. It should feel soft, precise, and settled;
it must never become the personality of the interface.

PR 21 defines behavior only. It does not add animations, token values, or component transitions.

## Motion purposes

Animate only when motion helps a user understand:

- a surface entering or leaving a spatial layer;
- a control changing between stable states;
- focus moving to temporary UI;
- content expanding, collapsing, or reordering;
- a material settling into a new depth.

Do not animate merely to make translucency visible. Static reading, scrolling, and repeated content
do not need continuous material motion.

## Duration classes

| Class          | Perceived behavior    | Intended change                                              |
| -------------- | --------------------- | ------------------------------------------------------------ |
| **Immediate**  | No perceptible travel | Focus, pressed, disabled, and essential state feedback       |
| **Short**      | Prompt and quiet      | Hover, selection, small control state, local boundary change |
| **Standard**   | Clear continuity      | Panel entry, expansion, and ordinary depth change            |
| **Deliberate** | Focused but not slow  | Dialog or overlay composition with meaningful travel         |

Exact durations remain token work. Existing components continue to use the current fast and slow
motion contract until a dedicated implementation PR changes it.

## Easing

- State changes should settle smoothly without bounce or overshoot.
- Entering surfaces may decelerate as they reach their stable depth.
- Exiting surfaces may leave more directly while preserving focus restoration.
- Paired surfaces should share one motion rhythm rather than independent delays.
- The existing standard easing is the default reference until a validated token set replaces or
  extends it.

Spring, elastic, and cursor-reactive motion are not defaults for this language.

## Properties

Prefer changes that are inexpensive and preserve visual stability. Opacity and restrained transform
may support spatial continuity when they do not blur text or change layout. Boundary and shadow
changes must remain subtle.

Do not routinely animate:

- backdrop blur;
- large shadows;
- ambient background fields;
- gradients or reflections;
- filters across page-sized regions;
- geometry that causes layout shift.

## Interaction states

- **Hover:** reinforces affordance; it must not lift every surface dramatically.
- **Focus:** appears promptly and must not wait for decorative motion.
- **Pressed:** communicates direct response without simulated physical wobble.
- **Selected:** settles into a stable, non-animated state that remains identifiable.
- **Loading:** uses progress semantics; glass shimmer is not a loading pattern.
- **Enter and exit:** preserve relationship to the trigger and restore focus correctly.

Motion cannot be the only indication of state.

## Reduced motion

Under `prefers-reduced-motion: reduce`:

- remove non-essential translation, scale, parallax, shimmer, and staged sequencing;
- make state changes immediate or near-immediate;
- preserve focus, visibility, ordering, and final state;
- do not replace removed motion with flashing or abrupt glow;
- keep progress understandable through text, semantics, or stable visual state.

The existing global foundation already minimizes animation and transition duration under reduced
motion. Future components must also avoid introducing motion outside that contract.

## Review checklist

- Does the motion explain a change?
- Is the state understandable in a still frame?
- Does focus update at the correct time?
- Is the motion quiet at repeated use?
- Does reduced motion preserve the complete task?
- Are expensive filter and shadow animations absent?
