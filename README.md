# Lattter
Lattter is a browser extension that lets you save links and social media posts, helping you keep track of them with reminders so you never lose anything important.

## Features

- Save website bookmarks.
- Create custom reminders.
- Works as both a Google Chrome extension and a web app.

## Technologies Used

- **[Turbo Repo](https://turbo.build/)**: Manages the monorepo. Both the extension and the web app are handled under this repo.
- **[Plasmo Framework](https://www.plasmo.com/)**: Used to develop the Chrome extension, based on React.
- **[Next.js 14](https://nextjs.org/)**: Framework used for the web app.
- **[Biome](https://biomejs.dev/)**: Tool for linting and code formatting.

## Installation and Setup

### Prerequisites

- Node.js 16+
- Turbo Repo

### Steps to Clone and Run the Project:

1. Clone the repository:
    ```bash
    git clone https://github.com/fran-veiras/lattter.git
    cd lattter
    ```

2. Install dependencies:
    ```bash
    pnpm install
    ```

3. Start the project (both the web app and the extension):
    ```bash
    turbo dev
    ```

4. To build both environments:
    ```bash
    turbo build
    ```

### Linting

This project is configured with **Biome** to ensure clean and consistent code. It is recommended to install the Biome extension in your editor for a better development experience.

- Run linting manually with:
    ```bash
    pnpm run lint
    ```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push your changes to the fork (`git push origin feature/new-feature`).
5. Create a Pull Request.
