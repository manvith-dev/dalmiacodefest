# DCF

DCF is a web application I built to manage an intercollegiate technical competition.

It handled the event from participant registration to the final results, including multiple rounds, answer submissions, scoring, and separate leaderboards.

**Built and deployed for an actual intercollegiate event.**

---

## What it does

DCF was built around three competition rounds.

### Round 1: Quiz

Participants answered questions directly on the website.

- Questions were shown through the web app
- Answers were checked automatically
- Participants were ranked by **points**
- If points were equal, **completion time** was used as the tie-breaker
- A separate leaderboard was maintained for the round

### Round 2: Debug

Participants were given code containing bugs.

They had to:

1. Find and fix the bug
2. Run the corrected code using a third-party compiler
3. Submit the required numeric answer through DCF

The website validated the submitted answer and updated the leaderboard.

### Round 3: Code

Participants were given a programming problem through the website.

They solved the problem using a third-party compiler and submitted the required numeric result through DCF.

A separate leaderboard was maintained for this round as well.

---

## Main Features

- Participant registration
- Multiple competition rounds
- Quiz system
- Debugging challenges
- Programming challenges
- Answer validation
- Score calculation
- Time-based ranking
- Separate leaderboards for each round
- Participant data stored in a database

---

## Event Flow

```text
Registration
     ↓
  Round 1
   Quiz
     ↓
Leaderboard
     ↓
  Round 2
  Debug
     ↓
Leaderboard
     ↓
  Round 3
   Code
     ↓
Leaderboard
     ↓
Final Results
```

---

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Language:** TypeScript
- **Backend:** Next.js API routes
- **Database:** MongoDB
- **Authentication:** JWT
- **Hosting:** Vercel

---

## Development

This was a solo project.

**Development period:** December 12, 2025 → January 31, 2026

I worked on the application from the initial design and development through deployment and the actual event.

---

## Real Event Usage

DCF was used during the actual intercollegiate event to manage the competition.

The event had 47 registered teams, with 27 teams participating in the competition.

Round 1 was played individually, while Rounds 2 and 3 were played as teams using a single device.

The database contains the participant and submission data generated during the event.

### Event Statistics

|                      |               |
| -------------------- | ------------- |
| Teams Registered     | **47**        |
| Teams Participated   | **27**        |
| Team Composition     | **2 players** |
| Rounds               | **3**         |
| Round 1 participants | **27**        |
| Round 2 teams        | **18**        |
| Round 3 teams        | **10**        |
| Total submissions    | **55**        |
| Total submissions    | **55**        |
| Development time     | **~7 weeks**  |

---

## Project Structure

The project uses a feature-based structure with Next.js App Router.

```text
src/
├── app/                    # Pages, layouts and API routes
│   ├── (auth)/             # Registration and authentication
│   ├── (games)/            # Competition rounds
│   │   ├── round1/         # Quiz
│   │   ├── round2/         # Debugging
│   │   └── round3/         # Coding
│   ├── (marketing)/        # Public pages
│   ├── admin/              # Admin dashboard and results
│   ├── participants/       # Participant dashboard
│   └── api/                # Backend API routes
│
├── components/             # Shared UI and layout components
│   ├── layout/
│   ├── marketing/
│   └── ui/
│
├── features/               # Feature-specific code
│   ├── auth/
│   ├── admin/
│   ├── participants/
│   ├── round1/
│   ├── round2/
│   └── round3/
│
├── config/                 # Event and college configuration
├── hooks/                  # Reusable React hooks
├── lib/                    # Database, mailer and utility functions
├── models/                 # Shared data models
├── assets/                 # Static project assets
│
└── proxy.ts                # Request/auth handling
```

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/manvith-dev/dalmiacodefest.git
cd dalmiacodefest
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Environment Variables

Create a `.env.local` file in the project root and add the required environment variables.

```env
MONGODB_URI=
JWT_SECRET=

NODE_ENV=development

EMAIL_USER=
EMAIL_PASS=

ADMIN_USERNAME=
ADMIN_PASSWORD=

ROUND1_SECRET_CODE=
ROUND2_SECRET_CODE=
ROUND3_SECRET_CODE=
```

### What they are used for

| Variable             | Purpose                                        |
| -------------------- | ---------------------------------------------- |
| `MONGODB_URI`        | MongoDB database connection                    |
| `JWT_SECRET`         | Signing and verifying authentication tokens    |
| `NODE_ENV`           | Application environment                        |
| `EMAIL_USER`         | Email account used for sending emails          |
| `EMAIL_PASS`         | Password or app password for the email account |
| `ADMIN_USERNAME`     | Admin login username                           |
| `ADMIN_PASSWORD`     | Admin login password                           |
| `ROUND1_SECRET_CODE` | Access code for Round 1                        |
| `ROUND2_SECRET_CODE` | Access code for Round 2                        |
| `ROUND3_SECRET_CODE` | Access code for Round 3                        |

---

## Notes

The programming and debugging rounds use external compilers. DCF is responsible for the competition side of these rounds: presenting the problem, accepting the result, validating the answer, and maintaining rankings.

---

## About the Project

I built DCF because the event needed one place to handle the competition instead of managing registrations, answers, scores, and leaderboards separately.

The main goal was simple:

**make the competition easier to run and keep the results consistent.**
