docker run -p 5050:80 -d --rm --name pgadmin -e PGADMIN_DEFAULT_EMAIL=admin@admin.com -e PGADMIN_DEFAULT_PASSWORD=password -e PGADMIN_LISTEN_PORT=80 dpage/pgadmin4
