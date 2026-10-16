---
title: "Which Tasks Should You Automate with AI? A Practical Framework"
seo_title: "Which Tasks to Automate with AI | Pranjal Pandey"
description: "Decide which tasks go to AI and which stay with people. A practical framework for task allocation and human review, borrowed from fair division."
published: 2026-10-16
draft: false
author: Pranjal Pandey
audience: business
tags: [AI strategy, AI automation, human in the loop, multi-agent systems, fair division]
---

Every AI workflow, from a humble chatbot to a whole team of AI agents, quietly answers one question over and over: which tasks to automate with AI, and which to keep with people?

**Which parts of this work should the AI do, and which should stay with people?**

Most teams answer it by vibes. Give the AI the boring stuff, keep the important stuff, hope for the best. Sometimes that works. Often you end up with an AI doing things it's bad at, humans babysitting it like an intern on their first day, and nobody quite sure who's responsible when it emails a client something odd.

I happen to spend my research life on a related problem. My PhD at IIT Jodhpur is in multi-agent systems, specifically **fair division**: the mathematics of splitting resources and tasks between agents who want different things. Yes, it's a real field. Yes, it involves a lot of proofs about cake. (Really. "Cake-cutting" is a classic problem in the area. Mathematicians have been arguing about dessert since at least the 1940s.)

It sounds abstract, but the more AI workflows I build for companies, the more this old field keeps handing me practical answers to a very new question. Here are four ideas from it that will make your AI task allocation much better, no proofs required.

## Which tasks to automate with AI: a starting decision table

| Work in the workflow | Starting split | What to check |
| --- | --- | --- |
| Repeated document sorting | AI suggests categories | Accuracy on messy examples |
| Sensitive client replies | AI drafts, a person edits and sends | Context, tone and permission |
| High-stakes decisions | A person decides, AI assists | Accountability and review |
| Rare exceptions | A person handles them | Whether enough evidence exists to automate |

These are starting points, not universal rules. The right split depends on the workflow, the people and the cost of getting it wrong.

## 1. "Efficient" and "fair" are two different questions

Fair division asks two separate questions about any way of splitting things up:

- **Is it efficient?** Could you rearrange things so someone's better off and nobody's worse off? If yes, you're leaving value on the table.
- **Is it fair?** Does each participant think their share is reasonable compared with everyone else's?

A split can be beautifully efficient and still feel deeply unfair, and the reverse.

Now apply that to automation. The "efficient" plan might hand AI every task it can do faster than a person. But if the result is that one team's whole job becomes reviewing AI output all day, while another team keeps all the interesting work, you've designed something that's optimal on paper and quietly sabotaged in practice. People don't adopt workflows they resent. They just "forget" to use them.

**What to do:** when you decide what to automate, check both angles. *Is this the best use of everyone's strengths?* And *does each person end up with work they'd call reasonable?* Skip the second question and it will come back later, disguised as "low adoption".

## 2. Use the envy test: would anyone swap?

One of the central ideas in fair division is **envy-freeness**. A split is envy-free if nobody would rather have someone else's share than their own.

It's a brilliant test because it doesn't require everyone to agree on what's valuable. Everyone judges by their own taste. You don't have to prove the split is objectively fair, just that nobody wants to trade.

In real AI workflows, "envy" shows up as:

- Someone desperately wishing the AI would take a task they hate, but it was kept for them because it's "too important"
- Someone feeling the AI took the part of their job they actually enjoyed, and left them the checking
- One team looking at another team's AI-assisted process and thinking *"why do they get the nice one?"*

When tasks can't be split, perfect envy-freeness is sometimes mathematically impossible. (Even maths can't make everyone happy. Comforting, in a way.) Researchers use practical relaxations such as **envy-free up to one item**. For desirable goods, removing one item from the envied bundle can eliminate envy; for burdensome chores, the relevant removal is from the envious person's own bundle. Workflows can mix both. The practical lesson isn't a formal guarantee: find the specific task behind the resentment so you can discuss it.

**What to do:** before you finalise the workflow, ask the people in it: *"Would you swap your part of this process with anyone else's, human or AI?"* If lots of hands go up, you've found the design problem early, while it's still cheap to fix.

## 3. Give each task to whoever is *relatively* best at it

A classic fair division insight is that disagreement is useful. If two people value the same things differently, you can often split them so that both feel they got the better deal.

People and AI systems "value" tasks very differently, and that's mostly great news:

- **AI can help with** volume and speed: reading documents, drafting first replies and checking rows. Consistency and accuracy still need evaluation on your actual work.
- **People bring** judgment, context, relationships and the weird cases that don't fit any pattern.

So the question isn't "can the AI technically do this task?" Technically, it can write a heartfelt apology to your angriest customer. It's "who has the **comparative advantage**?", meaning who gives up the least by doing it.

**What to do:** go through the workflow step by step and assign each step to whoever is *relatively* best at it. Often the answer is both: the AI drafts the sensitive email, a person edits and sends it. That's what good human-in-the-loop AI looks like. Not a human rubber-stamping everything, and not an AI flying solo, but each doing the part it's best at.

## 4. Find the bottleneck (it's usually a person)

One idea from my area quietly runs in real systems today. It's called **Dominant Resource Fairness**, and it was designed for computer clusters, where lots of jobs share CPUs, memory and other resources, and each job needs a different mix.

Instead of splitting every resource evenly, it looks at each job's *dominant* resource, the one it needs most relative to the total, and balances those. Variants of it have been used in cluster schedulers that run large amounts of real computing work.

Why should a founder or manager care? Because your AI initiatives share resources too: budget for model usage, access to sensitive systems, data engineering time, and, most of all, the attention of the few people who can review, approve and maintain these systems. (Every company has that one security engineer. Everyone wants five minutes of their time. They have none.)

Different workflows need very different mixes. A customer-support workflow mostly eats reviewer time. A reporting workflow mostly eats data engineering. Split the budget evenly and you'll starve one while overfeeding the other.

**What to do:** when you're running several AI projects at once, find each one's bottleneck and plan around it. Very often the scarcest resource isn't money or compute. It's human review time.

The original [Dominant Resource Fairness paper](https://www.usenix.org/conference/nsdi11/dominant-resource-fairness-fair-allocation-multiple-resource-types) describes the cluster-allocation mechanism. Applying that lens to a team's review capacity is an analogy, not a claim that the same guarantees carry over.

## The short version

If you're deciding what to automate with AI this quarter:

1. **Check efficiency and fairness.** A plan that's optimal on paper but feels unfair won't get used.
2. **Run the "would you swap?" test** with the people in the workflow.
3. **Assign by comparative advantage**, not by what AI can technically do.
4. **Plan around the bottleneck**, which is usually human review time.

You don't need a PhD to use any of this. But someone does need to ask the question on purpose, instead of letting the workflow answer it by accident.

"Who should do the work?" is as old as organisations themselves. AI just made it urgent again. Luckily, a small group of mathematicians has been thinking very hard about it for decades, mostly while talking about cake.

If you've already picked a task but the workflow isn't sticking, read [why AI pilots fail](/writing/why-ai-pilots-fail/). For help applying the framework, see [how I work with teams](/business/).

## FAQ

### How do I decide which tasks to automate with AI?

Pick tasks that are frequent, text- or document-heavy, and easy to check, where a mistake is cheap to catch. Assign each step to whoever is relatively best at it, keep a human review step at first, and check that the new split feels fair to the people doing the work.

### What tasks should not be automated with AI?

Rare tasks, high-stakes decisions with no human review, work where the data doesn't exist, and work where the value is the human relationship itself. These are usually better as "AI assists, human decides".

### What is human-in-the-loop AI?

A workflow where AI does part of the work (drafting, sorting, checking) and a person reviews, approves or handles the exceptions. It's a useful way to start. Reduce review only when evidence, risk and accountability requirements support doing so.
