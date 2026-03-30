# Design System Specification: The Precision Layer

## 1. Overview & Creative North Star
**Creative North Star: "The Clinical Curator"**
This design system moves beyond the "generic dashboard" by treating data recruitment as a high-stakes editorial process. Borrowing from the hyper-precise aesthetics of Linear and Vercel, the system prioritizes "Information Density without Clutter." 

We break the "template" look by rejecting traditional box-models. Instead of a grid of bordered boxes, we use **Intentional Asymmetry** and **Tonal Depth**. The UI should feel like a series of calibrated instruments resting on a gallery floor—refined, authoritative, and obsessively clean. We use extreme white space and subtle tonal shifts to guide the recruiter’s eye toward "High-Signal" data (candidates, status changes, and bottlenecks).

## 2. Colors & Surface Architecture
We utilize a sophisticated palette that moves from pure light to functional deep blues, ensuring the interface feels "expensive" rather than "default."

### Surface Hierarchy & The "No-Line" Rule
**Rule:** 1px solid borders are strictly prohibited for sectioning. 
Boundaries must be defined through **Background Color Shifts**. To create a section, place a `surface_container_low` area against the `background`. This creates a sophisticated, "etched" look that feels integrated into the OS.

*   **Background (Canvas):** `#f7f9fb`
*   **Surface (Base Layer):** `#f7f9fb`
*   **Surface Container Low (Standard Section):** `#f2f4f6` (Use for sidebars or secondary panels)
*   **Surface Container Lowest (The "Active" Card):** `#ffffff` (Use for the primary content focus)
*   **Surface Container High (Hover/Action):** `#e6e8ea`

### The "Glass & Gradient" Rule
To elevate the dashboard from "SaaS-standard" to "High-End," floating elements (Modals, Command Palettes, Popovers) must use **Glassmorphism**.
*   **Effect:** Apply `surface_container_lowest` at 80% opacity with a `20px` backdrop-blur. 
*   **Signature Gradients:** For primary Call-to-Actions (CTAs), use a subtle linear gradient from `primary` (#0058be) to `primary_container` (#2170e4) at a 135-degree angle. This adds "soul" and a tactile, pressed quality to buttons.

## 3. Typography: Editorial Precision
The typography system uses **Inter** to create a hierarchy that feels like a technical manual. We rely on drastic scale shifts rather than bold weights to signal importance.

*   **Display (The Overview):** `display-sm` (2.25rem) — Used only for high-level metrics (e.g., "42 Total Hires"). Tighten letter-spacing to `-0.02em`.
*   **Headline (Section Headers):** `headline-sm` (1.5rem) — Used for page titles.
*   **Title (Contextual Labels):** `title-sm` (1rem) — Use for card titles.
*   **Body (Data Entry):** `body-md` (0.875rem) — The workhorse for candidate names and descriptions.
*   **Label (Metadata):** `label-sm` (0.6875rem) — Use `on_surface_variant` (#424754) for timestamps and secondary tags. All-caps with `0.05em` tracking for a "Pro" feel.

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "heavy" for a data-focused tool. We achieve depth through the **Layering Principle**.

*   **Layering Principle:** Instead of a shadow, place a `surface_container_lowest` card on a `surface_container_low` background. The subtle contrast (Delta E < 2) creates a natural lift.
*   **Ambient Shadows:** For floating menus, use a "Ghost Shadow": 
    *   `box-shadow: 0 8px 32px rgba(0, 88, 190, 0.04);` 
    *   Note the use of the primary color tint in the shadow rather than black; this keeps the UI feeling "airy."
*   **The Ghost Border:** If a divider is mandatory (e.g., a multi-step form), use `outline_variant` (#c2c6d6) at **15% opacity**. It should be felt, not seen.

## 5. Components

### Buttons & Chips
*   **Primary Button:** Gradient-filled (`primary` to `primary_container`). `0.375rem` (md) roundedness. No border.
*   **Secondary/Tertiary:** `surface_container_lowest` background with a `ghost-border`. 
*   **Status Chips:** Use a soft-fill approach. A "Success" chip uses `success` text on a background of `success` at 10% opacity. No borders.

### Input Fields & Data Entry
*   **Precision Inputs:** Background: `surface_container_lowest`. On focus, the border doesn't just change color; it transitions to a `1.5px` solid `primary` with a subtle `2px` outer glow of `primary` at 10% opacity.
*   **The "No-Divider" List:** For candidate lists, **forbid divider lines.** Use `1.3rem` (Spacing 6) of vertical padding between items. Use a `surface_container_low` background on hover to define the row.

### Dashboard Specific Components
*   **The "Metric Micro-Card":** A small, borderless container using `surface_container_lowest`. Use a `tertiary` (#924700) accent for "In-Progress" counts to provide visual warmth against the cool blues.
*   **The Pipeline Rail:** A vertical or horizontal track using `surface_container_high`. Candidate cards move across these tracks, using `xl` (0.75rem) roundedness to feel distinct from the "square" data tables.

## 6. Do's and Don'ts

### Do
*   **Do** use `2.25rem` (Spacing 10) of padding for page gutters to create an "Editorial" feel.
*   **Do** use `on_surface_variant` for all non-essential text to reduce cognitive load.
*   **Do** ensure all interactive elements have a `0.2s ease-out` transition for hover states.

### Don't
*   **Don't** use pure black (#000) for text. Use `on_surface` (#191c1e).
*   **Don't** use standard 4px spacing for everything. Use the **Spacing Scale** to create rhythmic asymmetry (e.g., more space above a header than below it).
*   **Don't** use high-contrast borders. If the background change isn't visible enough, your `surface` colors are too close—adjust the tier, don't add a line.