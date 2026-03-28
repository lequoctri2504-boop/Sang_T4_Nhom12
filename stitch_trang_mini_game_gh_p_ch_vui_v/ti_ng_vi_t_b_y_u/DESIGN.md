# Design System Document: The Playful Voyager

## 1. Overview & Creative North Star

**Creative North Star: "The Tactile Cloudscape"**
This design system moves away from the rigid, flat "educational app" templates of the past. Instead, it creates a "Tactile Cloudscape"—a digital environment that feels like a collection of soft, physical toys floating in a sunlit room. For children aged 2-4, the interface must feel "squishy" and responsive, prioritizing muscle memory and joyful discovery over traditional navigation.

We break the standard grid through **Intentional Asymmetry**. Buttons shouldn't always align perfectly; they should feel like they were placed by hand on a felt board. Overlapping elements and layered "pill" shapes create a sense of depth that encourages tiny fingers to reach out and touch.

---

## 2. Colors: The Pastel Spectrum

Our palette is not just decorative; it is functional. Each hue serves as a "Learning Zone" anchor. 

### Palette Logic
- **Primary (`#04647d` to `#9ae1ff`):** Used for "Action" and "Sky" elements. It represents progress and movement.
- **Secondary (`#834b55` to `#ffc2ca`):** The "Soft Heart." Used for rewards, characters, and "Soft Pink" encouragement.
- **Tertiary (`#6e5a00` to `#feda57`):** The "Sunny Guide." Used for highlights, stars, and interactive "Sunny Yellow" hints.
- **Surface (`#e6ffc5`):** Our "Grass Green" base. This provides a calming, organic foundation that reduces eye strain.

### The "No-Line" Rule
**Strict Mandate:** Prohibit 1px solid borders. To separate a card from the background, use a background shift from `surface` to `surface-container-low`. For internal nesting, move to `surface-container-high`. This creates a seamless, "molded" look rather than a technical one.

### Signature Textures
Apply a subtle linear gradient to main interaction points (e.g., `primary` to `primary-container`) with a 15-degree tilt. This gives "soul" to the shapes, making them appear 3D and "poppable."

---

## 3. Typography: Vietnamese-First Clarity

The hierarchy is dominated by **Plus Jakarta Sans** for high-impact character recognition and **Be Vietnam Pro** for supporting text, ensuring perfect diacritic rendering for the Vietnamese alphabet.

- **Display Large (3.5rem):** Reserved for the "Letter of the Day." It should feel heroic and monumental.
- **Headline Medium (1.75rem):** Used for instructional prompts (e.g., "Chạm vào chữ A").
- **Body Large (1rem):** Used for parent-facing text or short labels.
- **Scale Strategy:** We use exaggerated font sizes. For a 2-year-old, the letter *Ă* isn't just a character; it's a shape to be explored.

---

## 4. Elevation & Depth: Tonal Layering

We reject the standard "Drop Shadow" in favor of **Tonal Layering**.

- **The Layering Principle:** 
  - Level 0 (Base): `surface`
  - Level 1 (Card): `surface-container-lowest` (creates a clean, bright lift)
  - Level 2 (Active Button): `surface-container-highest` (creates a "pressed into the grass" effect)

- **Ambient Shadows:** When an object "floats" (like a flying letter), use a shadow tinted with `on-surface` at 6% opacity. 
  - *Values:* `0px 20px 40px rgba(29, 53, 0, 0.06)`. 

- **Glassmorphism:** Use for the **Parental Gate**. A high-blur backdrop (`blur-xl`) using `surface-container-lowest` at 70% opacity creates a "frosted window" that separates the child's world from the adult settings without breaking the immersion.

---

## 5. Components: Tactile Primitives

### Large Interactive Buttons
- **Shape:** Use the `xl` (3rem) rounding scale. At this age, corners are "ouchies"; circles are friends.
- **Interaction:** On hover/tap, use Framer Motion to scale the button to `1.05`. On click, use a "squish" animation (scale `0.95`).
- **Style:** No borders. Use `primary` for the button and `on-primary` for the icon/text.

### Playful Learning Cards
- **Construction:** `surface-container-lowest` background with a `1.5` (0.5rem) spacing padding.
- **Separation:** Never use dividers. Use a `6` (2rem) vertical gap between cards to allow "breathing room" for clumsy navigation.

### The Parental Gate
- **Visual Style:** A full-screen "Glass" overlay.
- **Mechanism:** A "Hold for 3 seconds" interaction or a simple Vietnamese word-math problem (e.g., "Ba + Hai = ?"). This uses `headline-sm` typography to distinguish it from the child’s "game" fonts.

### Progress Dashboard (Adult View)
- **Style:** Clean and "Soft Minimalist." 
- **Components:** Use `secondary-container` for bar charts and progress rings. The dashboard should feel like a "zen garden"—organized, quiet, and clear, contrasting with the vibrant energy of the learning screens.

---

## 6. Do’s and Don'ts

### Do:
- **Use "Ghost Borders" for disabled states:** If a button is locked, use `outline-variant` at 15% opacity.
- **Animate Transitions:** Every screen change should feel like a page-turn or a sliding drawer.
- **Prioritize "Hit Areas":** Ensure every interactive element is at least `spacing-16` (5.5rem) in height/width.

### Don’t:
- **Don’t use "Pure Black":** Use `on-background` (`#1d3500`) for text. It is softer and more organic.
- **Don’t use 100% Opaque Borders:** They create "visual noise" that distracts toddlers from the core shapes of the letters.
- **Don’t Overcrowd:** If more than three interactive elements are on screen, move the rest to a new "page."

---

## 7. Motion Signature

Inspired by **Framer Motion**, all elements should have a "spring" physics.
- **Entrance:** `type: "spring", stiffness: 300, damping: 20`
- **The "Wobble":** Interactive letters should have a subtle, perpetual ±2-degree rotation to signal they are "alive" and ready to be touched.