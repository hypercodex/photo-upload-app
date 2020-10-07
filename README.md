# Photo Upload App

## Wilcox - October 8th, 2020 
### Installation
#### Requirements
- Unix like environment (macOS/Linux)
- yarn
- docker and docker-compose

// All the instructions to run the application


### Security
// List security concerns:
// - that have been addressed
// - that have *not* been addressed

#### API
The API is a GraphQL API implemented with Apollo and Express in Node.
Common GraphQL security considerations are the following:
##### Large or malicious queries:
  Mitigation approaches
  - Persisted documents
  - Request timeouts
  - Data result limitations
  - Limiting query depth
  - Limiting query complexity
##### Monitoring and Metrics:
  - Metrics can provide a comprehesive overview of what queries are popular
  - Knowing where the server is spending time can help identify bottlenecks. 
  - Monitoring allows identification of unknown attack vectors and attempts in realtime.
##### Denial of Service Attacks
Even with mitigation effort around large and malicious queries, clients can still send an excessive number of queries to the API. Some mitigation approaches are as follows:
  - Rate limiting queries
  - Limiting upload size
##### User Submitted Data and Variables
Any data sent to the API from the client should never be trusted. Any and all form fields, query variables, and file uploads should be excaped and sanitized. This includeds:
  - Form data 
  - Query parameters
  - File uploads
    - File names
    - Deep file inspection and filetype verification
  - User submitted data stored in database

##### API Server
The GraphQL server is implemented with Express in NodeJS.
###### ExpressJS Security Best Practices
- Use HelmetJS Middleware:
    - Helmet helps secure Express apps by setting various HTTP headers.
- Use TLS
    - This app doesn't implement TLS certs in development but in a production environment, the cert can be provided by the PaaS environment for the service.
- Ensure dependencies are secure:
    - Use a combination of `npm audit` and `snyk test`, providing analysis of dependencies and checks against known vulnerablities respectively.

######  NodeJS Security 
Considerations (https://blog.risingstack.com/node-js-security-checklist/):
- Secure Configuration
  - Security HTTP Headers
  - Sensitive data on client side
- Authentication
  - Brute force protection
- Session Management
  - Cookie flags
  - Cookie scope
  - Cross-Site Request Forgery (CSRF)
- Data Validation
  - Cross-Site Scripting (XSS)
  - SQL/NoSQL Injection
  - Command injection
- Secure Transimission
  - SSL Version, Algorithms, Key Length
  - Strict-Transport Security (HSTS)
- Denial of Service
  - Rate limiting / Account lockout
  - Evil regular expressions
- Error Handling
  - Revealing error codes and stack traces
- NPM
  - Upstream security issues with dependencies

Mitigation approaches:
- Use csurf middleware to protect against cross-site request forgery (CSRF).
- Always filter and sanitize user input to protect against cross-site scripting (XSS) and command injection attacks.
- Defend against SQL/NoSQL injection attacks by using parameterized queries or prepared statements.
- Use the nmap and sslyze tools to test the configuration of your SSL ciphers, keys, and renegotiation as well as the validity of your certificate.
- Use safe-regex to ensure your regular expressions are not susceptible to regular expression denial of service attacks.



#### Client App
Common client side web application considerations are the following:
- Cross-Site Scripting (XSS) Attacks: Malicious script is passed to backend then gets served to other users from backend servers. Client browsers can't distinguish this so execute any script tags.
  - Filter and sanitize data on arrival
  - Encode data on output
  - Use appropriate response headers
- Reflected Cross-Site Scripting (R-XSS) Attacks: 
  - Usually implemented via links and are more common than permanent injection XSS.
  Mitigation
  - Careful input sanitization
  - Context-sensitive input encoding
  - Content-Security Policy (CSP) headers
- Cross-Site Request Forgery (CSRF)
  - Mitigation: Generate CSRF Token with well-known hashing algorithm
- Content Security Policy (CSP): Security header that whitelists sources of trusted content instructing the browser to blindly execute resources from those sources.


#### Database
General database security considerations:
- Any user submitted data **must** be sanitized and excaped before being used in a database query.
- Query paramartization should be implemented.
- User actions should not be able to trigger long running queries. Use timeouts or max query times.
- Application database role should not be root and should have minimum privilges.
  - App user role should follow Principle of Least Privledge (PLOP)

##### MongoDB Security 
Security Checklist (https://docs.mongodb.com/manual/administration/security-checklist/)
- Enable Access Control and Enforce Authentication 
- Configure Role-Based Access Control
- Encrypt communication (TLS)
- Encrypt data at rest
- Limit network exposure
- Periodically audit system activity 
- Run MongoDB with dedicated user
- Run with secure configuration options
- Keep application and dependencies up-to-date and current with all security patches

#### Secrets
Most modern application architectures provide credentials and secrets via environment variables. This allows the application to use whichever set of credentials are relevant for a particular environment without hardcoding them.
- Never check secrets into version control.
- Use different secrets and credentials based on environment.
- Use Key Management Services (KMS) to distribute secrets between developers and environments.
- File permissions should be set corrrectly on secrets

#### Developer Machines / Code Repositories
Application source code is a major attack vector. As such, security on development machines needs to be adequate.
- Development machines should run secure OSs and kept up with any security patches
- Enable code signing for repository pushes
- Careful dependency management to avoid upstrem compromised software
- Good password and credential management practices
- VPNs usage protects against network monitoring
- Encrypted DNS further keeps browsing private
- Code review gets additonal eyes on code, along with mitigation against unknon-unknowns via greater mindshare


### Improvements
// What could be added to the app / API?
### Libraries
// What external libraries have you used and why?
### API
// Any general observation about the API?
// document each endpoint using the following template:
```
#### GET /resources
// Description of the endpoint:
// - what does the endpoint do?
// - what does it return?
// - does it accept specific parameters?
```
---
### Other notes
// Anything else you want to mention
