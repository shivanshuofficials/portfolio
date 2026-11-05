🔐 SECURITY_CHECKPOINT.md
Mandatory Security Rules for Every Code Change

Priority: CRITICAL
Scope: All projects, languages, frameworks, APIs, databases, and infrastructure
Enforcement: Every time code is created, modified, reviewed, refactored, or deployed.

1. CORE SECURITY INSTRUCTIONS

Every developer and AI coding assistant MUST follow these rules:

Never introduce a security vulnerability intentionally or accidentally.
Always consider security before implementing a feature.
Never trust user input, API input, database input, headers, cookies, or external data.
Validate and sanitize input according to its intended context.
Use secure defaults and deny access unless explicitly authorized.
Never expose secrets, credentials, tokens, or sensitive information.
Never disable security protections just to make code work.
Never assume frontend validation is sufficient.
Always enforce security on the backend.
Review existing security controls before modifying authentication, authorization, or data access.
Never claim code is secure without appropriate verification.
If a security issue is detected, fix it before completing the task or clearly report why it remains unresolved.

MANDATORY: Security checks must happen for every relevant code change, not only when explicitly requested.

2. INJECTION ATTACK PROTECTION
2.1 SQL Injection
Always use parameterized queries or prepared statements.
Never concatenate untrusted input into SQL queries.
Never construct SQL queries directly from user input.
Use ORM query APIs safely.
Validate sorting, filtering, and column names against allowlists.
Apply least-privilege database permissions.
Avoid exposing raw database errors to users.

Never do:

javascript
const query = "SELECT * FROM users WHERE email = '" + email + "'";


Prefer:

javascript
const result = await db.query(
  "SELECT * FROM users WHERE email = ?",
  [email]
);

2.2 NoSQL Injection
Never pass untrusted objects directly into database query operators.
Validate expected input types.
Reject unexpected objects, arrays, and operators.
Never allow users to control MongoDB operators such as $where, $ne, $gt, or $regex without strict validation.
Use safe query construction.
Disable server-side JavaScript execution where unnecessary.
Validate identifiers and filter structures.

Never do:

javascript
const user = await User.findOne(req.body);


Prefer:

javascript
const email = String(req.body.email ?? "");

const user = await User.findOne({
  email: email
});

2.3 Cross-Site Scripting (XSS)

Protect against:

Stored XSS
Reflected XSS
DOM-based XSS
Mutation XSS

Rules:

Escape output according to its HTML, JavaScript, URL, or CSS context.
Prefer framework-provided automatic output escaping.
Never render untrusted HTML directly.
Avoid innerHTML, outerHTML, document.write, and unsafe DOM manipulation.
Avoid unsafe React HTML rendering such as dangerouslySetInnerHTML.
If HTML rendering is necessary, use a maintained HTML sanitizer with a restrictive allowlist.
Implement Content Security Policy (CSP).
Validate URL schemes before using untrusted URLs.
2.4 Command Injection
Never execute shell commands using raw user input.
Prefer native language APIs instead of shell execution.
Avoid shell interpolation.
Use argument arrays and safe process APIs where execution is unavoidable.
Apply allowlists to permitted commands and arguments.
Restrict execution permissions.
2.5 LDAP Injection
Escape LDAP filter values using appropriate LDAP escaping.
Never concatenate raw user input into LDAP filters.
Validate usernames and directory attributes.
Use least-privilege directory accounts.
2.6 Server-Side Template Injection (SSTI)
Never compile templates from untrusted input.
Use fixed templates.
Keep user data separate from template logic.
Disable unnecessary template execution capabilities.
2.7 GraphQL Injection and Abuse
Validate GraphQL inputs.
Enforce authorization at the resolver and data-access layers.
Apply query depth and complexity limits.
Restrict introspection where appropriate.
Apply rate limits.
Prevent insecure direct object references.
3. AUTHENTICATION SECURITY
Use established authentication libraries and protocols.
Never store plaintext passwords.
Hash passwords using Argon2id, bcrypt, or an appropriate modern password hashing algorithm.
Use secure password reset flows.
Implement account lockout or progressive throttling where appropriate.
Enforce MFA for sensitive accounts and operations.
Use secure session management.
Regenerate session identifiers after authentication and privilege changes.
Expire sessions appropriately.
Revoke sessions on logout and account compromise.
Never expose password hashes or authentication tokens through APIs.
JWT Security
Verify JWT signatures.
Validate expiration (exp).
Validate issuer (iss) and audience (aud) where applicable.
Restrict accepted signing algorithms.
Never trust JWT payload data without verification.
Do not store sensitive information inside JWT payloads.
Implement token revocation or short-lived access tokens where required.
4. AUTHORIZATION AND ACCESS CONTROL
Apply authorization on every protected backend endpoint.
Never rely exclusively on frontend permissions.
Enforce Role-Based Access Control (RBAC) or Attribute-Based Access Control (ABAC).
Check resource ownership before accessing or modifying records.
Prevent IDOR (Insecure Direct Object Reference).
Apply least privilege.
Prevent privilege escalation.
Protect administrative routes.
Verify tenant boundaries in multi-tenant applications.
Deny access by default.

Important: Authentication confirms who a user is. Authorization determines what they can access.

5. API SECURITY
Validate every request body, query parameter, path parameter, and header.
Use schema-based validation.
Enforce request size limits.
Implement rate limiting.
Prevent brute-force attacks.
Configure CORS with explicit trusted origins.
Never use wildcard CORS with credentialed requests.
Avoid exposing internal stack traces.
Use consistent error responses.
Validate content types.
Apply pagination and maximum result limits.
Prevent mass assignment vulnerabilities.
Prevent insecure direct object references.
Protect sensitive endpoints against automated abuse.
6. CSRF PROTECTION
Implement CSRF tokens for cookie-authenticated state-changing requests.
Use appropriate SameSite cookie settings.
Validate request origins where appropriate.
Never perform state-changing operations through GET requests.
Remember that CORS is not a replacement for CSRF protection.
7. FILE UPLOAD SECURITY
Validate file extensions and actual file content.
Do not trust MIME types supplied by clients.
Limit file sizes.
Generate server-side filenames.
Prevent path traversal.
Store uploads outside publicly executable directories.
Scan files when appropriate.
Prevent executable file uploads.
Restrict SVG and HTML uploads or sanitize them.
Do not expose private storage locations.
Use signed URLs for controlled file access.
8. PATH TRAVERSAL PROTECTION
Never use raw user input as a filesystem path.
Normalize and validate paths.
Restrict file access to approved directories.
Prevent ../ traversal.
Avoid following untrusted symbolic links.
Use safe filesystem APIs.
Validate archive extraction paths to prevent Zip Slip.
9. SSRF PROTECTION

Server-Side Request Forgery prevention:

Never blindly fetch user-provided URLs.
Allowlist trusted destinations when possible.
Block loopback, private, link-local, and cloud metadata addresses unless explicitly required.
Validate DNS resolution and redirects.
Restrict outbound network access.
Apply connection and response timeouts.
Restrict supported URL schemes to those required.
Revalidate destination addresses to mitigate DNS rebinding.
10. SECURITY HEADERS

Configure appropriate HTTP security headers:

Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options: nosniff
Referrer-Policy
Permissions-Policy
Frame protection through CSP frame-ancestors or appropriate alternatives.

Use secure cookie settings:

HttpOnly
Secure
SameSite

Do not blindly copy a generic CSP. Configure it according to actual application requirements.

11. SECRETS AND ENVIRONMENT SECURITY
Never hardcode API keys.
Never hardcode database credentials.
Never commit .env files containing secrets.
Use environment variables or a dedicated secrets manager.
Add sensitive files to .gitignore.
Rotate exposed credentials immediately.
Never print tokens or passwords in logs.
Avoid exposing secrets in frontend bundles.
Scan repositories for accidentally committed credentials.

If a secret is exposed, treat it as compromised.

12. DATABASE SECURITY
Apply least-privilege database accounts.
Restrict database network access.
Use encrypted connections.
Validate database inputs.
Use safe query construction.
Encrypt sensitive data where appropriate.
Protect backups.
Avoid storing unnecessary personal information.
Implement retention and deletion policies.
Avoid exposing internal database identifiers unnecessarily.
Use transactions for sensitive multi-step operations.
13. CRYPTOGRAPHY SECURITY
Use established cryptographic libraries.
Never implement custom encryption algorithms.
Never use MD5 or SHA-1 for password hashing.
Use authenticated encryption such as AES-GCM where appropriate.
Use cryptographically secure random number generators.
Never reuse encryption nonces where prohibited by the algorithm.
Store encryption keys separately from encrypted data.
Use proper key rotation.
Compare secrets using constant-time comparison where applicable.
Use modern TLS configurations.
14. DEPENDENCY AND SUPPLY CHAIN SECURITY
Review dependencies before adding them.
Check for known vulnerabilities.
Use maintained packages.
Avoid abandoned libraries.
Pin dependency versions where appropriate.
Commit lockfiles.
Scan dependencies regularly.
Review package lifecycle scripts.
Avoid installing unknown packages.
Check for typosquatting and malicious package names.
Remove unnecessary dependencies.
Update vulnerable packages safely.
15. FRONTEND SECURITY
Never trust frontend validation.
Never expose private API keys in client code.
Avoid unsafe HTML rendering.
Validate URLs before navigation.
Prevent open redirects.
Use secure authentication flows.
Avoid storing sensitive tokens in localStorage when safer alternatives are appropriate.
Protect sensitive routes on the backend.
Prevent DOM-based XSS.
Avoid leaking sensitive information through browser storage, logs, or error messages.
16. BACKEND SECURITY
Validate all incoming requests.
Enforce authentication and authorization.
Apply secure error handling.
Protect internal services.
Set timeouts for external requests.
Prevent resource exhaustion.
Restrict debug endpoints.
Disable unnecessary production debugging.
Apply secure defaults to framework configuration.
Never expose internal infrastructure details.
17. BUSINESS LOGIC SECURITY

Check for:

Race conditions.
TOCTOU vulnerabilities.
Payment manipulation.
Price tampering.
Coupon abuse.
Quantity manipulation.
Workflow bypass.
Duplicate transactions.
Replay attacks.
Account takeover.
Privilege escalation.
Insecure state transitions.
Multi-tenant data leakage.

Always enforce critical business rules on the server.

18. DENIAL OF SERVICE PROTECTION
Apply request rate limits.
Limit request payload sizes.
Limit expensive database queries.
Apply pagination.
Configure execution timeouts.
Protect against uncontrolled recursion.
Limit concurrent resource-intensive operations.
Avoid unbounded memory consumption.
Protect against ReDoS.
Set appropriate connection pool limits.
19. LOGGING AND MONITORING
Log security-relevant events.
Record authentication failures.
Record authorization failures.
Monitor suspicious activity.
Never log passwords, access tokens, or secrets.
Avoid unnecessary sensitive personal information in logs.
Protect log integrity and access.
Implement alerting for critical security events.
Ensure error messages do not disclose sensitive internals.
20. INFRASTRUCTURE AND DEPLOYMENT SECURITY
Use HTTPS everywhere.
Disable unnecessary ports and services.
Restrict firewall access.
Run applications with non-root privileges.
Secure Docker images.
Avoid privileged containers.
Scan container images.
Avoid secrets in Dockerfiles and image layers.
Secure Kubernetes RBAC and network policies.
Protect CI/CD credentials.
Require review for production changes.
Separate development, staging, and production environments.
Apply security patches regularly.
21. RACE CONDITIONS AND CONCURRENCY
Use database transactions where required.
Apply appropriate locking or atomic operations.
Prevent duplicate financial transactions.
Use idempotency keys for retryable operations.
Validate state transitions atomically.
Do not assume frontend button disabling prevents duplicate requests.
22. SECURITY TESTING REQUIREMENTS

For every relevant change, consider:

Static Application Security Testing (SAST).
Software Composition Analysis (SCA).
Secret scanning.
Dependency vulnerability scanning.
Input validation tests.
Authentication tests.
Authorization tests.
Negative test cases.
Regression security tests.
Dynamic Application Security Testing (DAST) where appropriate.

Use authorized test environments and test data only.

23. MANDATORY AI IDE WORKFLOW

Every AI coding assistant MUST follow this workflow:

BEFORE CODING
Understand the requested change.
Identify affected files and components.
Identify trust boundaries and sensitive data flows.
Identify relevant security risks.
Inspect existing authentication and authorization controls.
Identify database, API, and external service interactions.
DURING CODING
Follow secure coding practices.
Validate all untrusted inputs.
Use safe database operations.
Escape output appropriately.
Enforce backend authorization.
Protect secrets.
Avoid introducing insecure dependencies.
Preserve existing security controls.
AFTER CODING
Review every changed file for security issues.
Check for SQL and NoSQL injection.
Check for XSS and CSRF.
Check authentication and authorization.
Check for SSRF and command injection where applicable.
Check file handling and path traversal.
Check secrets and sensitive data exposure.
Run relevant tests and security scanners.
Fix identified vulnerabilities.
Report unresolved risks honestly.
24. SECURITY CHECKPOINT CHECKLIST

Before completing any coding task, review the following:

No SQL injection.
No NoSQL injection.
No XSS vulnerabilities.
No CSRF vulnerabilities.
No command injection.
No LDAP injection.
No SSTI.
No SSRF.
No path traversal.
No insecure file uploads.
No broken authentication.
No broken authorization.
No IDOR.
No privilege escalation.
No sensitive information exposure.
No hardcoded secrets.
No insecure cryptography.
No vulnerable dependencies introduced.
No insecure API configurations.
No missing rate limits on sensitive endpoints.
No business logic vulnerabilities.
No race conditions in critical operations.
No insecure deployment configurations.
Appropriate security tests reviewed or executed.
25. SECURITY SEVERITY CLASSIFICATION
Severity	Description	Required Action
CRITICAL	Remote code execution, major data breach, authentication bypass	Stop and fix immediately
HIGH	SQL injection, privilege escalation, sensitive data exposure	Fix before completion
MEDIUM	CSRF, insecure configuration, missing access controls in limited contexts	Fix or document an approved mitigation
LOW	Minor information disclosure or hardening issue	Address according to risk
INFO	Security improvement recommendation	Document and consider

Severity must be based on actual impact and exploitability, not merely the vulnerability name.

26. FINAL AI SECURITY DIRECTIVE

Whenever an AI assistant writes, edits, refactors, or reviews code:

SECURITY MUST ALWAYS BE PART OF THE IMPLEMENTATION PROCESS.

The assistant must:

Think about security before generating code.
Follow this checkpoint throughout implementation.
Never knowingly introduce insecure code.
Never remove existing security protections without explicit authorization and a documented reason.
Never silently ignore discovered vulnerabilities.
Never claim a security audit passed if it was not performed.
Clearly report any remaining security risks.

If a requested implementation conflicts with these security requirements, explain the risk and propose a safer implementation.

FINAL RULE: FUNCTIONALITY WITHOUT SECURITY IS NOT A COMPLETED IMPLEMENTATION.

Document: SECURITY_CHECKPOINT.md
Policy: Mandatory for every relevant code change
Maintenance: Review and update as application architecture and security standards evolve.