---
id: reusable-extendable-pcf
title: Building a Reusable and Extendable PCF Component Framework
premise: Designing EPCF to bridge low-code speed with enterprise-grade control.
tag: Architecture
date: March 2025
---

Power Platform promises rapid delivery, but breaks down quickly once systems demand reuse, customization, and API-driven behavior. Standard components work until they don’t—at which point teams are forced to either accept limitations or rebuild everything from scratch.

This case study documents how we designed **EPCF (Extended PowerApps Component Framework)** to solve that exact gap: enabling reusable, extensible, and production-ready UI components inside Power Pages without sacrificing developer control or maintainability.

---

## The problem: low-code ceilings in real systems

In real enterprise products, UI components are rarely static. They need to:
- Integrate with multiple backend APIs
- Support sorting, filtering, pagination, and formatting
- Adapt across portals, entities, and business contexts
- Evolve without repeated rewrites

Power Pages’ default components are intentionally constrained. Building custom PCFs from scratch, on the other hand, is time-consuming and leads to duplicated logic across teams and projects.

The core tension was clear: **speed versus control**.

---

## Design goal: one component, many systems

EPCF was designed with three non-negotiable goals:

1. **High reuse without rigidity**  
   A single component should adapt across portals, entities, and APIs.

2. **Clear extension points**  
   Custom behavior should be additive, not invasive.

3. **No-code for users, full control for developers**  
   Business users configure behavior via metadata, while developers retain code-level authority when needed.

---

## Architectural approach

At its core, EPCF sits on top of the **Power Pages Component Framework**, but introduces a structured internal architecture that separates concerns cleanly :contentReference[oaicite:1]{index=1}.

The system is organized around:
- A **core engine** responsible for API-driven rendering, lifecycle management, and state coordination
- **Views** that define table structure, columns, headers, and cell rendering
- **Managers** that encapsulate HTTP communication, event handling, and data flow
- **Formatters** that standardize date, number, and currency rendering
- **Plugins** that extend column behavior without modifying core logic

This separation ensured that extending behavior never meant touching the core rendering engine.

---

## Configuration-driven behavior

A key decision was to make EPCF **API-agnostic by design**. Instead of binding tightly to specific backend contracts, EPCF relies on a JSON configuration layer that defines:
- Column definitions and mappings
- Filter types and UI behavior
- Sorting and pagination semantics
- Data formatting rules

This allowed the same component to integrate with multiple REST APIs simply by changing configuration—no PCF rebuild required :contentReference[oaicite:2]{index=2}.

---

## Built-in capabilities that reduced duplication

Several features were deliberately built into the framework because they appeared repeatedly across products:

- **Pagination**: Automatic injection of page index and page size parameters, adaptable to query or header-based APIs
- **Sorting**: Consistent handling of `orderBy` and sort direction across backends
- **Filtering**: Metadata-driven filter UI generation with correct payload formatting per data type
- **Data binding and formatting**: Automatic mapping of API responses to UI without custom glue code

Each of these removed dozens of lines of repetitive logic per implementation.

---

## Extensibility without core modification

Rather than adding flags or conditional logic, EPCF uses a **plugin model** for extending behavior. Examples include:
- Text rendering with clipboard support
- Date formatting with tooltips and badges
- Action menus for row-level operations
- Custom column renderers defined entirely outside the core

This kept the core engine stable while enabling rapid feature growth :contentReference[oaicite:3]{index=3}.

---

## Production adoption and validation

EPCF is not a theoretical framework. It has been deployed in multiple enterprise-grade products, including:
- Servicer Portal
- Producer Portal

Across deployments, EPCF powers:
- Multiple portals
- Dozens of reusable UI components
- Several distinct data entities
- Hundreds of active production users :contentReference[oaicite:4]{index=4}

This real-world usage validated the original design assumption: **reusability only matters if it survives production pressure**.

---

## What worked—and what didn’t

**What worked well**
- Configuration over customization dramatically reduced long-term maintenance
- Plugin-based extensibility prevented core logic decay
- API-agnostic design made EPCF resilient to backend evolution

**What required discipline**
- Configuration schemas had to be carefully constrained to avoid becoming a second programming language
- Clear documentation was essential to prevent misuse of extension points
- Backward compatibility needed to be treated as a first-class concern

---

## Closing perspective

EPCF was not built to replace Power Platform abstractions—it was built to **extend them responsibly**. The goal was never flexibility for its own sake, but *repeatability under real constraints*.

The broader lesson applies beyond PCF: reusable systems succeed when they encode the right defaults, expose intentional extension points, and resist the temptation to solve every edge case upfront.

