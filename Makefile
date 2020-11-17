.PHONY: start-api
start-api:
	if [ -a ./api/api.exe ]; then rm -rf ./api/api.exe; fi;
	@echo "Starting API Service"
ifeq ($(OS),Windows_NT)
	cd ./scripts/win && ./start.cmd
else
	cd ./scripts/linux && ./start.sh
endif

.PHONY: start-webapp
start-webapp:
	@echo "Starting Web App"
	cd webapp && yarn start

.PHONY: build-webapp
build-webapp:
	@echo "Building Web App"
	cd webapp && yarn build

.PHONY: clear-api
clear-api:
	@echo "Clear API exe"
	rm -rf ./api/main.exe


