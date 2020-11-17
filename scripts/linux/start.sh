
export PROD_DB_HOST=localhost
export PROD_DB_PORT=5432
export PROD_DB_USER=postgres
export PROD_DB_PASS=123456
export PROD_DB_DATABASE=group-project
export PROD_DB_SSL=disable
export DEV_DB_HOST=localhost
export DEV_DB_PORT=5432
export DEV_DB_USER=postgres
export DEV_DB_PASS=123456
export DEV_DB_DATABASE=irb
export DEV_DB_SSL=disable
export JWT_SECRET=helloooo
export ENV_BASE_URL=http://localhost:8080/v1
go mod vendor
go build -o ./api/main.exe ./api
cd api
main.exe

pause