---
id: reusable-extendable-pcf
title: Building a Reusable and Extendable PCF Component Framework
premise: Designing EPCF to bridge low-code speed with enterprise-grade control.
featuredImage: /images/articles/epcf.jpg
featured: true
tag: Architecture
date: March 2025
---


Low-code platforms tend to fail quietly. They work well at first. Delivery is fast, demos look convincing, and early iterations feel productive. Over time, though, systems begin to resist change. Reuse becomes awkward. Custom behavior leaks into places it doesn’t belong. Teams either accept the constraints or start rebuilding the same logic again and again in slightly different forms.

Power Platform followed this exact pattern. Standard Power Pages components were sufficient until real systems demanded more—multiple APIs, richer interaction models, variation across portals, and evolution without constant rewrites. At that point, the choice became binary: stay within the platform’s limits, or abandon its abstractions entirely.

EPCF emerged from the refusal to accept that tradeoff.

The intent was not to replace low-code tooling, but to restore architectural leverage where it mattered. The question was simple but uncomfortable: how do you keep the speed of Power Pages while regaining control over reuse, extensibility, and long-term maintenance?

The answer turned out not to be “more flexibility,” but *better boundaries*.

In enterprise systems, UI components are rarely static. They integrate with APIs that change over time, adapt to different business contexts, and accumulate edge cases through real usage. When every new requirement forces a rewrite, the problem is not missing features—it is missing structure.

EPCF was shaped around a single constraint: one component should work across many systems without becoming rigid or fragile. That immediately ruled out one-off PCFs and ad-hoc customization. It also ruled out exposing unlimited configuration that would slowly turn into an untyped programming layer.

Instead, structure had to carry the weight.

Internally, EPCF introduced separation where the base platform intentionally stayed flat. Rendering, data flow, formatting, event handling, and extensibility were no longer entangled. A stable core coordinated lifecycle and state, while everything that changed frequently lived at the edges. The goal was not abstraction for its own sake, but insulation—so that new behavior could be added without destabilizing existing ones.

This separation paid off most clearly when APIs entered the picture.

Rather than binding components to specific backend contracts, EPCF treated APIs as interchangeable inputs. Behavior was driven through a structured configuration layer that defined columns, filters, sorting semantics, pagination behavior, and formatting rules. Changing an API no longer meant rebuilding the component; it meant changing how the component was *described*.

Configuration stopped being a workaround and became a control surface.

As EPCF was used across products, repetition became visible. Pagination logic appeared everywhere. Sorting rules were reimplemented repeatedly. Filters behaved inconsistently across teams. These were not hard problems, just expensive ones to keep solving.

Those patterns were folded into the framework deliberately—not to be clever, but to remove choice. Defaults encoded the common case, so developers didn’t have to keep re-deciding the same things. Less code was written, but more importantly, fewer decisions were left to chance.

Extensibility presented its own risk. Reusable systems often die by a thousand flags and conditionals, each added to satisfy one more edge case. EPCF avoided this by pushing all custom behavior outward. Instead of modifying the core, extensions lived as plugins—additive, isolated, and explicit.

That decision mattered more over time than it did initially. The core stayed stable not because no one touched it, but because there was rarely a reason to.

None of this would have mattered if the framework only worked in theory. EPCF was validated under production pressure: multiple enterprise portals, different domains, distinct data models, and hundreds of active users. The same framework instance survived backend evolution, feature growth, and changing teams without fragmenting.

That was the real test.

The most important lessons were not specific to Power Platform. Configuration had to be constrained, or it would become chaos. Extension points had to be documented, or they would be misused. Backward compatibility had to be treated as a first-class concern, or reuse would collapse over time.

EPCF did not succeed because it was flexible. It succeeded because it was *selectively inflexible* in the right places.

It did not try to escape low-code abstractions. It met them halfway—preserving speed while reintroducing structure where systems actually age.

The broader lesson extends beyond PCF. Reusable systems don’t win by solving every edge case. They win by encoding good defaults, exposing intentional extension points, and reducing the cost of being consistent over time.

In complex products, flexibility is not about how much you allow.  
It’s about how carefully you decide **where** to allow it.
