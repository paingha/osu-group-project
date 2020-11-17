// Copyright 2020 OSU SOFTWARE ENGINEERING GROUP PROJECT. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package security_test

import (
	"testing"

	"bitbucket.com/group-project/api/security"
	"github.com/stretchr/testify/assert"
)

func TestHashpassword(T *testing.T) {
	hash := security.HashSaltPassword([]byte("123456789"))
	assert.NotNil(T, hash, "There should be a hash returned")
}

func TestVerifyHashpassword(T *testing.T) {
	hash := security.HashSaltPassword([]byte("123456789"))
	pass := security.VerifyHash([]byte(hash), []byte("123456789"))
	assert.NotNil(T, hash, "There should be a hash returned")
	assert.Equal(T, pass, true, "The password should be equal to hash")
}
