
set ENV_PROD_DB_HOST=localhost
set ENV_PROD_DB_PORT=5432
set ENV_PROD_DB_USER=postgres
set ENV_PROD_DB_PASS=123456
set ENV_PROD_DB_DATABASE=group-project
set ENV_PROD_DB_SSL=disable
set ENV_DEV_DB_HOST=localhost
set ENV_DEV_DB_PORT=5432
set ENV_DEV_DB_USER=postgres
set ENV_DEV_DB_PASS=123456
set ENV_DEV_DB_DATABASE=group-project
set ENV_DEV_DB_SSL=disable
set JWT_SECRET=helloooo
set ENV_BASE_URL=http://localhost:8080/v1
cd ..
cd ..
go mod vendor
cd api
go build
api.exe

pause