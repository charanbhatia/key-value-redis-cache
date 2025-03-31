package api

import (
    "errors"
)

const MaxLength = 256

// ValidateKeyValue validates the key and value
func ValidateKeyValue(key, value string) error {
    if len(key) == 0 {
        return errors.New("key cannot be empty")
    }

    if len(key) > MaxLength {
        return errors.New("key length cannot exceed 256 characters")
    }

    if len(value) > MaxLength {
        return errors.New("value length cannot exceed 256 characters")
    }

    return nil
}

// ValidateKey validates just the key
func ValidateKey(key string) error {
    if len(key) == 0 {
        return errors.New("key cannot be empty")
    }

    if len(key) > MaxLength {
        return errors.New("key length cannot exceed 256 characters")
    }

    return nil
}