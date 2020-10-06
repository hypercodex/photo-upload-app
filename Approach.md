# Development Approach/Strategy


## Prep
1. Init git repo
2. Write initital acceptance tests to describe the spec.
3. Decide on framework to use.
4. Decide API approach and protocol.
5. Determine if database should be used.
6. Develop Schema (Schema first...)
7. Init yarn workspaces to delineate API/Client
8. Init yarn package for API/Client
9. Write security considerations README

## Develop API
1. Schema draft and implement Schema for API
2. Write resolvers for types
3. Develop API server
4. Test all required API functionality is implemented
5. Write expanded README section for API.

## Develop Client App
1. Use Schema as guide to component structure
2. Initalize app framework/scaffolding.
3. Get Jest tests running with coverage
4. Write a few basic tests to begin TDD
5. Configure and prep all tooling:
  - Jest
  - Sass
  - Webpack
  - Typescript
6. Implement wireframe with presentational components (mobile/desktop)
7. Connect client to API 
8. Determine defualt App state
9. Implement upload functionality
10. Implement search feature 
11. Implement pagination
12. Expand tests to cover all cases
13. Securty pass/considerations
14. Expand tests to cover security
15. Write expanded README section for Client

## Develop Database
1. If database is needed implement folder structure.
2. For local development database should be dockerized.
3. Write Dockerfile for database.
4. Control database with docker-compose.
5. Expose database to API
6. Secure database.
7. Write database into README.

