### Design Constraints Document - SWISH Platform

**Based on:**
*   Frozen Intent Document
*   Interaction Blueprint (from ux_ui_designer via codebase_investigator)
*   Guidance from `.awwwardskill/agents/ux-ui.agent.md`
*   Guidance from `.awwwardskill/agents/performance.agent.md`

---

**1. Motion Philosophy:**

*   **Standard UI Transitions (Hover, Focus, Open):** MUST be `data-state` driven. This means state changes (e.g., a button being hovered) should trigger pre-defined animation states, ensuring consistency and predictability.
*   **Cinematic Reveals (Hero, Section Transitions, Narrative Elements):** Should evaluate "Compositing Reveals" (Canvas/Masking) or "Split Staging" over simple opacity transitions. This aligns with the "Inertial Narrative + Layered Depth Perception" philosophy. Examples: Animated "SWISH" text, fade-up on scroll effects for major sections, animated counters.
*   **Scroll-Driven Narratives:** Implied by "Inertial Narrative" and "scroll-driven narrative paths". The application should leverage scroll position to trigger and control animations, especially for sections like "How It Works" and "Featured Experiences" carousel.
*   **Cursor Behavior:** "Magnetic Locking" for interactive elements where appropriate to enhance engagement, otherwise default.

**2. Typography Direction:**

*   **Rhythm & Staging:** Utilize "SplitText staging" for text reveals, particularly for headlines and narrative sections (e.g., "Our Vision/Mission" on About page, "animated 'SWISH' text" on Homepage) to achieve an "Awwwards-level" polish.
*   **Strong Typography:** As per the Frozen Intent, typography should be a key visual element, contributing to the professional and compelling feel.

**3. Layout Philosophy:**

*   **Layered Depth Perception / Pseudo-3D Stacking:** Implement techniques that create a sense of depth within the UI (e.g., background elements moving at different speeds on scroll, overlaying content). This aligns with the "Inertial Narrative + Layered Depth Perception" philosophy.
*   **Split Reveals / Split-Viewport Narratives:** Consider using these techniques for dramatic section transitions or to highlight key content blocks.
*   **Content Hierarchy:** Information architecture must clearly guide the user's eye, as defined in the Interaction Blueprint.

**4. Performance Constraints (Animation Budget & Optimization):**

*   **60fps Requirement:** All interactions and animations MUST maintain a consistent 60 frames per second. This is a hard metric for all motion.
*   **CLS Prevention:** Cumulative Layout Shift (CLS) during animations and page loads MUST be prevented. This implies careful handling of dynamic content and layout changes.
*   **Asset Loading:** "Lazy Loading" of images is mandatory (e.g., for experience listings, hero images).
*   **Loading States:** Spinners or placeholders MUST be shown while data is being fetched to manage perceived performance and prevent jank.
*   **Responsive Design:** All elements, including animated ones, must function seamlessly across desktop, tablet, and mobile, adhering to the "fully responsive" requirement.
*   **Restraint on Excessive Animations:** While animations are crucial for the brand identity, they must be purposeful and not compromise performance. The Performance Agent enforces restraint.

**5. General UI/UX Constraints:**

*   **Clear CTAs:** Prominent Call to Action buttons are required (e.g., "Get Started", "Contact Us").
*   **Icons:** Use of icons as per the Frozen Intent (e.g., "Who SWISH is For" section).
*   **Responsive Design:** Fully responsive on desktop, tablet, and mobile as per the Frozen Intent.
*   **Feedback States:** Success and error messages must be shown for user actions.

---

**Summary of Key Directives:**

*   **State-driven UI motion, timeline-driven cinematic motion.**
*   **SplitText for impactful typography reveals.**
*   **Layered depth and scroll-driven narratives for immersive experience.**
*   **Strict 60fps and CLS prevention for all animations.**
*   **Prioritize responsive, performant design with lazy loading and clear feedback.**
