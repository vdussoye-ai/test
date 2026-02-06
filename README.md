# Proposal Wizard

A multi-step wizard form that collects project details and generates a structured proposal using the Claude API.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (includes npm)

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create a `.env` file** in the project root with your Anthropic API key:

   ```
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```

   You can get an API key from [console.anthropic.com](https://console.anthropic.com/).

   > The `.env` file is git-ignored and will not be committed.

3. **Start the server:**

   ```bash
   npm start
   ```

4. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

## Running on Windows

1. Download and install Node.js from [https://nodejs.org](https://nodejs.org) (LTS recommended).

2. Open **Command Prompt**, **PowerShell**, or **Windows Terminal** and navigate to the project folder:

   ```cmd
   cd C:\path\to\proposal-wizard
   ```

3. Install dependencies:

   ```cmd
   npm install
   ```

4. Create the `.env` file. You can do this in PowerShell:

   ```powershell
   echo ANTHROPIC_API_KEY=sk-ant-your-key-here > .env
   ```

   Or create the file manually with Notepad — just make sure the file is named `.env` (no `.txt` extension).

5. Start the server:

   ```cmd
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How it works

The wizard has four steps:

| Step | Fields |
|------|--------|
| 1. Client Info | Client Name, Company, Email, Project Name, Description |
| 2. Timeline | Start Date, End Date, Key Milestones |
| 3. Resources | Budget, Team Size, Required Skills, Additional Notes |
| 4. Review | Read-only summary of all entered data |

On submit, the form POSTs all data as JSON to `POST /generate`. The backend sends the data to the Claude API, which returns a structured proposal with:

- **Overview** — executive summary
- **Proposed Scope** — list of deliverables
- **Key Risks** — identified risks
- **Assumptions** — underlying assumptions

The response is rendered in the browser as formatted sections.
