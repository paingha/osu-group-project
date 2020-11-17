// Copyright 2020 OSU SOFTWARE ENGINEERING GROUP PROJECT. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package models

import (
	"os"
	"time"

	"bitbucket.com/group-project/api/config"
	"bitbucket.com/group-project/api/security"

	"github.com/dgrijalva/jwt-go"
	//Needed for postgres
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

//User - user data struct
type User struct {
	ID                   int        `json:"id,omitempty" sql:"primary_key"`
	IsAdmin              bool       `gorm:"default:false" json:"isAdmin"`
	FirstName            string     `gorm:"not null" json:"firstName"`
	LastName             string     `gorm:"not null" json:"lastName"`
	Email                string     `gorm:"unique;not null" json:"email"`
	PhoneNumber          string     `json:"phoneNumber"`
	Password             string     `gorm:"not null" json:"password"`
	EmailVerified        bool       `gorm:"default:false" json:"emailVerified"`
	VerifyCode           string     `json:"verifyCode"`
	CreatedAt            time.Time  `json:"created_at"`
	UpdatedAt            time.Time  `json:"updated_at"`
	DeletedAt            *time.Time `json:"deleted_at"`
}


//TableName - table name in database
func (u *User) TableName() string {
	return "users"
}

//GetAllUsers - fetch all users at once
func GetAllUsers(user *[]User, offset int, limit int) (int, error) {
	var count = 0
	if err := config.DB.Model(&User{}).Count(&count).Order("created_at desc").Offset(offset).Limit(limit).Find(user).Error; err != nil {
		return count, err
	}
	return count, nil
}

//CreateUser - create a user
func CreateUser(user *User) (bool, error) {
	var dbUser User
	if err := config.DB.Where("email = ?", user.Email).First(&dbUser).Error; err != nil {
		if err.Error() == "record not found" {
			user.EmailVerified = true
			if errs := config.DB.Create(user).Error; errs != nil {
				return false, errs
			}
			return true, nil
		}
		return false, err
	}
	return false, nil
}

//LoginUser - fetch one user
func LoginUser(user *User) (User, string, error) {
	var dbUser User
	jwtSecretByte := []byte(os.Getenv("JWT_SECRET"))
	expiresAt := time.Now().Add(1200 * time.Minute)
	if err := config.DB.Model(&user).Where(&User{Email: user.Email}).First(&dbUser).Error; err != nil {
		return User{}, "", err
	}
	//compare db password hash and password provided
	resp := security.VerifyHash([]byte(dbUser.Password), []byte(user.Password))
	if !resp {
		return User{}, "", nil
	}
	claims := &security.Claims{
		UserID:  user.ID,
		IsAdmin: user.IsAdmin,
		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: expiresAt.Unix(),
		},
	}
	// Declare the token with the algorithm used for signing, and the claims
	tokens := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Create the JWT string
	tokenString, errs := tokens.SignedString(jwtSecretByte)
	if errs != nil {
		return User{}, "", errs
	}
	return dbUser, tokenString, nil

}

//GetUser - fetch one user
func GetUser(user *User, id int) error {
	if err := config.DB.Where("id = ?", id).First(user).Error; err != nil {
		return err
	}
	return nil
}

//VerifyEmailUser - verify user's email
func VerifyEmailUser(user *User, token string) error {
	if err := config.DB.Model(&user).Where(&User{VerifyCode: token}).Updates(map[string]interface{}{"email_verified": true, "verify_code": ""}).Error; err != nil {
		return err
	}
	return nil
}


//UpdateUser - update a user
func UpdateUser(user *User, id int) error {
	if err := config.DB.Model(&user).Omit("is_admin", "email_verified", "password", "verify_code", "phone_verified", "phone_verify_code", "created_at", "updated_at", "deleted_at", "phone_verify_sent_at", "phone_verify_expires_at").Updates(user).Error; err != nil {
		return err
	}
	return nil
}

//DeleteUser - delete a user
func DeleteUser(id int) error {
	if err := config.DB.Where("id = ?", id).Unscoped().Delete(User{}).Error; err != nil {
		return err
	}
	return nil
}

