# GitHub Workflow Demo

> From manual deployments to a structured, automated GitHub-based workflow.

---

## The Problem (Before)

| Issue | Impact |
|---|---|
| Developers SSH'd directly into servers | Any mistake went straight to production |
| No CI/CD | Broken code was deployed regularly |
| `.env` files shared over Slack/email | Credentials were leaked or lost |
| No code review process | No quality or security checks |
| One environment (production only) | Testing happened in prod |

---

## The Solution (After)

We implemented a simple GitHub-based workflow with:

- **GitHub Actions** — automated testing and deployment
- **Two environments** — Dev and Production
- **GitHub Secrets** — no more `.env` files in chat
- **Branch protection** — PRs required before anything merges
- **Audit trail** — every change tracked to a person

---

## How It Works

```
Developer → feature branch → Pull Request → CI checks → Merge → Auto Deploy
                                  ↑
                          (tests must pass,
                           review required)
```

### Branches

| Branch | Purpose | Deploys to |
|---|---|---|
| `main` | Stable, production-ready code | Production |
| `dev` | Active development | Dev environment |
| `feature/*` | New features / bug fixes | — (PR only) |

---

## CI/CD Pipeline (GitHub Actions)

Every Pull Request automatically runs:

1. **Lint** — check code formatting
2. **Tests** — run unit tests
3. **Build** — verify the app compiles/starts

On merge to `main` → automatically deploys to **Production**.
On merge to `dev` → automatically deploys to **Dev**.

```yaml
# .github/workflows/ci.yml (simplified)
on:
  pull_request:
    branches: [main, dev]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm test
```

---

## Secrets Management

Before: credentials shared in `.env` files over chat.

After: stored securely in **GitHub Secrets** — never exposed in code.

```yaml
# Used in workflows like this — value never visible in logs
- name: Deploy
  env:
    DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
    API_KEY: ${{ secrets.API_KEY }}
```

**Where to manage secrets:**
`Repository → Settings → Secrets and variables → Actions`

---

## Branch Protection

`main` branch is protected:

- Pull Request **required** before merging
- At least **1 approval** required
- CI checks **must pass**
- No direct pushes allowed

> This means no one — including admins — can push broken code to production without review.

---

## Environments

| Environment | URL | Deploy trigger | Who can deploy |
|---|---|---|---|
| **Dev** | dev.example.com | Merge to `dev` | Anyone on the team |
| **Production** | example.com | Merge to `main` | Requires PR approval |

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/<org>/<repo>.git

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes, then push
git push origin feature/your-feature-name

# 4. Open a Pull Request on GitHub
#    → CI runs automatically
#    → Request a review
#    → Merge when approved
```

That's it. GitHub handles the rest.

---

## Project Structure

```
.
├── .github/
│   └── workflows/
│       ├── ci.yml           # runs on every PR
│       └── deploy.yml       # deploys on merge
├── src/                     # application code
├── tests/                   # test files
└── README-demo.md
```

---

## What Changed

```
Before                          After
──────────────────────────────────────────────────────
SSH into server manually   →   GitHub Actions deploys
Share .env over Slack      →   GitHub Secrets
Push directly to main      →   PR required + review
No tests                   →   CI runs on every PR
One environment            →   Dev + Production
No audit trail             →   Full git history + logs
```

---

> **Questions?** Open an issue or ask in the team Slack channel.
