---
title: "Optimising Token Usage: How to Cut Your AI Bill Without Making Your AI Dumber"
seo_title: "Reduce AI Token Usage: Tools & Tactics | Pranjal Pandey"
description: "Reduce AI token usage and cost with leaner context, simpler code, model routing, prompt caching and batching. A practical token audit for AI teams."
card_title: "Optimising token usage"
card_description: "Cut your AI bill with leaner context, simpler code and a practical token audit."
published: 2026-10-18
draft: false
author: Pranjal Pandey
audience: business
cover:
  image: ../../assets/writing/optimising-token-usage.png
  thumbnail: ../../assets/writing/optimising-token-usage-art.png
  alt: "Blueprint of scattered context tokens passing through a filter into a compact AI system, with a usage gauge."
tags: [AI costs, token optimisation, AI coding agents, context engineering, LLM]
---

Every AI team eventually has the same Monday morning. Someone opens the usage dashboard, goes quiet, and then says, very calmly: *"Why did we spend that much on Thursday?"*

The answer is almost never "the model got expensive." It's that the model was reading things it didn't need, writing things nobody asked for, and re-reading both on every single turn. AI agents are brilliant, tireless, and about as frugal as an intern who prints the whole internet "just in case".

The good news: most token waste is boring and fixable. This guide covers the two tools I think are worth a look right now, **lean-ctx** and **Ponytail**, plus the decisions that matter even more than tools: which model you pick, how much context you feed it, and a handful of unglamorous settings that quietly halve bills.

## First, where do the tokens actually go?

You pay for two things:

- **Input tokens:** everything the model *reads*. Your prompt, the system instructions, the files it opens, the command output it sees, and the entire conversation so far.
- **Output tokens:** everything the model *writes*. Answers, code, explanations, and (with reasoning models) its thinking.

Two facts make this expensive:

1. **Every turn re-sends the history.** In a chat or agent session, the model doesn't "remember" the last turn; it re-reads it. A session that's 80,000 tokens deep pays for those 80,000 tokens again on the next message. Long sessions get more expensive per turn, not less.
2. **Agents read loudly.** A coding agent that runs `npm install`, opens five full files and dumps a stack trace has just eaten more tokens than your entire prompt, mostly on noise.

So there are two diets: **feed it less** (input) and **make it say less** (output). Let's take them in order.

## The input diet: lean-ctx

[lean-ctx](https://github.com/yvgude/lean-ctx) ("Lean Context") is an open-source tool (Apache 2.0) that sits between your AI coding agent and your repository, shell and model provider. Its job is simple to describe: send the model less noise and more useful context.

It does that in a few ways:

- **Smarter file reads.** Instead of always reading a whole file, the agent can ask for a *map* of it, just the *function signatures*, a *diff*, or specific *line ranges*. It uses tree-sitter (a code parser) to understand structure across 27 languages.
- **Compressed command output.** A shell hook trims the output of common commands (git, npm, cargo, docker, kubectl, terraform and more), because your agent does not need 400 lines of install logs to learn that the install worked.
- **Caching and deltas.** Re-reading a file that hasn't changed costs almost nothing, and changed files can be sent as differences.
- **Reversible compression.** Anything it trims is stored with a handle, so the model can pull back the full version if it actually needs it. That's the important part: lean, not lossy.
- **Session memory** that carries facts and decisions across chats, so you don't re-explain your project every morning.
- **A savings ledger** (`lean-ctx gain`) and a "Shadow Mode" to compare against a baseline, so you can see whether it's working for *your* workload rather than trusting a README.

It works through MCP and shell hooks with a long list of agents, including Claude Code, Cursor, Codex, Windsurf, Copilot, Gemini CLI, Aider, VS Code and JetBrains IDEs.

**Getting started:**
```bash
npm install -g lean-ctx-bin      # or: brew / cargo / the install script
lean-ctx wrap claude             # or: wrap cursor, wrap codex
lean-ctx gain                    # see what you saved
```

**The honest small print.** The project's own benchmarks report very large reductions on file reads, but those are self-reported, and the README itself says gains depend on your workload and can be break-even. It's a poor fit for tiny repos or workflows that always need raw logs. And if you use Claude through a Pro or Max subscription rather than an API key, the request-level compression proxy isn't available (the file and shell features still are). Turn on Shadow Mode for a week and let your own numbers decide.

## The output diet: Ponytail

[Ponytail](https://github.com/DietrichGebert/ponytail) (MIT licence) attacks the other side. It isn't a compressor; it's a skill (a carefully written prompt) that makes coding agents *write less code*. Its tagline: *"The best code is the code you never wrote."*

Before writing anything, the agent climbs a short ladder and stops at the first rung that holds:

1. Does this need to exist at all?
2. Is it already in the codebase?
3. Does the standard library do it?
4. Is there a native platform feature?
5. Is there a dependency we already have?
6. Can it be one line?
7. Only then: the minimum that works.

Crucially, it does **not** cut corners on validation, error handling, security or accessibility, and it adds one small test for risky logic (branches, parsers, money, security). It also ends each reply with what it skipped, and tags shortcuts so they can be collected later (`/ponytail-debt`). There are review commands too (`/ponytail-review`, `/ponytail-audit`) and, in Claude Code, a little "band" that shows cost and tokens per task.

The author's own benchmark (39 tasks, Claude Code, five runs each) reports roughly **45% fewer tokens, 26% lower cost and 53% less code**, with *more* risky logic covered by tests. As with any self-reported benchmark, treat those as a promising starting point, not a promise.

**Getting started (Claude Code):**
```text
/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail
```
For Codex there's an equivalent plugin; for other agents you can drop its `AGENTS.md` rules file into your project.

Why does this save tokens? Because code is tokens three times over: once when the model writes it, again every time it re-reads it later in the session, and forever after when your team has to maintain it. Less code is the cheapest optimisation there is.

**lean-ctx and Ponytail are complementary.** One trims what goes in, the other trims what comes out. They don't overlap, which is exactly why they're worth trying together.

## Pick the right model (the biggest lever nobody pulls)

Most teams pick one model and use it for everything. That's like hiring a senior architect and asking them to also rename files.

A simple way to think about it:

| Task | Model tier | Why |
|---|---|---|
| Classify, extract, tag, route, summarise short text | **Small / fast** | Cheap, quick, and plenty smart for narrow jobs |
| Most coding, writing and analysis | **Mid-tier** | The everyday workhorse |
| Hard reasoning, architecture, tricky debugging, planning | **Top tier** | Worth it when a wrong answer costs more than the tokens |

Three habits make this work:

- **Route, don't default.** Send each job to the cheapest model that does it well. A common pattern: a top-tier model plans, cheaper models (or sub-agents) do the legwork.
- **Turn the thinking down when it isn't needed.** Many models let you set reasoning effort or a thinking budget. Maximum effort on a formatting task is paying a professor to alphabetise your bookshelf.
- **Measure cost per finished task, not cost per token.** A cheaper model that needs four retries and a human fix is not cheaper. Sometimes the expensive model is the frugal choice because it gets there in one go.

Prices and model line-ups change every few months, so re-check the price list quarterly and re-run a few of your real tasks on the next tier down.

## Context size: a bigger window is not a bigger brain

Context windows are now huge, and it's tempting to throw everything in "so the model has the full picture." Resist it, for three reasons:

1. **You pay for it every turn.** Remember: the whole conversation is re-sent each time.
2. **Quality drops with clutter.** Research on long contexts (the "lost in the middle" findings, and more recent work on what's been called *context rot*) shows models get worse at using information as the context fills with irrelevant material. More context can mean *worse* answers.
3. **Noise invites wrong turns.** The model happily follows a stale log or an old file version you forgot was in there.

What to do instead:

- **One task, one session.** Start fresh when the task changes. Carry over a short summary, not the whole transcript.
- **Compact on purpose.** Most agents have a compact or clear command (in Claude Code, `/compact` and `/clear`). Use them at natural breakpoints, not when you hit the wall.
- **Use sub-agents for exploration.** Let a sub-agent search the codebase and return a one-paragraph answer, instead of pouring every file it read into your main session.
- **Keep junk out.** Use your tool's ignore files and permissions so agents never read `node_modules`, build output, lockfiles or giant data dumps.
- **Retrieve, don't stuff.** For documents and knowledge bases, fetch the few relevant chunks (search or RAG) instead of pasting the whole manual.
- **Keep instruction files short.** Your `CLAUDE.md`, `AGENTS.md` or rules file is read on *every* request. Every line in it is a recurring cost. Make each one earn its place.

## The boring settings that quietly halve bills

None of these are exciting. All of them work.

- **Prompt caching.** If your prompts start with the same long block (system instructions, tool definitions, a reference document), put the stable part first and turn on caching. Providers bill cached input at a fraction of the normal price; Anthropic, for example, charges roughly a tenth of the input rate for cache reads. The golden rule: stable stuff at the top, changing stuff at the bottom, or the cache never hits.
- **Batch anything that isn't urgent.** The major providers offer batch APIs at about half price for jobs that can wait a few hours: nightly classification, bulk summaries, evaluation runs.
- **Cap the output.** Set sensible maximum output lengths, ask for structured output (JSON with only the fields you need), and say "answer in three bullets" when three bullets will do.
- **Summarise tool output before the model sees it.** Logs, test results and API responses can usually be trimmed to errors and totals.
- **Don't let retries loop.** Put a limit on agent retries and tool calls. A stuck agent burning tokens at 3am is the most expensive employee you'll ever have.

## More tools worth knowing

| Tool | What it does | Good for |
|---|---|---|
| [Repomix](https://github.com/yamadashy/repomix) | Packs a repository into one AI-friendly file, with an option to compress code down to its structure | Giving a chat model a whole-codebase overview without the full source |
| [Aider](https://aider.chat) (repo map) | Sends a compact map of your codebase's key symbols instead of whole files | Coding in large repos from the terminal |
| [LLMLingua](https://github.com/microsoft/LLMLingua) | Microsoft research project that compresses prompts by dropping low-value tokens | Long prompts and RAG pipelines in your own apps |
| [ccusage](https://github.com/ryoppippi/ccusage) | Reads Claude Code's local logs and reports tokens and cost by day and session | Finding out where your Claude Code usage actually goes |
| [LiteLLM](https://github.com/BerriAI/litellm) / [OpenRouter](https://openrouter.ai) | One interface to many models, with routing, budgets and spend tracking | Model routing and per-team cost limits |
| Token counters ([tiktoken](https://github.com/openai/tiktoken), your provider's token-counting endpoint) | Count tokens before you send | Budgeting prompts and catching bloated templates |

## A 30-minute token audit

If you do nothing else this week:

1. **Measure first.** Pull a week of usage per project, per model, and per session. Find the top three spenders. (Use your provider dashboard, `lean-ctx gain`, or ccusage.)
2. **Check input vs output.** Mostly input? Start with context: lean-ctx, ignore files, shorter sessions, caching. Mostly output? Start with Ponytail, output caps and lower reasoning effort.
3. **Look at your longest sessions.** If they're hundreds of turns long, the fix is a habit, not a tool: one task per session.
4. **Try one cheaper model** on five real tasks. Compare cost *per finished task*.
5. **Turn on caching and batching** where they apply. It's usually a configuration change, not a project.
6. **Re-measure in two weeks.** Keep what moved the number. Drop what didn't.

The goal isn't the smallest possible bill. It's the most useful work per rupee, or per dollar. Sometimes that means spending *more* on a better model and *less* on everything around it.

## FAQ

**What is the fastest way to reduce AI token usage?**
Shorter sessions and less noise in the context. Start a fresh session for each task, keep agents from reading build output and dependency folders, and turn on prompt caching for repeated instructions. Then add tools like lean-ctx for context and Ponytail for output.

**Does a bigger context window make AI more accurate?**
Not automatically. Models tend to use information less reliably as the context fills with irrelevant material, and you pay for the whole context on every turn. Give the model the right context, not the most context.

**How do I choose the right AI model for a task?**
Use small, fast models for narrow jobs like classification and extraction, mid-tier models for most coding and writing, and top-tier models for hard reasoning and planning. Judge by cost per finished task, including retries and human fixes, not by price per token.

**Are lean-ctx and Ponytail safe to use?**
Both are open source (Apache 2.0 and MIT) and run locally. lean-ctx states that it has no telemetry by default. As with any tool that touches your code and agent, read the docs, install only from the official repositories, and test on a non-critical project first.

**Do these tools work with ChatGPT, Claude and Gemini?**
Both target AI coding agents rather than chat apps. lean-ctx supports many agents and editors through MCP and shell hooks, and Ponytail works as a skill or rules file in Claude Code, Codex, Cursor, Copilot, Gemini and others. Check each project's install guide for your setup.
