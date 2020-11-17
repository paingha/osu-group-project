// Copyright 2020 OSU SOFTWARE ENGINEERING GROUP PROJECT. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package config

import (
	"fmt"

	"bitbucket.com/group-project/api/plugins"
)

//BuildDevDBConfig - Builds DB Config for dev environment
func BuildDevDBConfig() *DBConfig {
	var cfg SystemConfig
	err := InitConfig(&cfg)
	if err != nil {
		plugins.LogFatal("API", "Wrong Dev System config", err)
	}
	dbConfig := DBConfig{
		Host:     "ec2-3-216-89-250.compute-1.amazonaws.com",
		Port:     5432,
		User:     "pxdgsonhiftefq",
		DBName:   "df0a2a4im125a4",
		Password: "47ce84cae21c33cf0120af2518a4624951bb8777aeadf938f377172bb5c37987",
		SSL:      cfg.ProdDBSSL,
	}
	return &dbConfig
}

//DevDbURL - returns connection string for dev database
func DevDbURL(dbConfig *DBConfig) string {
	return fmt.Sprintf(
		"postgres://%s:%s@%s:%d/%s?sslmode=%s",
		dbConfig.User,
		dbConfig.Password,
		dbConfig.Host,
		dbConfig.Port,
		dbConfig.DBName,
		dbConfig.SSL,
	)
}
