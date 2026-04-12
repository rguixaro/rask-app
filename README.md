# <img src="public/images/logo.svg" alt="Rask" height="28"> Rask

A web application to shorten URLs in a simple and secure manner.

**[rask.rguixaro.dev](https://rask.rguixaro.dev)**

## Tech Stack

[Next.js 16](https://nextjs.org) | [TypeScript](https://www.typescriptlang.org/) |
[Tailwind CSS](https://tailwindcss.com) | [Radix UI](https://radix-ui.com) |
[Zustand](https://zustand-demo.pmnd.rs/) |
[React Hook Form](https://react-hook-form.com/) | [Zod](https://zod.dev/) |
[Lucide Icons](https://lucide.dev)

## Features

- **URL shortening** — generate a short link from any URL instantly
- **Custom slugs** — choose a custom alias for your short link
- **Link management** — view and track all links created in your session
- **Visit tracking** — see how many times each link has been visited
- **No sign-up required** — session-based, works out of the box

## Getting Started

<details>
<summary>Prerequisites and setup</summary>

### Prerequisites

- Node.js 20+
- pnpm
- A running instance of [rask-api](https://github.com/rguixaro/rask-api)

### Setup

1. Clone the repository and install dependencies:

    ```bash
    git clone https://github.com/rguixaro/rask-app.git
    cd rask-app
    pnpm install
    ```

2. Copy the environment template and fill in your values:

    ```bash
    cp .env.template .env.local
    ```

    | Variable              | Description                                                    |
    | --------------------- | -------------------------------------------------------------- |
    | `NEXT_PUBLIC_APP_URL` | App base URL (e.g. `http://localhost:3000`)                    |
    | `NEXT_PUBLIC_API_URL` | API URL exposed to the browser (e.g. `/api-proxy` in dev)      |
    | `API_URL`             | Server-side API URL (e.g. `https://api.rask.rguixaro.dev/api`) |

3. Start the development server:

    ```bash
    pnpm dev
    ```

</details>

## Deployment

Deployed on [AWS Amplify](https://aws.amazon.com/amplify/). Pushing to `main`
automatically triggers a new production build and deployment.

## License

[GPL-3.0](./LICENSE)
