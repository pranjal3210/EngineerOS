# EngineerOS

## Local Infrastructure

EngineerOS uses Docker Compose for local infrastructure services only. The Next.js and NestJS applications run on the host during development.

Create a local environment file:

```bash
cp .env.example .env
```

Start PostgreSQL and Redis:

```bash
docker compose up -d
```

Check service health:

```bash
docker ps
```

Stop the services without deleting persistent volumes:

```bash
docker compose down
```
