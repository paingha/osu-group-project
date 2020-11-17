// Copyright 2020 OSU SOFTWARE ENGINEERING GROUP PROJECT. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package utils_test

import (
	"testing"

	"bitbucket.com/group-project/api/utils"
	"github.com/stretchr/testify/assert"
)

func TestUppercase(T *testing.T) {
	resp := utils.UppercaseName("joe")
	assert.Equal(T, resp, "Joe", "The name should be equal")
}
