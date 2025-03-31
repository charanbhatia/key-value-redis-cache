package api

import (
	"key-value-cache/cache"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	cache *cache.Cache
}

type PutRequest struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

type Response struct {
	Status  string `json:"status"`
	Message string `json:"message,omitempty"`
	Key     string `json:"key,omitempty"`
	Value   string `json:"value,omitempty"`
}

func NewHandler(cache *cache.Cache) *Handler {
	return &Handler{
		cache: cache,
	}
}

// PutHandler handles the PUT operation
func (h *Handler) PutHandler(c *gin.Context) {
	var req PutRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, Response{
			Status:  "ERROR",
			Message: "Invalid JSON format",
		})
		return
	}

	if err := ValidateKeyValue(req.Key, req.Value); err != nil {
		c.JSON(http.StatusBadRequest, Response{
			Status:  "ERROR",
			Message: err.Error(),
		})
		return
	}

	h.cache.Put(req.Key, req.Value)

	c.JSON(http.StatusOK, Response{
		Status:  "OK",
		Message: "Key inserted/updated successfully.",
	})
}

// GetHandler handles the GET operation
func (h *Handler) GetHandler(c *gin.Context) {
	key := c.Query("key")

	if err := ValidateKey(key); err != nil {
		c.JSON(http.StatusBadRequest, Response{
			Status:  "ERROR",
			Message: err.Error(),
		})
		return
	}

	if value, ok := h.cache.Get(key); ok {
		c.JSON(http.StatusOK, Response{
			Status: "OK",
			Key:    key,
			Value:  value,
		})
	} else {
		c.JSON(http.StatusNotFound, Response{
			Status:  "ERROR",
			Message: "Key not found.",
		})
	}
}
