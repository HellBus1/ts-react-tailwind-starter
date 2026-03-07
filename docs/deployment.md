# Docker Deployment

This app includes a production-ready multi-stage `Dockerfile`. The app is built with Node and served statically via an `nginx:alpine` image.

## Nginx Proxy Integration
Rather than exposing full CORS chains across multiple subdomains, the bundled `nginx.conf` intercepts internal `/api/` traffic and strictly channels it downstream directly to the `backend:3000` Docker internal network stack.

Because of this, the frontend container explicitly ignores standard public URL environments and directly invokes `/api/auth/login`—delegating routing seamlessly.

## Running the Application
A `docker-compose.yml` configuration is provided in the **backend repository**. It concurrently launches the frontend, connecting it strictly over the internal stack avoiding complex configurations.

### Connecting From the Backend Environment:
```yaml
# Inside the ts-bun-starter repo
docker compose -f docker-compose.yml --profile migrate up -d
```
