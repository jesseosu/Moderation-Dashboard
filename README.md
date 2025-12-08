***Real-Time Trust & Safety Moderation Platform***

A full-stack content moderation system simulating TikTok Live comment streams, built to demonstrate scalable moderation workflows, automated decision engines, hybrid human review loops, and real-time ingestion.

This project models how modern Trust & Safety platforms automate and triage user-generated content at scale, while still supporting human oversight, escalation paths, and explainable logs.

**Features**

- Real-time ingestion of simulated live-stream comments
- Automated moderation using a backend rule engine
- Decision outcomes: auto-approve, auto-reject, or escalate
- Human-in-the-loop triage with override, approval, rejection
- Persistent audit logging and explainable moderation histories
- Operator dashboard with:

Case queues

Escalation flows

Decision logs & attribution

Custom rule builder

Real-time feed updates
- <1.5s UI latency using efficient polling + in-memory state management
- Backend state transitions for consistent and deterministic outcomes

**Architecture Overview**

The system ingests incoming “live” messages (simulated stream), evaluates each using a rule-based moderation engine, and routes them into one of three paths:

Auto-Approve: content is safe

Auto-Reject: violates rule patterns

Escalate: requires human reviewer intervention

Escalated cases appear in an operator dashboard, where moderators can:

approve content

reject content

escalate further

annotate decisions

attribute overrides to human reviewers

All actions result in explainable logs, allowing future audits or policy analysis.

*Tech Stack*

Frontend: React, TypeScript
Backend: Node.js, Express, REST APIs
Data Flow: Real-time ingestion, state machines, rule engines
Persistence: Audit logs, moderation histories
Engineering Focus: Deterministic state transitions, hybrid moderation workflows, UI latency constraints, case triage design

*System Diagram*
 Live Simulated Messages  -->  Rule Engine (Auto decisions)
                                 |  
                                 |--> Auto Approve
                                 |--> Auto Reject
                                 |--> Escalate --> Moderator Review UI
                                                    |
                                                    |--> Approve / Reject / Escalate
                                                    |
                                                    |--> Logged as Moderation Decision

*Moderation Logic*

Rules can be defined using:

keyword matching

regex validation

sentiment scoring (optional extension)

toxicity flags

length constraints

user reputation constraints (optional extension)

rate-limiting behavior (optional extension)

The engine applies deterministic logic so the same content always receives the same automated outcome.

*Operator Dashboard*

The live operator dashboard provides:

real-time feed of incoming content

triage queue for escalated cases

decision history with timestamps and action attribution

override workflows for hybrid moderation

rule builder for continuous policy tuning

escalation paths for complex content

UI latency is kept below 1.5 seconds, even under high message frequency.

*Audit Logging*

Every moderation event is fully logged with:

timestamp

rule matched

final decision

human or system attribution

escalation history

override notes

Decision logs ensure:

explainability

consistency

policy traceability

accountability

This mirrors modern Trust & Safety compliance requirements.

*Key Engineering Decisions*

Rule Engine vs. Hardcoding: Allows ongoing policy evolution without rewriting core logic

Real-time polling: Simpler and highly performant for small-scale simulation

In-memory state + queues: Enables low-latency UI and deterministic decision ordering

Hybrid workflows: Reduces manual triage load while retaining safety controls

Explainable histories: Critical for Trust & Safety, escalations, and audit trails

*Why This Project Matters*

Modern platforms like TikTok, YouTube, and Twitch ingest millions of messages per minute. Human-only moderation doesn’t scale.

This system demonstrates:

-automated triage
-human fallback review
-consistent policy enforcement
-state-machine driven outcomes
-platform-grade UX for moderation staff


##Setup & Installation##
git clone https://github.com/jesseosu/Moderation-Dashboard
cd Moderation-Dashboard

# Install Backend
cd backend
npm install
npm run dev

# Install Frontend
cd ../frontend
npm install
npm start

