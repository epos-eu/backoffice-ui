# EposBackOffice

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.3. This project has been updated to angular version 17.3.10

## IDE Setup

Install ESLint and Prettier

### Prerequisites

> Note: this project uses `pnpm` instead of `npm`.

- Angular
- PNPM

### Local Development

To run the Backoffice GUI locally you can run the application with the following commands

```bash
# Clone the Backoffice GUI repo
git clone https://epos-ci.brgm.fr/epos/epos-backoffice-gui.git

# Navigate to project directory
cd epos-backoffice-gui

# Install dependencies
pnpm install

# Run the VDR
pnpm run start
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Tips

- `entityStateManager.ts` is where all entities' state is managed, stored and accessed.

#### Files Where API is referenced:

- `environment.prod.ts`
- `proxy.conf.json`
- `openapi-codegen.config` - This is where the api is called to generated the static object file `backofficeSchemas.ts`.
