# Development Approach/Strategy


## Prep
1. Init git repo -> ✓
2. Write initital acceptance tests to describe the spec. -> ✓
3. Decide on React framework to use. -> ✓
    - NextJS
4. Decide API approach and protocol. -> ✓
    - GraphQL, Apollo, Apollo-GraphQL-Express
5. Determine if database should be used. -> ✓
    - Yes. A database should be used because it will provide a more production ready API.
    - MongoDb is a good choice because of its simplicity and good integration with Node ecosystem.
    - A database will generate the unique ids of file uploads, which will be less hacky than incrementing an integer id, etc... 
    - Because files can be stored with Db Id it will be more secure and properties can be set at upload time such as file size, which will improve performance on app read.
6. Develop Schema (schema first...) -> ✓
    - typeDefs.graphql now has complete schema for application
    - Following the schema first development pattern, with the shared schema complete, both front and backend(api) can be developed asynchronously with the "contract" between them formalized.
7. Init yarn workspaces to delineate API/Client
8. Init yarn package for API/Client
9. Outline documentation
10. Write security considerations README

## Develop API
1. Schema draft and implement Schema for API
2. Write resolvers for types
3. Develop API server
4. Test all required API functionality is implemented
5. Write expanded README section for API.

## Develop Database
1. If database is needed implement folder structure.
2. For local development database should be dockerized.
3. Write Dockerfile for database.
4. Control database with docker-compose.
5. Expose database to API
6. Secure database.
7. Write database into README.

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

## Finalize
1. Expand and proof documentation
2. Finalize testing
3. Review security
4. Prep distribution (encrypted email)
