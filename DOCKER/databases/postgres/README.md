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

## PGAdmin Connection Settings
When connecting to a database running inside another Docker container from PGAdmin, you'll need to use the Docker network's Gateway IP, not localhost or 127.0.0.1.
  1. Log in to the PGAdmin web interface.
  2. Right-click on "Servers" in the left sidebar, then select "Create" > "Server".
  3. In the "General" tab, provide a name for the connection.
  4. Navigate to the "Connection" tab:
    - Hostname/Address: Enter the Gateway IP of the Docker network where your database container is running. For example, if your database container's Gateway IP is 172.26.0.1, that's what you'd enter here.
    - Port: Enter the port on which your database is listening. For PostgreSQL, it's usually 5432.
    - Maintenance database, Username, and Password: These are specific to your database setup. Provide the necessary credentials.

Remember, if your database is running in a Docker container and you're trying to access it from PGAdmin (also in a container), using localhost will refer to the PGAdmin's own container, not the host machine or the database container. Therefore, always use the Gateway IP for inter-container communication on the same Docker network.

## Note

For a production environment, ensure to change the default email and password to more secure ones.