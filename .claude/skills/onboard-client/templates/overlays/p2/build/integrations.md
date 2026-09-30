# Integrations & Environments

Every system the workflows touch, how we reach it, and whether access is ready.

## Systems

| System | Purpose in the workflow | Access method | Auth | Owner | Data classification | Access status |
|--------|-------------------------|---------------|------|-------|---------------------|---------------|

Access method: MCP connector · API · file drop / export · read-only replica. Access status: `ready` · `requested <date>` · `blocked` (and why) · `not requested`.

## Environments

| Environment | Where (AWS account alias / region, tenant) | Purpose | Who grants access | Status |
|-------------|--------------------------------------------|---------|-------------------|--------|

No credentials, keys, or connection strings here. Record *where* the secrets live, never the secrets themselves.
