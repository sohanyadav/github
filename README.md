# GitHub Workflow Demo

> Replacing manual server deployments with a structured, automated GitHub workflow.

---

## The Problem — Before

Developers were deploying manually with no guardrails:

- SSH'd directly into production servers to deploy code
- Credentials stored in `.env` files, shared over Slack or email
- No tests, no reviews — broken code went straight to production
- No record of who deployed what or when

---

## The Solution — After

| What We Added | Why It Matters |
|---|---|
| GitHub Actions CI/CD | Automated testing and deployment on every change |
| Dev + Production environments | Test safely before anything reaches users |
| GitHub Secrets | Credentials stored securely, never in code |
| Branch protection | No one can push to `main` without a review |
| Pull Request workflow | Every change is reviewed before it merges |

---

## How the Workflow Works

```
feature branch  →  Pull Request  →  CI checks  →  Approved  →  Merge  →  Auto Deploy
                                         ↑
                                  tests must pass
                                  review required
```

### Branch Strategy

| Branch | Purpose | Auto Deploys To |
|---|---|---|
| `main` | Stable, production-ready code | Production |
| `dev` | Active development & testing | Dev |
| `feature/*` | New work — opened as a PR | _(no deploy)_ |

---

## CI/CD Pipeline

Every Pull Request automatically runs:

1. Install dependencies
2. Run linter
3. Run tests
4. Report pass/fail back to the PR

On **merge to `dev`** → deploys to the **Dev** environment.
On **merge to `main`** → deploys to **Production**.

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main, dev]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm run lint
      - run: npm test
```

---

## Secrets — No More `.env` Files

Credentials are stored in **GitHub Secrets**, not in code or chat.

```yaml
# Referenced in workflows — values are never visible in logs
- name: Deploy
  env:
    DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
    API_KEY:     ${{ secrets.API_KEY }}
```

**To manage secrets:**
`Repository → Settings → Secrets and variables → Actions`

---

## Branch Protection Rules

The `main` branch is locked down:

- Direct pushes are **blocked** — a Pull Request is always required
- At least **1 approval** is required before merging
- **CI must pass** — no merging broken code
- Applies to everyone, including admins

---

## Environments

| Environment | Trigger | Purpose |
|---|---|---|
| **Dev** | Merge to `dev` | Testing and integration |
| **Production** | Merge to `main` | Live users |

---

## Developer Workflow

```bash
# 1. Create a branch for your work
git checkout -b feature/your-feature

# 2. Make changes, commit, and push
git add .
git commit -m "feat: describe your change"
git push origin feature/your-feature

# 3. Open a Pull Request on GitHub
#    CI runs automatically — fix any failures
#    Request a review from a teammate

# 4. Once approved and CI passes → merge
#    GitHub Actions handles the deployment
```

---

## Before vs. After

```
Before                             After
────────────────────────────────────────────────────────
SSH into server to deploy     →   GitHub Actions deploys automatically
.env files sent over Slack    →   GitHub Secrets (encrypted, access-controlled)
Push directly to main         →   PR required + 1 approval
No tests before deploy        →   CI runs on every PR
One environment (production)  →   Dev environment for safe testing
No record of changes          →   Full git history + Actions audit log
```

---

## Project Structure

```
.
├── .github/
│   └── workflows/
│       ├── ci.yml        # Runs tests on every PR
│       └── deploy.yml    # Deploys on merge to dev/main
├── src/
│   ├── app.js            # Application entry point
│   └── math.js           # Example module
├── tests/
│   └── math.test.js      # Unit tests
├── package.json
└── README.md
```

---

> Questions? Open an issue or reach out in the team Slack channel.
