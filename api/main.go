// Copyright 2020 OSU SOFTWARE ENGINEERING GROUP PROJECT. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"bitbucket.com/group-project/api/config"
	"bitbucket.com/group-project/api/models"
	"bitbucket.com/group-project/api/plugins"
	"bitbucket.com/group-project/api/routes"
	"github.com/jinzhu/gorm"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	_ "bitbucket.com/group-project/api/docs" // docs is generated by Swag CLI, you have to import it.
)

// @title OSU SOFTWARE ENGINEERING GROUP PROJECT
// @version 1.0
// @description This is an api server for NSU IRB.
// @termsOfService http://swagger.io/terms/

// @contact.name OSU SOFTWARE ENGINEERING GROUP PROJECT
// @contact.url https://github.com/paingha
// @contact.email apaingha@gmail.com
// @schemes http https ws
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8080
// @BasePath /v1
var err error

func main() {
	//system config
	systemCfg := &config.SystemConfig{}
	if err := config.InitConfig(systemCfg); err != nil {
		plugins.LogFatal("API", "Wrong config", err)
	}
	// Connect to Database
	config.DB, err = gorm.Open("postgres", config.GetConnectionContext())
	if err != nil {
		plugins.LogFatal("API", "Database connection error", err)
	}
	defer config.DB.Close()
	config.DB.LogMode(true)
	config.DB.AutoMigrate(&models.User{})
	localServer := ":8080"
	//setup routes
	r := routes.SetupRouter()
	url := ginSwagger.URL("http://localhost:8080/swagger/doc.json") // The url pointing to API definition
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, url))
	// running
	if err := r.Run(localServer); err != nil {
		plugins.LogFatal("API", "An Error occured while starting the server", err)
	}
}
