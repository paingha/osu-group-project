// Copyright 2020 OSU SOFTWARE ENGINEERING GROUP PROJECT. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package config

import (
	"flag"
	"log"

	env "github.com/Netflix/go-env"
	"github.com/jinzhu/gorm"
)

var (
	//DB - Database connection
	DB *gorm.DB
)

// DBConfig represents db configuration
type DBConfig struct {
	Host     string
	Port     int
	User     string
	DBName   string
	Password string
	SSL      string
}

//SystemConfig represents system service configuration
type SystemConfig struct {
	ProdDBHost        string `env:"ENV_PROD_DB_HOST"`
	ProdDBPort        string `env:"ENV_PROD_DB_PORT"`
	ProdDBUser        string `env:"ENV_PROD_DB_USER"`
	ProdDBPass        string `env:"ENV_PROD_DB_PASS"`
	ProdDBDatabase    string `env:"ENV_PROD_DB_DATABASE"`
	ProdDBSSL         string `env:"ENV_PROD_DB_SSL"`
	DevDBHost         string `env:"ENV_DEV_DB_HOST"`
	DevDBPort         string `env:"ENV_DEV_DB_PORT"`
	DevDBUser         string `env:"ENV_DEV_DB_USER"`
	DevDBPass         string `env:"ENV_DEV_DB_PASS"`
	DevDBDatabase     string `env:"ENV_DEV_DB_DATABASE"`
	DevDBSSL          string `env:"ENV_DEV_DB_SSL"`
}

//GetConnectionContext - returns database connection string based on environment
func GetConnectionContext() string {
	dbContext := flag.Bool("isDev", false, "a bool")
	if *dbContext {
		return DevDbURL(BuildProdDBConfig())
	}
	return ProdDbURL(BuildDevDBConfig())
}

//GetTestConnectionContext - returns database connection string for test to be run
func GetTestConnectionContext() string {
	return TestDbURL(BuildTestDBConfig())
}

//UseDBTestContext - Provide Test DB Context for Model tests
func UseDBTestContext() error{
	var err error
	DB, err = gorm.Open("postgres", GetTestConnectionContext())
	if err != nil{
		log.Fatal(err)
		return err
	}
	defer DB.Close()
	return nil
}

//InitConfig - initial the configuration struct with environment variables
func InitConfig(cfg interface{}) error {
	_, err := env.UnmarshalFromEnviron(cfg)
	if err != nil {
		return err
	}
	return nil
}
