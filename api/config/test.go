// Copyright 2020 OSU SOFTWARE ENGINEERING GROUP PROJECT. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package config

import "fmt"

//BuildTestDBConfig - Builds DB Config for dev environment
func BuildTestDBConfig() *DBConfig {
	dbConfig := DBConfig{
		Host:     "localhost",
		Port:     5432,
		User:     "postgres",
		DBName:   "test",
		Password: "123456",
	}
	return &dbConfig
}

//TestDbURL - returns connection string for dev database
func TestDbURL(dbConfig *DBConfig) string {
	return fmt.Sprintf(
		"postgres://%s:%s@%s:%d/%s?sslmode=disable",
		dbConfig.User,
		dbConfig.Password,
		dbConfig.Host,
		dbConfig.Port,
		dbConfig.DBName,
	)
}
