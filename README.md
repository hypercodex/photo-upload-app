# Photo Upload App


File uploader application built with intention of following best modern development practices.

[![Actions Status](https://github.com/hypercodex/photo-upload-app/workflows/build/badge.svg)](https://github.com/hypercodex/photo-upload-app/actions)
[![license](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

**Built With:**
- [NextJS](https://nextjs.org/)
- [React](https://reactjs.org/)
- [React Drop Zone](https://react-dropzone.js.org/)
- [Apollo Client](https://www.apollographql.com/apollo-client)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [NodeJS](https://nodejs.dev/)
- [Express](https://expressjs.com/)
- [Docker](https://www.docker.com/)

This app was motivated by a 48 hour development sprint. The state of the repository at that time can be found in this [tagged version](https://github.com/hypercodex/photo-upload-app/tree/0.0.1).

---

Note: This is an experimental app, and as such, is not currently ready for production!

## Installation and Development
#### Requirements
- Unix like environment (macOS/Linux)
- yarn
- docker and docker-compose

#### Install notes
This repository uses yarn-workspaces, as such there is a single yarn.lock and all dependencies can be installed by running yarn in the root directory.


Clone repository and install dependencies:  
```
git clone git@github.com:hypercodex/photo-upload-app.git
cd photo-upload-app/
yarn
```
Generate secrets:  
` yarn setup`

Which runs a custom CLI that prompts you for a seed and then creates secure secrets in the following `.env` files:
- `.env`
- `api/.env.json`

After running the above commands you can get a full development service environment by running:  
`yarn devAll`

After all docker images have been built and yarn has installed dependencies for both the `api` and `app` workspace packages, you can browse the frontend NextJS app by visiting `localhost:3000`. In addition to the main application on port:3000 There several additional services that will be running:
- GraphQl-Playground at: `localhost:4000/playground` 
- Mongo-Express at: `localhost:8081`

**Development run environment:**
For a better development experience I recommend having a panel open in `tmux` and running each of the following in their own terminal (from within the repository root):

- `cd app/ && yarn dev`    ---> Client NextJS App 
- `cd app/ && yarn test --watch` ---> Frontend Jest unit tests
- `cd api/ && yarn dev` ---> Backend NodeJS Express GraphQL service 
- `cd api/ && yarn test --watch` ---> API Jest unit tests 
- `docker-compose up` ---> MongoDB and MongoExpress services

---
### Security
(✔) implemented... (✗) to-be implemented...

This baseline application type (public file upload service w/o accounts, or TLS). Has a rather broad attack surface. There is no 'silver bullet' to securing such an application, as such "security by depth", is the only way to get reasonable assurances.

Several notable security features are the following: 
- Containerized/isolated database service, with secured user that runs with less privileges. ✔
- Not using database IDs as public identifiers. ✔
- Using cryptographically random hash (ULID) as file names in the upload server. ✔
- Client side file upload restrictions. ✔
- Basic server-side sanitization of all inputs. ✔
- Enabling API service hardening library (Express-Helmet) on backend graphql service. ✔
- Using Typescript to insure runtime has minimal errors. ✔
- File scrubbing on upload with optimized version served instead of original. ✔
- Double cookie (stateless) CSRF protection strategy. ✔


The following is a long list of security considerations that are relevant to this specific type of application. Some but certainly not all of them have been implemented or are planned for future iterations and review. 

#### API
The API is a GraphQL API implemented with Apollo and Express in Node.
Common GraphQL security considerations are the following:
##### Large or malicious queries:
  Mitigation approaches
  - Persisted documents ✗
  - Request timeouts ✗
  - Data result limitations ✗
  - Limiting query depth ✗
  - Limiting query complexity ✗
##### Monitoring and Metrics: ✗
  - Metrics can provide a comprehensive overview of what queries are popular
  - Knowing where the server is spending time can help identify bottlenecks. 
  - Monitoring allows identification of unknown attack vectors and attempts in real-time.
##### Denial of Service Attacks
Even with mitigation effort around large and malicious queries, clients can still send an excessive number of queries to the API. Some mitigation approaches are as follows:
  - Rate limiting queries
  - Limiting upload size
##### User Submitted Data and Variables
Any data sent to the API from the client should never be trusted. Any and all form fields, query variables, and file uploads should be escaped and sanitized. This includes:
  - Form data ✔ 
  - Query parameters ✔
  - File uploads ✔
    - File names ✔
    - Deep file inspection and filetype verification ✔
  - User submitted data stored in database ✔

##### API Server
The GraphQL server is implemented with Express in NodeJS.
###### ExpressJS Security Best Practices
- Use HelmetJS Middleware:
    - Helmet helps secure Express apps by setting various HTTP headers. ✔
- Use TLS ✗
    - This app doesn't implement TLS certs in development but in a production environment, the cert can be provided by the PaaS environment for the service.
- Ensure dependencies are secure: ✗
    - Use a combination of `npm audit` and `snyk test`, providing analysis of dependencies and checks against known vulnerabilities respectively.

######  NodeJS Security 
Considerations 
- Secure Configuration
  - Security HTTP Headers ✔
  - Sensitive data on client side
- Authentication
  - Brute force protection
- Session Management
  - Cookie flags
  - Cookie scope
  - Cross-Site Request Forgery (CSRF) ✔
- Data Validation
  - Cross-Site Scripting (XSS) ✔
  - SQL/NoSQL Injection
  - Command injection
- Secure Transmission
  - SSL Version, Algorithms, Key Length
  - Strict-Transport Security (HSTS) ✔
- Denial of Service
  - Rate limiting / Account lockout
  - Evil regular expressions
- Error Handling
  - Revealing error codes and stack traces
- NPM
  - Upstream security issues with dependencies

Mitigation approaches:
- Use stateless double cookie pattern to protect against cross-site request forgery (CSRF). ✔
- Always filter and sanitize user input to protect against cross-site scripting (XSS) and command injection attacks. ✔
- Defend against SQL/NoSQL injection attacks by using parameterized queries or prepared statements. ✔
- Use the nmap and sslyze tools to test the configuration of your SSL ciphers, keys, and renegotiation as well as the validity of your certificate.
- Use safe-regex to ensure your regular expressions are not susceptible to regular expression denial of service attacks. ✔



#### Client App
Common client side web application considerations are the following:
- Cross-Site Scripting (XSS) Attacks: Malicious script is passed to backend then gets served to other users from backend servers. Client browsers can't distinguish this so execute any script tags.
  - Filter and sanitize data on arrival ✔
  - Encode data on output ✔
  - Use appropriate response headers ✔
- Reflected Cross-Site Scripting (R-XSS) Attacks: 
  - Usually implemented via links and are more common than permanent injection XSS.
  Mitigation
  - Careful input sanitization ✔
  - Context-sensitive input encoding ✔
  - Content-Security Policy (CSP) headers ✔
- Cross-Site Request Forgery (CSRF) ✔
  - Mitigation: Generate CSRF Token with well-known hashing algorithm ✔
- Content Security Policy (CSP): Security header that whitelists sources of trusted content. ✔

Additional information file notes can be found in the following OWASP articles:<br/>
[Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#use-of-custom-request-headers)<br/>
[File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)

#### Database
General database security considerations:
- Any user submitted data **must** be sanitized and escaped before being used in a database query. ✔
- Query parameterization should be implemented. ✔
- User actions should not be able to trigger long running queries. Use timeouts or max query times.
- Application database role should not be root and should have minimum privileges. ✔
  - App user role should follow Principle of Least Priviledge (PLOP) ✔

##### MongoDB Security 
- Enable Access Control and Enforce Authentication ✔ 
- Configure Role-Based Access Control ✔
- Encrypt communication (TLS) ✗
- Encrypt data at rest ✗
- Limit network exposure ✔
- Periodically audit system activity  ✔
- Run MongoDB with dedicated user ✔
- Run with secure configuration options ✔
- Keep application and dependencies up-to-date and current with all security patches ✔

Additional MongoDB considerations can be found in MongoDB's [security checklist](https://docs.mongodb.com/manual/administration/security-checklist/).

#### Secrets
Most modern application architectures provide credentials and secrets via environment variables. This allows the application to use whichever set of credentials are relevant for a particular environment without hard-coding them.
- Never check secrets into version control. ✔
- Use different secrets and credentials based on environment. ✗
- Use Key Management Services (KMS) to distribute secrets between developers and environments. ✗
- File permissions should be set correctly on secrets

#### Developer Machines / Code Repositories
Application source code is a major attack vector. As such, security on development machines needs to be adequate.
- Development machines should run secure OSs and kept up with any security patches ✔
- Enable code signing for repository pushes ✔
- Careful dependency management to avoid upstream compromised software
- Good password and credential management practices ✔
- VPNs usage protects against network monitoring ✔
- Encrypted DNS further keeps browsing private ✔
- Code review gets additional eyes on code, along with mitigation against unknown-unknowns via greater mind-share
---

### Improvements
Development of this application was approached with the goal of creating a robust and production ready system (though notably this is ultimately a "hobbyist configuration"... since to truly scale this you would use a cloud PaaS bucket with signed uploads). As such there a few features that still need to be implemented, yet given the comprehensive approach taken, once features are implmented they should be rather stable. This follows a "start-right stay-right" strategy.

Some features that still need to be developed as well as areas for improvement are:
- Styling
- Pagination
- Debounce search form
- Click to add file meta-data
- Persisted documents
- Click to preview in modal
- Production deployment Dev/Ops

---

### Libraries and Dependencies
(Excluding devDependencies)
#### API
- **apollo-server-express**: Provides full featured GraphQL stack (server).
- **cookie-parser**: Reads cookies from express request, bridges cookies into Apollo handler.
- **cookies**: Used to generate signed cookies with rotatable keys.
- **cors**: Cross Origin Resource Sharing (CORS) Express server middleware.
- **express**: Minimalist web framework for NodeJS and GraphQL service layer.
- **helmet**: Helper library for securing Express NodeJS services.
- **mongodb**: Official MongoDB NodeJS driver. 
- **sharp**: High speed image processing pipelines in NodeJS for conversion of images into web friendly formats.
- **ulid**: (Universally Unique Lexicographically Sortable Identifiers): For file upload names and secure token generation. Also have nice property that they are monotonically increasing with a built in timestamp.

#### APP

- **@apollo/client**: React GraphQL (client) that provides hooks to call to a GraphQL spec service.
- **apollo-link-context**: Set context in the custom chain of `Link` actions for each GraphQL operation. 
- **apollo-upload-client**: Terminating `Link` in the GraphQL client side network stack.
- **graphql**: JavaScript reference implementation of GraphQL spec. Provides `gql` document parsing.
- **next**: Production React framework with premium developer experience and application scaffolding.
- **react**: A JavaScript library for building UIs. Declarative, component-based, and un-opinionated.
- **react-dom**: React companion library that provides an interface to the browser's DOM API.
- **react-dropzone**: Simple hook based React lib, that makes HTML5 based file upload zones.

---
### API
This is a GraphQL API and as such has a bit of a different surface than traditional REST API architectures. 

##### API entrypoint:

###### (POST) /graphql
Description: 
- Purpose: Entrypoint for queries and mutations against the service. 
- Returns: Valid response per the application Schema for the Photo Upload App.
- Accepts: Any valid query per the Schema. 

Note: All fields and types are documented at the schema documentation found at: http://localhost:4000/graphql
#### Primary queries and mutations for the application:
###### QUERY `allFiles`
Description: 
- Purpose: Query full list of files uploaded to the backend. 
- Returns: List of `File` types, potentially reduced to only the requested fragment.
- Accepts: No arguments. 

**Example query:**
```graphql
query {
  allFiles {
    url
    filename
    mimetype
    extension
    size
    uploadedOn
  }
}
```
**Returns:**
```json
[
  {
    "url": "http://localhost:4000/public/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp",
    "filename": "having_fun.jpg",
    "mimetype": "image/jpg",
    "extension": "jpg",
    "size": 5000000,
    "uploadedOn": "2020-02-05T08:00:00.000Z",
  },
  {
    "url": "http://localhost:4000/public/000XAL6S41ACTAV9WEVGEMMVR8.webp",
    "filename": "having_fun_2.png",
    "mimetype": "image/png",
    "extension": "png",
    "size": 10000000,
    "uploadedOn": "2020-07-05T07:00:00.000Z",
  }
  ...
]

```


###### QUERY `searchFiles`
Description: 
- Purpose: Query to search by full list of files uploaded to the backend. 
- Returns: List of `File` types, potentially reduced to only the requested fragment.
- Accepts: `SearchFileInput!`

**Example query:**
```graphql
  query SearchFiles($input: SearchFileInput!) {
    searchFiles(input: $input) {
      id
      size
      url
    }
  }
```

**Input variables format:**
```graphql
{ input: { search: String! } }

```

**Returns:**
```json
[
  {
    "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "size": 5000000,
    "url": "http://localhost:4000/public/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp"
  },
  {
    "id": "000XAL6S41ACTAV9WEVGEMMVR8",
    "size": 10000000,
    "url": "http://localhost:4000/public/000XAL6S41ACTAV9WEVGEMMVR8.webp"
  }
  ...
]

```

###### MUTATION `postFiles`
Description: 
- Purpose: Upload one or more files from the client to the backend. 
- Returns: `File` type response of the files successfully uploaded or `GraphQLError`.
- Accepts: `PostFileInput!`

**Example query:**
```graphql
  mutation PostFile($input: PostFileInput!) {
    postFiles(input: $input) {
      __typename
      id
      size
      url
    }
  }
```

**Input variables format:**
```graphql
{ input: { files: [{file: File!, size: number! }] }}
```

**Returns:**
```json
[
  {
    "__typename": "File",
    "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "size": 5000000,
    "url": "http://localhost:4000/public/01ARZ3NDEKTSV4RRFFQ69G5FAV.webp"
  },
  {
    "__typename": "File",
    "id": "000XAL6S41ACTAV9WEVGEMMVR8",
    "size": 10000000,
    "url": "http://localhost:4000/public/000XAL6S41ACTAV9WEVGEMMVR8.webp"
  }
  ...
]
```

###### MUTATION `deleteFile`
Description: 
- Purpose: Delete a specific file from the backend. 
- Returns: `ID!` of the file deleted, or a `GraphQLError`.
- Accepts: `DeleteFileInput!`

**Example query:**
```graphql
  mutation DeleteFile($input: DeleteFileInput!) {
    deleteFile(input: $input) {
      id
    }
  }

```

**Input variables format:**
```graphql
{ input: { id: String! }}
```

**Returns:**
```json
{ "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV" }

```





---
### Other notes
I had fun developing this application. I am going to take it a bit further to get it to a 'complete spot'. The robust approach makes it so comprehensive functionality and security will be easy to provide for once final structure is implemented.

---
### License
MIT
