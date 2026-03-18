# Blueprint: liveprd System

## Overview
**liveprd** is a "Living Planning System" that synchronizes AI insights with a structured, machine-readable planning document. This web app provides a dual-pane interface: a left-side AI agent chat and a right-side hierarchical planning viewer.

## Design & Features
- **Visual Aesthetic:**
    - **Color Palette:** Professional "Deep Tech" look using `oklch()`. Dark slate backgrounds, vibrant electric blue/cyan accents, and clean white/gray text.
    - **Typography:** `Inter` (sans-serif) for high legibility and a modern, functional feel.
    - **Layout:** A split-pane view with a 40/60 ratio.
- **Modern CSS (Baseline):**
    - **CSS Grid & Flexbox:** For the main split-pane and hierarchical structure.
    - **oklch() Colors:** For perceptually uniform transitions and vibrant accents.
- **Interactivity & Web Components:**
    - `<liveprd-chat>`: Left Pane. Manages AI conversation history and input.
    - `<liveprd-viewer>`: Right Pane. Root component for the hierarchical document.
    - `<liveprd-node>`: A recursive component representing Level 1 (Requirement) to Level 4 (Flow).
- **Dynamic State:**
    - Centralized state management for the planning document (JSON-based).
    - Real-time updates mirroring the `requirements.md` structure.

## Detailed Implementation Log
- **[Step 1] Project Initialization:** (Completed) Implemented the split-pane layout and core Web Components (`liveprd-chat`, `liveprd-viewer`, `liveprd-node`). Established the "Deep Tech" oklch design system.
- **[Step 2] Data Mapping & Polish:** Mapping the remaining PRD points to the hierarchical viewer and refining the AI agent interactions.
