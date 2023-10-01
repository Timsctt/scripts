# PGAdmin Docker Launcher: pgadmin_only.sh
This script allows you to quickly spin up a PGAdmin instance using Docker.
## Prerequisites
  1. Ensure you have Docker installed and running on your machine.
  2. Ensure the pgadmin_only.sh script has executable permissions. If not, you can set it with:

```bash
chmod +x pgadmin_only.sh
```

## Usage

Execute the script to start PGAdmin:

```bash
./pgadmin_only.sh
```

Once executed, PGAdmin will be available at:

```bash
http://localhost:5050
```

### Credentials to access PGAdmin:
  - Email: admin@admin.com
  - Password: password

## Network Configuration

If you're running other Docker containers and want this PGAdmin instance to communicate with them, especially if they're on a custom network, ensure you add the appropriate --network flag to the Docker run command inside the pgadmin_only.sh script.

For instance, if you have a network named prisma_default, you would modify the Docker run command in the script to:

```bash
docker run -p 5050:80 -d --rm --name pgadmin --network prisma_default -e PGADMIN_DEFAULT_EMAIL=admin@admin.com -e PGADMIN_DEFAULT_PASSWORD=password -e PGADMIN_LISTEN_PORT=80 -e HKEY_CLASSES_ROOT=text/javascript dpage/pgadmin4
```

## Note

For a production environment, ensure to change the default email and password to more secure ones.