
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.1",
    "info": {
      "title": "Native Infinity API",
      "description": "Documentation of Native Infinity API endpoints.",
      "version": "1.0.0",
      "contact": {
        "name": "Native Infinity Support",
        "email": "contato@nativeip.com.br"
      }
    },
    "tags": [
      {
        "name": "Token"
      },
      {
        "name": "ClickToCall"
      },
      {
        "name": "Trunks"
      },
      {
        "name": "Peers"
      },
      {
        "name": "Categories"
      },
      {
        "name": "Cost Centers"
      },
      {
        "name": "Groups"
      },
      {
        "name": "Profiles"
      },
      {
        "name": "Queues"
      },
      {
        "name": "Reports"
      }
    ],
    "paths": {
      "/api/calls": {
        "post": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "ClickToCall"
          ],
          "summary": "click-to-call trigger",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {},
                "example": {
                  "origem": "100",
                  "destino": "1002"
                }
              }
            },
            "required": true
          },
          "responses": {
            "201": {
              "description": "Created",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "exten": "100",
                    "destination": "1002",
                    "profile": "interno",
                    "context": "clicktocall",
                    "uniqueid": "clicktocall-1614003741062",
                    "callStatus": "Call established"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            }
          }
        }
      },
      "/nativeApis": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "ClickToCall"
          ],
          "summary": "Get click-to-call API configurations",
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/clickToCall"
                  },
                  "example": {
                    "id": 1,
                    "name": "clickToCall",
                    "configuration": "{\"srcConditions\":[{\"srcCondVal\":\"100\",\"srcCondType\":\"peer\",\"srcCondIvr\":\"\",\"srcCondQueue\":4,\"srcCondPeer\":15}],\"dstConditions\":[{\"dstCondVal\":\"1002\",\"dstCondType\":\"queue\",\"dstCondIvr\":\"\",\"dstCondQueue\":4,\"dstCondPeer\":11}],\"srcVar\":\"origem\",\"srcCondition\":true,\"dstCondition\":true,\"dstVar\":\"destino\",\"authenticate\":\"true\"}",
                    "createdBy": "default",
                    "updatedBy": "native",
                    "createdAt": "2021-02-22T12:05:49.000Z",
                    "updatedAt": "2021-02-22T14:34:18.000Z"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            }
          }
        }
      },
      "/nativeApis/:id": {
        "put": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "ClickToCall"
          ],
          "summary": "Update click-to-call API configuration by Id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of API to update",
              "required": true
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/clickToCall"
                },
                "example": {
                  "id": 1,
                  "name": "clickToCall",
                  "configuration": "{\"srcConditions\":[{\"srcCondVal\":\"100\",\"srcCondType\":\"peer\",\"srcCondIvr\":\"\",\"srcCondQueue\":4,\"srcCondPeer\":15},{\"srcCondVal\":\"110\",\"srcCondType\":\"ivr\",\"srcCondIvr\":7,\"srcCondQueue\":\"\",\"srcCondPeer\":\"\"}],\"dstConditions\":[{\"dstCondVal\":\"1002\",\"dstCondType\":\"queue\",\"dstCondIvr\":\"\",\"dstCondQueue\":4,\"dstCondPeer\":11,\"$hashKey\":\"object:116\"},{\"dstCondVal\":\"1001\",\"dstCondType\":\"ivr\",\"dstCondIvr\":7,\"dstCondQueue\":\"\",\"dstCondPeer\":10,\"$hashKey\":\"object:229\"}],\"srcVar\":\"origem\",\"srcCondition\":true,\"dstCondition\":true,\"dstVar\":\"destino\",\"authenticate\":\"true\"}",
                  "createdBy": "native"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/clickToCall"
                  },
                  "example": {
                    "id": 1,
                    "name": "clickToCall",
                    "configuration": "{\"srcConditions\":[{\"srcCondVal\":\"100\",\"srcCondType\":\"peer\",\"srcCondIvr\":\"\",\"srcCondQueue\":4,\"srcCondPeer\":15}],\"dstConditions\":[{\"dstCondVal\":\"1002\",\"dstCondType\":\"queue\",\"dstCondIvr\":\"\",\"dstCondQueue\":4,\"dstCondPeer\":11}],\"srcVar\":\"origem\",\"srcCondition\":true,\"dstCondition\":true,\"dstVar\":\"destino\",\"authenticate\":\"true\"}",
                    "createdBy": "default",
                    "updatedBy": "native",
                    "createdAt": "2021-02-22T12:05:49.000Z",
                    "updatedAt": "2021-02-22T14:34:18.000Z"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            }
          }
        }
      },
      "/token": {
        "post": {
          "tags": [
            "Token"
          ],
          "summary": "Authentication route",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {},
                "example": {
                  "username": "native",
                  "password": "@123"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "user": {
                      "id": 100,
                      "name": "Admin",
                      "username": "native",
                      "avatar": "49-call-center.png",
                      "email": "native@mail.com",
                      "administrator": true,
                      "superAdministrator": true,
                      "callcenter": "supervisor",
                      "Peer": {
                        "id": 100,
                        "username": 100,
                        "secret": "Native.100",
                        "name": "Native IP",
                        "profileId": 5,
                        "Category": {
                          "callLimit": 1
                        }
                      },
                      "WorkingTime": null,
                      "Rooms": [],
                      "permissions": [
                        "serviceHours",
                        "videoRooms"
                      ],
                      "Auth": {
                        "id": 830,
                        "loginAt": "2021-02-22T13:31:50.000Z",
                        "logoutAt": null,
                        "createdBy": "native",
                        "updatedBy": "native",
                        "createdAt": "2021-02-22T13:31:50.000Z",
                        "updatedAt": "2021-02-23T18:36:36.884Z",
                        "userId": 100
                      }
                    },
                    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwicGVybWlzc2lvbnMiOlsiY29udGFjdHMiLCJjdXN0b21SdWxlcyIsImZlYXR1cmVzIiwicm91dGVzIiwiaXZycyIsIm1lZXRtZXMiLCJwZWVycyIsInF1ZXVlcyIsInNlcnZpY2VIb3VycyIsInRydW5rcyIsInVzZXJzIiwicmVwb3J0cyIsIm1vaHMiLCJhcGlzIiwiY29ja3BpdCIsImxpY2Vuc2VzIiwiY2FsbGNlbnRlciIsImRpYWxlciIsInZpZGVvUm9vbXMiLCJwZWVyc1BhbmVsIiwiYmxhY2tsaXN0cyIsInNtcyIsInJlc2FsZXMiLCJtb25pdG9yaW5nRm9ybXMiLCJtb25pdG9yaW5nUmF0aW5ncyIsInN1cGVydmlzb3IiXSwiaXNBZG1pbiI6dHJ1ZX0.l7ZKVEIiELRvhf0MrzzJreVZJ-fiRgMDNukBeBd54c8"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Data sent incorrectly."
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized Request",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Absence temporary of login"
                  }
                }
              }
            }
          }
        }
      },
      "/trunks/:id": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Trunks"
          ],
          "summary": "Get a trunk by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of trunk to return",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/trunks"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Trunk not found."
                  }
                }
              }
            }
          }
        },
        "put": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Trunks"
          ],
          "summary": "Update a trunk by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of trunk to update",
              "required": true
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/trunks"
                },
                "example": {
                  "name": "Update Trunk Name"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "success": "Trunk successfully updated."
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "422": {
              "$ref": "#/components/unprocessableEntity"
            }
          }
        },
        "delete": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Trunks"
          ],
          "summary": "Delete a trunk by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of trunk to delete",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            }
          }
        }
      },
      "/trunks": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Trunks"
          ],
          "summary": "Get all trunks",
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/trunks"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            }
          }
        },
        "post": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Trunks"
          ],
          "summary": "Create a trunk",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/trunks"
                },
                "example": {
                  "name": "Trunk Name",
                  "type": "SIP"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/trunks"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "422": {
              "$ref": "#/components/unprocessableEntity"
            }
          }
        }
      },
      "/peers/:id": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Peers"
          ],
          "summary": "Get a peer by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of peer to return",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "id": 1,
                    "username": 100,
                    "secret": "Native.100",
                    "name": "Native 100",
                    "email": "native@mail.com",
                    "callCenter": false,
                    "hideOnAgenda": false,
                    "sipRegStatus": "UNAVAILABLE",
                    "sipIp": null,
                    "iaxRegStatus": null,
                    "iaxIp": null,
                    "newVoicemail": false,
                    "dynamic": false,
                    "webrtc": true,
                    "provisioning": false,
                    "deviceBrand": null,
                    "deviceModel": null,
                    "deviceMac": null,
                    "createdBy": "native",
                    "updatedBy": "121",
                    "createdAt": "2020-06-09T16:30:34.000Z",
                    "updatedAt": "2020-11-16T19:05:43.000Z",
                    "profileId": 6,
                    "categoryId": 5,
                    "costCenterId": 1,
                    "Category": {
                      "id": 5,
                      "name": "Categoria Teste",
                      "description": null,
                      "nat": true,
                      "voicemail": true,
                      "lock": true,
                      "followme": true,
                      "passwordCall": false,
                      "monitor": "all",
                      "callLimit": 1,
                      "timeout": 60,
                      "timeRestrictionStart": "",
                      "timeRestrictionEnd": "",
                      "overflowExtension": null,
                      "createdBy": "native",
                      "updatedBy": "native"
                    },
                    "Profile": {
                      "id": 6,
                      "name": "Somente Local",
                      "description": null,
                      "createdBy": "native",
                      "updatedBy": null
                    },
                    "Groups": [
                      {
                        "id": 3,
                        "name": "Grupo Teste",
                        "description": null,
                        "createdBy": "native",
                        "updatedBy": "native"
                      }
                    ],
                    "CostCenter": {
                      "id": 1,
                      "name": "CC1"
                    },
                    "User": {
                      "id": 1,
                      "name": "Admin"
                    }
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Peer id 1 not found"
                  }
                }
              }
            }
          }
        },
        "put": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Peers"
          ],
          "summary": "Update a peer by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of peer to update",
              "required": true
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/peers"
                },
                "example": {
                  "email": "update.mail@mail.com"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/peers"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Peer id 1 not found"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Peers"
          ],
          "summary": "Delete a peer by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of peer to delete",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Peer not found"
                  }
                }
              }
            }
          }
        }
      },
      "/peers": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Peers"
          ],
          "summary": "Get all peers",
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/peers"
                  },
                  "example": {
                    "id": 9,
                    "username": 100,
                    "secret": "Native.100",
                    "name": "Native Peer 100",
                    "email": "native@native.com.br",
                    "callCenter": false,
                    "hideOnAgenda": false,
                    "sipRegStatus": "UNAVAILABLE",
                    "sipIp": null,
                    "iaxRegStatus": null,
                    "iaxIp": null,
                    "newVoicemail": false,
                    "dynamic": false,
                    "webrtc": true,
                    "provisioning": false,
                    "deviceBrand": null,
                    "deviceModel": null,
                    "deviceMac": null,
                    "createdBy": "native",
                    "updatedBy": "native",
                    "profileId": 6,
                    "categoryId": 5,
                    "costCenterId": 1,
                    "Category": {
                      "id": 5,
                      "name": "Categoria Teste",
                      "description": null,
                      "nat": true,
                      "voicemail": true,
                      "lock": true,
                      "followme": true,
                      "passwordCall": false,
                      "monitor": "all",
                      "callLimit": 1,
                      "timeout": 60,
                      "timeRestrictionStart": "",
                      "timeRestrictionEnd": "",
                      "overflowExtension": null,
                      "createdBy": "native",
                      "updatedBy": "native"
                    },
                    "Profile": {
                      "id": 6,
                      "name": "Somente Local",
                      "description": null,
                      "createdBy": "native",
                      "updatedBy": null
                    },
                    "Groups": [
                      {
                        "id": 3,
                        "name": "Grupo Teste",
                        "description": null,
                        "createdBy": "native",
                        "updatedBy": "native"
                      }
                    ],
                    "CostCenter": {
                      "id": 1,
                      "name": "CC1"
                    },
                    "User": {
                      "id": 51,
                      "name": "Native Teste"
                    }
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            }
          }
        },
        "post": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Peers"
          ],
          "summary": "Create a peer",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/peers"
                },
                "example": {
                  "username": "100",
                  "secret": "Native.100",
                  "name": "Native Peer 100",
                  "callCenter": true,
                  "hideOnAgenda": false,
                  "dynamic": false,
                  "webrtc": false,
                  "provisioning": false
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/peers"
                  },
                  "example": {
                    "id": 9,
                    "username": 100,
                    "secret": "Native.100",
                    "name": "Native Peer 100",
                    "email": "native@native.com.br",
                    "callCenter": false,
                    "hideOnAgenda": false,
                    "sipRegStatus": "UNAVAILABLE",
                    "sipIp": null,
                    "iaxRegStatus": null,
                    "iaxIp": null,
                    "newVoicemail": false,
                    "dynamic": false,
                    "webrtc": true,
                    "provisioning": false,
                    "deviceBrand": null,
                    "deviceModel": null,
                    "deviceMac": null,
                    "createdBy": "native",
                    "updatedBy": "native",
                    "profileId": 6,
                    "categoryId": 5,
                    "costCenterId": 1,
                    "Category": {
                      "id": 5,
                      "name": "Categoria Teste",
                      "description": null,
                      "nat": true,
                      "voicemail": true,
                      "lock": true,
                      "followme": true,
                      "passwordCall": false,
                      "monitor": "all",
                      "callLimit": 1,
                      "timeout": 60,
                      "timeRestrictionStart": "",
                      "timeRestrictionEnd": "",
                      "overflowExtension": null,
                      "createdBy": "native",
                      "updatedBy": "native"
                    },
                    "Profile": {
                      "id": 6,
                      "name": "Somente Local",
                      "description": null,
                      "createdBy": "native",
                      "updatedBy": null
                    },
                    "Groups": [
                      {
                        "id": 3,
                        "name": "Grupo Teste",
                        "description": null,
                        "createdBy": "native",
                        "updatedBy": "native"
                      }
                    ],
                    "CostCenter": {
                      "id": 1,
                      "name": "CC1"
                    },
                    "User": {
                      "id": 51,
                      "name": "Native Teste"
                    }
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            }
          }
        }
      },
      "/categories/:id": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Categories"
          ],
          "summary": "Get a category by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of category to return",
              "required": true
            }
          ],
          "responses": {
            "201": {
              "description": "Created",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "id": 1,
                    "name": "New Category",
                    "description": "Test Category",
                    "nat": true,
                    "voicemail": false,
                    "lock": true,
                    "followme": true,
                    "passwordCall": false,
                    "monitor": "all",
                    "callLimit": 0,
                    "timeout": 60,
                    "timeRestrictionStart": "",
                    "timeRestrictionEnd": "",
                    "overflowExtension": null,
                    "createdBy": "native",
                    "updatedBy": "native",
                    "createdAt": "2020-09-23T16:48:02.000Z",
                    "updatedAt": "2020-12-30T12:42:44.000Z"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Category not found"
                  }
                }
              }
            }
          }
        },
        "put": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Categories"
          ],
          "summary": "Update a category by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of category to update",
              "required": true
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/categories"
                },
                "example": {
                  "name": "Update New Category",
                  "lock": false,
                  "followme": true
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/categories"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Category not found"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Categories"
          ],
          "summary": "Delete a category by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of category to delete",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Category not found"
                  }
                }
              }
            }
          }
        }
      },
      "/categories": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Categories"
          ],
          "summary": "Get all categories",
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/categories"
                  },
                  "example": {
                    "id": 1,
                    "name": "New Category",
                    "description": "Test Category",
                    "nat": true,
                    "voicemail": false,
                    "lock": true,
                    "followme": true,
                    "passwordCall": false,
                    "monitor": "all",
                    "callLimit": 0,
                    "timeout": 60,
                    "timeRestrictionStart": "",
                    "timeRestrictionEnd": "",
                    "overflowExtension": null,
                    "createdBy": "native",
                    "updatedBy": "native",
                    "createdAt": "2020-09-23T16:48:02.000Z",
                    "updatedAt": "2020-12-30T12:42:44.000Z"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            }
          }
        },
        "post": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Categories"
          ],
          "summary": "Create a category",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/categories"
                },
                "example": {
                  "name": "New Category",
                  "description": "Create New Category",
                  "nat": true,
                  "voicemail": true,
                  "lock": true,
                  "passwordCall": true,
                  "monitor": "all",
                  "callLimit": 1,
                  "timeout": "10",
                  "overflowExtension": "1000",
                  "timeRestrictionStart": "14:46:00",
                  "timeRestrictionEnd": "17:49:00"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/categories"
                  },
                  "example": {
                    "id": 10,
                    "name": "New Category",
                    "description": "Create New Category",
                    "followme": false,
                    "nat": true,
                    "voicemail": true,
                    "lock": true,
                    "passwordCall": true,
                    "monitor": "all",
                    "callLimit": 1,
                    "timeout": "10",
                    "overflowExtension": "1000",
                    "timeRestrictionStart": "14:46:00",
                    "timeRestrictionEnd": "17:49:00",
                    "updatedAt": "2021-03-19T14:27:48.731Z",
                    "createdAt": "2021-03-19T14:27:48.731Z"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "422": {
              "$ref": "#/components/unprocessableEntity"
            }
          }
        }
      },
      "/costCenters/:id": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Cost Centers"
          ],
          "summary": "Get a cost center by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of cost center to return",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "id": 15,
                    "name": "Test Cost Center native",
                    "description": "Cost Center Default",
                    "createdBy": "native",
                    "updatedBy": "native",
                    "createdAt": "2021-01-12T16:21:58.000Z",
                    "updatedAt": "2021-01-12T16:21:58.000Z"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Cost center not found"
                  }
                }
              }
            }
          }
        },
        "put": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Cost Centers"
          ],
          "summary": "Update a cost center by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of cost center to update",
              "required": true
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/costCenters"
                },
                "example": {
                  "name": "New Cost Center"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/costCenters"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Cost center not found"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Cost Centers"
          ],
          "summary": "Delete a cost center by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of cost center to delete",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Cost center not found"
                  }
                }
              }
            }
          }
        }
      },
      "/costCenters": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Cost Centers"
          ],
          "summary": "Get all cost centers",
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/costCenters"
                  },
                  "example": {
                    "id": 15,
                    "name": "Test Cost Center native",
                    "description": "Cost Center Default",
                    "createdBy": "native",
                    "updatedBy": "native",
                    "createdAt": "2021-01-12T16:21:58.000Z",
                    "updatedAt": "2021-01-12T16:21:58.000Z"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            }
          }
        },
        "post": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Cost Centers"
          ],
          "summary": "Create a cost center",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/costCenters"
                },
                "example": {
                  "name": "Test Create New Cost Center",
                  "description": "Cost Center Default",
                  "createdBy": "native"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/costCenters"
                  },
                  "example": {
                    "id": 4,
                    "name": "Test Create New Cost Center",
                    "description": "Cost Center Default",
                    "updatedBy": null,
                    "updatedAt": "2021-03-19T17:24:52.028Z",
                    "createdAt": "2021-03-19T17:24:52.028Z"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "422": {
              "$ref": "#/components/unprocessableEntity"
            }
          }
        }
      },
      "/groups/:id": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Groups"
          ],
          "summary": "Get a group by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of group to return",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "id": 1,
                    "name": "New Group",
                    "description": "New test group",
                    "createdBy": "native",
                    "updatedBy": null,
                    "createdAt": "2020-09-23T16:51:09.000Z",
                    "updatedAt": "2020-09-23T16:51:09.000Z"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Group not found"
                  }
                }
              }
            }
          }
        },
        "put": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Groups"
          ],
          "summary": "Update a group by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of group to update",
              "required": true
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/groups"
                },
                "example": {
                  "name": "New Update Group"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/groups"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Group not found"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Groups"
          ],
          "summary": "Delete a group by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of group to delete",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Group not found"
                  }
                }
              }
            }
          }
        }
      },
      "/groups": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Groups"
          ],
          "summary": "Get all groups",
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/groups"
                  },
                  "example": {
                    "id": 1,
                    "name": "New Group",
                    "description": "New test group",
                    "createdBy": "native",
                    "updatedBy": null,
                    "createdAt": "2020-09-23T16:51:09.000Z",
                    "updatedAt": "2020-09-23T16:51:09.000Z"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            }
          }
        },
        "post": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Groups"
          ],
          "summary": "Create a group",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/groups"
                },
                "example": {
                  "name": "Test Create New Group",
                  "description": "Group Default",
                  "createdBy": "native"
                }
              }
            },
            "required": true
          },
          "responses": {
            "201": {
              "description": "Created",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/groups"
                  },
                  "example": {
                    "id": 4,
                    "name": "Test Create New Group",
                    "description": "Group Default",
                    "updatedAt": "2021-03-19T19:05:17.918Z",
                    "createdAt": "2021-03-19T19:05:17.918Z"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "422": {
              "$ref": "#/components/unprocessableEntity"
            }
          }
        }
      },
      "/profiles/:id": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Profiles"
          ],
          "summary": "Get a profile by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of profile to return",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "id": 2,
                    "name": "Profile Native",
                    "description": "Profile Default",
                    "createdBy": "native",
                    "updatedBy": "native",
                    "createdAt": "2020-11-03T12:23:23.000Z",
                    "updatedAt": "2020-12-14T23:47:16.000Z",
                    "OutRoutes": [
                      {
                        "id": 8,
                        "name": "Out Route Native",
                        "description": null,
                        "createdBy": "native",
                        "updatedBy": "native"
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Profile id 1 not found"
                  }
                }
              }
            }
          }
        },
        "put": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Profiles"
          ],
          "summary": "Update a profile by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of profile to update",
              "required": true
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/profiles"
                },
                "example": {
                  "name": "Update Profile Native"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/profiles"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Profile id 1 not found"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Profiles"
          ],
          "summary": "Delete a profile by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of profile to delete",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "Profile id 1 not found"
                  }
                }
              }
            }
          }
        }
      },
      "/profiles": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Profiles"
          ],
          "summary": "Get all profiles",
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/profiles"
                  },
                  "example": {
                    "id": 2,
                    "name": "Profile Native",
                    "description": "Profile Default",
                    "createdBy": "native",
                    "updatedBy": "native",
                    "createdAt": "2020-11-03T12:23:23.000Z",
                    "updatedAt": "2020-12-14T23:47:16.000Z",
                    "OutRoutes": [
                      {
                        "id": 8,
                        "name": "Out Route Native",
                        "description": null,
                        "createdBy": "native",
                        "updatedBy": "native"
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            }
          }
        },
        "post": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Profiles"
          ],
          "summary": "Create a profile",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/profiles"
                },
                "example": {
                  "name": "Test Create New Profile",
                  "description": "Profile Default",
                  "createdBy": "native"
                }
              }
            },
            "required": true
          },
          "responses": {
            "201": {
              "description": "Created",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/profiles"
                  },
                  "example": {
                    "name": "Test Create New Profile",
                    "description": "Profile Default",
                    "outRouteId": 1,
                    "createdBy": "native"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "422": {
              "$ref": "#/components/unprocessableEntity"
            }
          }
        }
      },
      "/queues/:id": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Queues"
          ],
          "summary": "Get a queue by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of queue to return",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/queues"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            }
          }
        },
        "put": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Queues"
          ],
          "summary": "Update a queue by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of queue to update",
              "required": true
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/queues"
                },
                "example": {
                  "name": "Fila do Administrador",
                  "breaks": [],
                  "CustomRulesAfter": [],
                  "CustomRulesBefore": [],
                  "goals": [],
                  "peers": [],
                  "users": [],
                  "customRulesAfter": [],
                  "customRulesBefore": []
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/queues"
                  },
                  "example": {
                    "success": "Queue successfully updated.",
                    "id": 1,
                    "name": "Fila do Admin",
                    "description": null,
                    "strategy": "rrmemory",
                    "ringTimeout": 16,
                    "wrapUptime": null,
                    "ringTone": "never",
                    "announceFrequency": null,
                    "announceHoldtime": true,
                    "announcePosition": null,
                    "ringInUse": false,
                    "monitor": true,
                    "monitorInherit": false,
                    "extension": 5000,
                    "joinEmpty": false,
                    "overflowExtension": "201",
                    "queueTimeout": 60,
                    "queueMaxSize": null,
                    "callcenter": true,
                    "periodicAnnounce": false,
                    "periodicAnnounceAudio": "",
                    "periodicAnnounceFrequency": null,
                    "iFrameIncoming": null,
                    "iFrameOutgoing": null,
                    "callerId": null,
                    "weight": null,
                    "peersOrder": null,
                    "customRulesAfterOrder": null,
                    "customRulesBeforeOrder": "[82]",
                    "enableCallDownload": false,
                    "callbackLost": null,
                    "callbackByDigit": null,
                    "callbackProfile": null,
                    "callbackWaitTime": 0,
                    "createdBy": "native",
                    "updatedBy": "native",
                    "createdAt": "2020-09-23T16:30:26.000Z",
                    "updatedAt": "2021-11-26T16:57:49.000Z",
                    "monitoringFormId": null,
                    "mohId": null,
                    "scriptIncoming": null,
                    "scriptOutgoing": null
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "422": {
              "$ref": "#/components/unprocessableEntity"
            }
          }
        },
        "delete": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Queues"
          ],
          "summary": "Delete a queue by id",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "Id of queue to delete",
              "required": true
            }
          ],
          "responses": {
            "204": {
              "description": "No Content"
            },
            "400": {
              "$ref": "#/components/badRequest"
            },
            "401": {
              "$ref": "#/components/unauthorized"
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {},
                  "example": {
                    "error": "queue not found"
                  }
                }
              }
            }
          }
        }
      },
      "/queues/": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Queues"
          ],
          "summary": "Get all queues",
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/schemas/queues"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            }
          }
        },
        "post": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Queues"
          ],
          "summary": "Create a queue",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/schemas/queues"
                },
                "example": {
                  "name": "Queue Name",
                  "extension": "300",
                  "ringTone": "never"
                }
              }
            },
            "required": true
          },
          "responses": {
            "201": {
              "description": "Created",
              "content": {
                "application/json": {
                  "example": {
                    "strategy": "rrmemory",
                    "monitor": false,
                    "monitorInherit": false,
                    "joinEmpty": false,
                    "callcenter": false,
                    "periodicAnnounce": false,
                    "enableCallDownload": false,
                    "callbackWaitTime": 0,
                    "id": 47,
                    "name": "Administrativo",
                    "extension": "5000",
                    "ringTone": "never",
                    "createdBy": "native",
                    "periodicAnnounceAudio": "",
                    "updatedAt": "2021-11-26T14:28:08.059Z",
                    "createdAt": "2021-11-26T14:28:08.059Z"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            }
          }
        }
      },
      "/queries/:id": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Reports"
          ],
          "parameters": [
            {
              "in": "query",
              "name": "params",
              "schema": {
                "type": "object",
                "properties": {
                  "report_id_1": {
                    "example": {
                      "DATE_SUB(startTime, INTERVAL 3 HOUR)": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "Users.id": "{\"type\":\"in\",\"value\":\" ( '13' ) \"}",
                      "callerNumber": "{\"type\":\"like\",\"value\":\"'%54999909090%'\"}",
                      "ql.queueId": "{\"type\":\"in\",\"value\":\" ( 2, 16 ) \"}"
                    }
                  },
                  "report_id_2": {
                    "example": {
                      "DATE_SUB(startTime, INTERVAL 3 HOUR)": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "callerNumber": "{\"type\":\"like\",\"value\":\"'%54999909090%'\"}",
                      "queueId": "{\"type\":\"in\",\"value\":\" ( 2, 16 ) \"}"
                    }
                  },
                  "report_id_3": {
                    "example": {
                      "agentId": "{\"type\":\"in\",\"value\":\" ( '73' ) \"}",
                      "callerNumber": "{\"type\":\"like\",\"value\":\"'%54999909090%'\"}",
                      "date_sub(startTime, interval 3 hour)": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "queueId": "{\"type\":\"in\",\"value\":\" ( 16, 2 ) \"}"
                    }
                  },
                  "report_id_4": {
                    "example": {
                      "Users.id": "{\"type\":\"in\",\"value\":\" ( '73' ) \"}",
                      "callerNumber": "{\"type\":\"like\",\"value\":\"'%54999909090%'\"}",
                      "date_sub(startTime, interval 3 hour)": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "queueId": "{\"type\":\"in\",\"value\":\" ( 2, 16 ) \"}"
                    }
                  },
                  "report_id_5": {
                    "example": {
                      "agentId": "{\"type\":\"in\",\"value\":\" ( '13' ) \"}",
                      "callerNumber": "{\"type\":\"like\",\"value\":\"'%54999909090%'\"}",
                      "date_sub(startTime, interval 3 hour)": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "queueId": "{\"type\":\"in\",\"value\":\" ( 2, 16 ) \"}"
                    }
                  },
                  "report_id_6": {
                    "example": {
                      "agentId": "{\"type\":\"in\",\"value\":\" ( '73' ) \"}",
                      "callerNumber": "{\"type\":\"like\",\"value\":\"'%54999909090%'\"}",
                      "date_sub(startTime, interval 3 hour)": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "queueId": "{\"type\":\"in\",\"value\":\" ( 2 ) \"}"
                    }
                  },
                  "report_id_7": {
                    "example": {
                      "CONCAT(sessions.data, '12:00:00')": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "calls.queueId": "{\"type\":\"in\",\"value\":\" ( 2, 16 ) \"}",
                      "sessions.userId": "{\"type\":\"in\",\"value\":\" ( '13' ) \"}"
                    }
                  },
                  "report_id_8": {
                    "example": {
                      "DATE_SUB(BreaksRequests.startTime, INTERVAL 3 HOUR)": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "Queues.id": "{\"type\":\"in\",\"value\":\" ( 2, 16 ) \"}",
                      "Users.id": "{\"type\":\"in\",\"value\":\" ( '13' ) \"}"
                    }
                  },
                  "report_id_9": {
                    "example": {
                      "DATE_SUB(dateBegin, INTERVAL 3 HOUR)": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "userId": "{\"type\":\"in\",\"value\":\" ( '13' ) \"}"
                    }
                  },
                  "report_id_21": {
                    "example": {
                      "DATE_SUB(br.startTime, INTERVAL 3 HOUR)": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "Users.id": "{\"type\":\"in\",\"value\":\" ( '13' ) \"}",
                      "breakId": "{\"type\":\"=\",\"value\":[1]}",
                      "q.id": "{\"type\":\"in\",\"value\":\" ( 16 ) \"}"
                    }
                  },
                  "report_id_22": {
                    "example": {
                      "DATE_SUB(ql.startTime, INTERVAL 3 HOUR)": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "q.id": "{\"type\":\"in\",\"value\":\" ( 2, 16 ) \"}",
                      "ql.callerNumber": "{\"type\":\"like\",\"value\":\"'%54999909090%'\"}"
                    }
                  },
                  "report_id_23": {
                    "example": {
                      "shcl.callerNumber": "{\"type\":\"like\",\"value\":\"'%54999909090%'\"}",
                      "shcl.createdAt": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "shcl.ivrId": "{\"type\":\"=\",\"value\":[5]}",
                      "shcl.queueId": "{\"type\":\"in\",\"value\":\" ( 2, 16 ) \"}"
                    }
                  },
                  "report_id_25": {
                    "example": {
                      "DATE_SUB(qa.loginAt, INTERVAL 3 HOUR)": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "Users.id": "{\"type\":\"in\",\"value\":\" ( '73' ) \"}",
                      "q.id": "{\"type\":\"in\",\"value\":\" ( 2, 16 ) \"}"
                    }
                  },
                  "report_id_29": {
                    "example": {
                      "c.start": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "q.id": "{\"type\":\"in\",\"value\":\" ( 2 ) \"}",
                      "shcl.serviceHourId": "{\"type\":\"=\",\"value\":[1]}"
                    }
                  },
                  "report_id_44": {
                    "example": {
                      "Users.id": "{\"type\":\"in\",\"value\":\" ( '73' ) \"}",
                      "date_sub(startTime, interval 3 hour)": [
                        "{\"type\":\">=\",\"value\":\"'2022-07-01 00:00:00'\"}",
                        "{\"type\":\"<=\",\"value\":\"'2022-07-07 03:00:00'\"}"
                      ],
                      "queueId": "{\"type\":\"in\",\"value\":\" ( 2, 16 ) \"}"
                    }
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {}
              }
            },
            "400": {
              "$ref": "#/components/badRequest"
            }
          }
        }
      }
    },
    "schemas": {
      "clickToCall": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "name": {
            "type": "string",
            "example": "clickToCall"
          },
          "configuration": {
            "$ref": "#/components/clickToCall"
          },
          "createdBy": {
            "type": "string",
            "example": "native"
          },
          "updatedBy": {
            "type": "string",
            "example": "native"
          },
          "createdAt": {
            "type": "datetime",
            "example": "2021-02-22T12:05:49.000Z"
          },
          "updatedAt": {
            "type": "datetime",
            "example": "2021-02-22T14:34:18.000Z"
          }
        },
        "required": [
          "id",
          "name",
          "createdAt",
          "updatedAt"
        ]
      },
      "trunks": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "name": {
            "type": "string",
            "example": "Trunk Name"
          },
          "enabled": {
            "type": "boolean",
            "example": "true"
          },
          "type": {
            "type": "string",
            "example": "SIP"
          },
          "user": {
            "type": "string",
            "example": "goip"
          },
          "secret": {
            "type": "string",
            "example": "@123@"
          },
          "ip": {
            "type": "string",
            "example": "10.0.0.3"
          },
          "codec1": {
            "type": "string",
            "example": "ulaw"
          },
          "codec2": {
            "type": "string",
            "example": "alaw"
          },
          "codec3": {
            "type": "string",
            "example": "GSM"
          },
          "codec4": {
            "type": "string",
            "example": "G729"
          },
          "extras": {
            "type": "string",
            "example": ""
          },
          "board": {
            "type": "integer",
            "example": ""
          },
          "channels": {
            "type": "string",
            "example": ""
          },
          "allocation": {
            "type": "string",
            "example": ""
          },
          "callLimit": {
            "type": "integer",
            "example": 10
          },
          "minutesLimit": {
            "type": "integer",
            "example": 5
          },
          "minutesLimitDay": {
            "type": "integer",
            "example": 150
          },
          "authType": {
            "type": "string",
            "example": "IP"
          },
          "callerId": {
            "type": "string",
            "example": "100"
          },
          "sipRegStatus": {
            "type": "string",
            "example": "Registered"
          },
          "tech": {
            "type": "string",
            "example": ""
          },
          "fromdomain": {
            "type": "string",
            "example": ""
          },
          "createdAt": {
            "type": "datetime",
            "example": "2021-02-19T14:07:04.000Z"
          },
          "updatedAt": {
            "type": "datetime",
            "example": "2021-02-19T14:07:04.000Z"
          },
          "createdBy": {
            "type": "string",
            "example": "native"
          },
          "updatedBy": {
            "type": "string",
            "example": "ana"
          }
        },
        "required": [
          "name",
          "type"
        ]
      },
      "peers": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "username": {
            "type": "integer",
            "example": "100"
          },
          "secret": {
            "type": "string",
            "example": "Native.100"
          },
          "name": {
            "type": "string",
            "example": "Peer name"
          },
          "email": {
            "type": "string",
            "example": "native@native.com.br"
          },
          "callCenter": {
            "type": "boolean",
            "example": "true"
          },
          "hideOnAgenda": {
            "type": "boolean",
            "example": "true"
          },
          "sipRegStatus": {
            "type": "string",
            "example": "UNAVAILABLE"
          },
          "sipIp": {
            "type": "string",
            "example": ""
          },
          "iaxRegStatus": {
            "type": "string",
            "example": ""
          },
          "iaxIp": {
            "type": "string",
            "example": ""
          },
          "status": {
            "type": "enum",
            "example": "online"
          },
          "profileId": {
            "type": "integer",
            "example": 1
          },
          "categoryId": {
            "type": "integer",
            "example": 1
          },
          "costCenterId": {
            "type": "integer",
            "example": 1
          },
          "newVoicemail": {
            "type": "boolean",
            "example": true
          },
          "dynamic": {
            "type": "boolean",
            "example": true
          },
          "webrtc": {
            "type": "boolean",
            "example": true
          },
          "provisioning": {
            "type": "boolean",
            "example": true
          },
          "deviceBrand": {
            "type": "string",
            "example": "Khomp"
          },
          "deviceModel": {
            "type": "string",
            "example": "Khomp"
          },
          "deviceMac": {
            "type": "string",
            "example": "12345@JdHs"
          },
          "createdAt": {
            "type": "datetime",
            "example": "2021-02-19T14:07:04.000Z"
          },
          "updatedAt": {
            "type": "datetime",
            "example": "2021-02-19T14:07:04.000Z"
          },
          "createdBy": {
            "type": "string",
            "example": "native"
          },
          "updatedBy": {
            "type": "string",
            "example": "ana"
          }
        },
        "required": [
          "id",
          "username",
          "secret",
          "name",
          "callCenter",
          "hideOnAgenda",
          "dynamic",
          "webrtc",
          "provisioning"
        ]
      },
      "categories": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "name": {
            "type": "string",
            "example": "New Categorie"
          },
          "description": {
            "type": "string",
            "example": "Test Categorie"
          },
          "nat": {
            "default": "false",
            "type": "boolean",
            "example": "true"
          },
          "voicemail": {
            "default": "false",
            "type": "boolean",
            "example": "false"
          },
          "lock": {
            "default": "false",
            "type": "boolean",
            "example": "false"
          },
          "followme": {
            "default": "false",
            "type": "boolean",
            "example": "true"
          },
          "passwordCall": {
            "default": "false",
            "type": "boolean",
            "example": "true"
          },
          "monitor": {
            "default": "no",
            "type": "string",
            "example": "all"
          },
          "callLimit": {
            "default": 1,
            "type": "integer",
            "example": 10
          },
          "timeout": {
            "default": 60,
            "type": "integer",
            "example": 60
          },
          "timeRestrictionStart": {
            "type": "string",
            "example": ""
          },
          "timeRestrictionEnd": {
            "type": "string",
            "example": ""
          },
          "overflowExtension": {
            "type": "integer",
            "example": 1
          },
          "statusChange": {
            "type": "boolean",
            "example": "false"
          },
          "createdAt": {
            "type": "datetime",
            "example": "2021-02-19T14:07:04.000Z"
          },
          "updatedAt": {
            "type": "datetime",
            "example": "2021-02-19T14:07:04.000Z"
          },
          "createdBy": {
            "type": "string",
            "example": "native"
          },
          "updatedBy": {
            "type": "string",
            "example": "ana"
          }
        },
        "required": [
          "id",
          "name",
          "nat",
          "voicemail",
          "lock",
          "passwordCall",
          "monitor",
          "callLimit",
          "timeout"
        ]
      },
      "costCenters": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "name": {
            "type": "string",
            "example": "New Cost Center"
          },
          "description": {
            "type": "text",
            "example": "Cost Center Default"
          },
          "createdAt": {
            "type": "datetime",
            "example": "2021-02-19T14:07:04.000Z"
          },
          "updatedAt": {
            "type": "datetime",
            "example": "2021-02-19T14:07:04.000Z"
          },
          "createdBy": {
            "type": "string",
            "example": "native"
          },
          "updatedBy": {
            "type": "string",
            "example": "ana"
          }
        },
        "required": [
          "id",
          "name"
        ]
      },
      "groups": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "name": {
            "type": "string",
            "example": "New Group"
          },
          "description": {
            "type": "text",
            "example": "Group Default"
          },
          "createdAt": {
            "type": "datetime",
            "example": "2021-02-19T14:07:04.000Z"
          },
          "updatedAt": {
            "type": "datetime",
            "example": "2021-02-19T14:07:04.000Z"
          },
          "createdBy": {
            "type": "string",
            "example": "native"
          },
          "updatedBy": {
            "type": "string",
            "example": "ana"
          }
        },
        "required": [
          "id",
          "name"
        ]
      },
      "profiles": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "name": {
            "type": "string",
            "example": "Profile Native"
          },
          "description": {
            "type": "text",
            "example": "Profile Default"
          },
          "createdAt": {
            "type": "datetime",
            "example": "2021-02-19T14:07:04.000Z"
          },
          "updatedAt": {
            "type": "datetime",
            "example": "2021-02-19T14:07:04.000Z"
          },
          "createdBy": {
            "type": "string",
            "example": "native"
          },
          "updatedBy": {
            "type": "string",
            "example": "ana"
          }
        },
        "required": [
          "id",
          "name"
        ]
      },
      "queues": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": "1"
          },
          "name": {
            "type": "string",
            "example": "Admin"
          },
          "description": {
            "type": "text",
            "example": "Fila Admin"
          },
          "strategy": {
            "type": "enum",
            "example": "rrmemory"
          },
          "ringTimeout": {
            "type": "integer",
            "example": "16"
          },
          "wrapUptime": {
            "type": "integer",
            "example": "12"
          },
          "ringTone": {
            "type": "enum",
            "example": "never"
          },
          "announceFrequency": {
            "type": "integer",
            "example": "10"
          },
          "announceHoldtime": {
            "type": "boolean",
            "example": "true"
          },
          "announcePosition": {
            "type": "boolean",
            "example": "true"
          },
          "ringInUse": {
            "type": "boolean",
            "example": "true"
          },
          "monitor": {
            "type": "boolean",
            "example": "false"
          },
          "monitorInherit": {
            "type": "boolean",
            "example": "false"
          },
          "extension": {
            "type": "string",
            "example": "200"
          },
          "joinEmpty": {
            "type": "boolean",
            "example": "false"
          },
          "overflowExtension": {
            "type": "string",
            "example": "201"
          },
          "queueTimeout": {
            "type": "interger",
            "example": "60"
          },
          "queueMaxSize": {
            "type": "integer",
            "example": "10"
          },
          "callcenter": {
            "type": "boolean",
            "example": "true"
          },
          "periodicAnnounce": {
            "type": "boolean",
            "example": "10"
          },
          "periodicAnnounceAudio": {
            "type": "string",
            "example": "queue-periodic-announce"
          },
          "periodicAnnounceFrequency": {
            "type": "integer",
            "example": "10"
          },
          "iFrameIncoming": {
            "type": "string",
            "example": "teste"
          },
          "iFrameOutgoing": {
            "type": "string",
            "example": "teste"
          },
          "callerId": {
            "type": "string",
            "example": "100"
          },
          "weight": {
            "type": "integer",
            "example": "10"
          },
          "peersOrder": {
            "type": "string",
            "example": "7,39"
          },
          "customRulesAfterOrder": {
            "type": "string",
            "example": "80"
          },
          "customRulesBeforeOrder": {
            "type": "string",
            "example": "78"
          },
          "enableCallDownload": {
            "type": "boolean",
            "example": "false"
          },
          "callbackLost": {
            "type": "boolean",
            "example": "true"
          },
          "callbackByDigit": {
            "type": "boolean",
            "example": "true"
          },
          "callbackProfile": {
            "type": "integer",
            "example": "10"
          },
          "callbackWaitTime": {
            "type": "integer",
            "example": "10"
          },
          "createdBy": {
            "type": "string",
            "example": "native"
          },
          "updatedBy": {
            "type": "string",
            "example": "native10"
          },
          "createdAt": {
            "type": "datetime",
            "example": "2020-09-23T16:30:26.000Z"
          },
          "updatedAt": {
            "type": "datetime",
            "example": "2021-10-07T12:37:02.000Z"
          },
          "monitoringFormId": {
            "type": "integer",
            "example": "1"
          },
          "mohId": {
            "type": "integer",
            "example": "5"
          }
        },
        "required": [
          "name",
          "extension",
          "ringTone"
        ]
      }
    },
    "components": {
      "badRequest": {
        "description": "Bad Request"
      },
      "unauthorized": {
        "description": "Unauthorized Request"
      },
      "clickToCall": {
        "type": "json",
        "properties": {
          "authenticate": {
            "type": "boolean",
            "example": true
          },
          "srcCondition": {
            "type": "boolean",
            "example": true
          },
          "dstCondition": {
            "type": "boolean",
            "example": true
          },
          "dstVar": {
            "type": "string",
            "example": "destino",
            "description": "Destination variable"
          },
          "srcVar": {
            "type": "string",
            "example": "origem",
            "description": "Source variable"
          },
          "dstConditions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "dstCondIvr": {
                  "type": "integer",
                  "example": "7",
                  "description": "Ivr ID"
                },
                "dstCondPeer": {
                  "type": "integer",
                  "example": "11",
                  "description": "Peer ID"
                },
                "dstCondQueue": {
                  "type": "integer",
                  "example": "4",
                  "description": "Queue ID"
                },
                "dstCondType": {
                  "type": "string",
                  "example": "'ivr' or 'peer' or 'queue'"
                },
                "dstCondVal": {
                  "type": "string",
                  "example": "1002"
                }
              }
            }
          },
          "srcConditions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "srcCondIvr": {
                  "type": "integer",
                  "example": "7",
                  "description": "Ivr ID"
                },
                "srcCondPeer": {
                  "type": "integer",
                  "example": "11",
                  "description": "Peer ID"
                },
                "srcCondQueue": {
                  "type": "integer",
                  "example": "4",
                  "description": "Queue ID"
                },
                "srcCondType": {
                  "type": "string",
                  "example": "'ivr' or 'peer' or 'queue'"
                },
                "srcCondVal": {
                  "type": "string",
                  "example": "1002"
                }
              }
            }
          }
        }
      },
      "unprocessableEntity": {
        "description": "Unprocessable Entity",
        "content": {
          "application/json": {
            "schema": {},
            "example": {
              "error": "Incorrectly reported data."
            }
          }
        }
      },
      "schemas": {
        "ClickToCall": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "example": 1
            },
            "name": {
              "type": "string",
              "example": "clickToCall"
            },
            "configuration": {
              "$ref": "#/components/clickToCall"
            },
            "createdBy": {
              "type": "string",
              "example": "native"
            },
            "updatedBy": {
              "type": "string",
              "example": "native"
            },
            "createdAt": {
              "type": "datetime",
              "example": "2021-02-22T12:05:49.000Z"
            },
            "updatedAt": {
              "type": "datetime",
              "example": "2021-02-22T14:34:18.000Z"
            }
          },
          "required": [
            "id",
            "name",
            "createdAt",
            "updatedAt"
          ]
        },
        "Trunks": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "example": 1
            },
            "name": {
              "type": "string",
              "example": "Trunk Name"
            },
            "enabled": {
              "type": "boolean",
              "example": "true"
            },
            "type": {
              "type": "string",
              "example": "SIP"
            },
            "user": {
              "type": "string",
              "example": "goip"
            },
            "secret": {
              "type": "string",
              "example": "@123@"
            },
            "ip": {
              "type": "string",
              "example": "10.0.0.3"
            },
            "codec1": {
              "type": "string",
              "example": "ulaw"
            },
            "codec2": {
              "type": "string",
              "example": "alaw"
            },
            "codec3": {
              "type": "string",
              "example": "GSM"
            },
            "codec4": {
              "type": "string",
              "example": "G729"
            },
            "extras": {
              "type": "string",
              "example": ""
            },
            "board": {
              "type": "integer",
              "example": ""
            },
            "channels": {
              "type": "string",
              "example": ""
            },
            "allocation": {
              "type": "string",
              "example": ""
            },
            "callLimit": {
              "type": "integer",
              "example": 10
            },
            "minutesLimit": {
              "type": "integer",
              "example": 5
            },
            "minutesLimitDay": {
              "type": "integer",
              "example": 150
            },
            "authType": {
              "type": "string",
              "example": "IP"
            },
            "callerId": {
              "type": "string",
              "example": "100"
            },
            "sipRegStatus": {
              "type": "string",
              "example": "Registered"
            },
            "tech": {
              "type": "string",
              "example": ""
            },
            "fromdomain": {
              "type": "string",
              "example": ""
            },
            "createdAt": {
              "type": "datetime",
              "example": "2021-02-19T14:07:04.000Z"
            },
            "updatedAt": {
              "type": "datetime",
              "example": "2021-02-19T14:07:04.000Z"
            },
            "createdBy": {
              "type": "string",
              "example": "native"
            },
            "updatedBy": {
              "type": "string",
              "example": "ana"
            }
          },
          "required": [
            "name",
            "type"
          ]
        },
        "Peers": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "example": 1
            },
            "username": {
              "type": "integer",
              "example": "100"
            },
            "secret": {
              "type": "string",
              "example": "Native.100"
            },
            "name": {
              "type": "string",
              "example": "Peer name"
            },
            "email": {
              "type": "string",
              "example": "native@native.com.br"
            },
            "callCenter": {
              "type": "boolean",
              "example": "true"
            },
            "hideOnAgenda": {
              "type": "boolean",
              "example": "true"
            },
            "sipRegStatus": {
              "type": "string",
              "example": "UNAVAILABLE"
            },
            "sipIp": {
              "type": "string",
              "example": ""
            },
            "iaxRegStatus": {
              "type": "string",
              "example": ""
            },
            "iaxIp": {
              "type": "string",
              "example": ""
            },
            "status": {
              "type": "enum",
              "example": "online"
            },
            "profileId": {
              "type": "integer",
              "example": 1
            },
            "categoryId": {
              "type": "integer",
              "example": 1
            },
            "costCenterId": {
              "type": "integer",
              "example": 1
            },
            "newVoicemail": {
              "type": "boolean",
              "example": true
            },
            "dynamic": {
              "type": "boolean",
              "example": true
            },
            "webrtc": {
              "type": "boolean",
              "example": true
            },
            "provisioning": {
              "type": "boolean",
              "example": true
            },
            "deviceBrand": {
              "type": "string",
              "example": "Khomp"
            },
            "deviceModel": {
              "type": "string",
              "example": "Khomp"
            },
            "deviceMac": {
              "type": "string",
              "example": "12345@JdHs"
            },
            "createdAt": {
              "type": "datetime",
              "example": "2021-02-19T14:07:04.000Z"
            },
            "updatedAt": {
              "type": "datetime",
              "example": "2021-02-19T14:07:04.000Z"
            },
            "createdBy": {
              "type": "string",
              "example": "native"
            },
            "updatedBy": {
              "type": "string",
              "example": "ana"
            }
          },
          "required": [
            "id",
            "username",
            "secret",
            "name",
            "callCenter",
            "hideOnAgenda",
            "dynamic",
            "webrtc",
            "provisioning"
          ]
        },
        "Categories": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "example": 1
            },
            "name": {
              "type": "string",
              "example": "New Categorie"
            },
            "description": {
              "type": "string",
              "example": "Test Categorie"
            },
            "nat": {
              "default": "false",
              "type": "boolean",
              "example": "true"
            },
            "voicemail": {
              "default": "false",
              "type": "boolean",
              "example": "false"
            },
            "lock": {
              "default": "false",
              "type": "boolean",
              "example": "false"
            },
            "followme": {
              "default": "false",
              "type": "boolean",
              "example": "true"
            },
            "passwordCall": {
              "default": "false",
              "type": "boolean",
              "example": "true"
            },
            "monitor": {
              "default": "no",
              "type": "string",
              "example": "all"
            },
            "callLimit": {
              "default": 1,
              "type": "integer",
              "example": 10
            },
            "timeout": {
              "default": 60,
              "type": "integer",
              "example": 60
            },
            "timeRestrictionStart": {
              "type": "string",
              "example": ""
            },
            "timeRestrictionEnd": {
              "type": "string",
              "example": ""
            },
            "overflowExtension": {
              "type": "integer",
              "example": 1
            },
            "statusChange": {
              "type": "boolean",
              "example": "false"
            },
            "createdAt": {
              "type": "datetime",
              "example": "2021-02-19T14:07:04.000Z"
            },
            "updatedAt": {
              "type": "datetime",
              "example": "2021-02-19T14:07:04.000Z"
            },
            "createdBy": {
              "type": "string",
              "example": "native"
            },
            "updatedBy": {
              "type": "string",
              "example": "ana"
            }
          },
          "required": [
            "id",
            "name",
            "nat",
            "voicemail",
            "lock",
            "passwordCall",
            "monitor",
            "callLimit",
            "timeout"
          ]
        },
        "CostCenters": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "example": 1
            },
            "name": {
              "type": "string",
              "example": "New Cost Center"
            },
            "description": {
              "type": "text",
              "example": "Cost Center Default"
            },
            "createdAt": {
              "type": "datetime",
              "example": "2021-02-19T14:07:04.000Z"
            },
            "updatedAt": {
              "type": "datetime",
              "example": "2021-02-19T14:07:04.000Z"
            },
            "createdBy": {
              "type": "string",
              "example": "native"
            },
            "updatedBy": {
              "type": "string",
              "example": "ana"
            }
          },
          "required": [
            "id",
            "name"
          ]
        },
        "Groups": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "example": 1
            },
            "name": {
              "type": "string",
              "example": "New Group"
            },
            "description": {
              "type": "text",
              "example": "Group Default"
            },
            "createdAt": {
              "type": "datetime",
              "example": "2021-02-19T14:07:04.000Z"
            },
            "updatedAt": {
              "type": "datetime",
              "example": "2021-02-19T14:07:04.000Z"
            },
            "createdBy": {
              "type": "string",
              "example": "native"
            },
            "updatedBy": {
              "type": "string",
              "example": "ana"
            }
          },
          "required": [
            "id",
            "name"
          ]
        },
        "Profiles": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "example": 1
            },
            "name": {
              "type": "string",
              "example": "Profile Native"
            },
            "description": {
              "type": "text",
              "example": "Profile Default"
            },
            "createdAt": {
              "type": "datetime",
              "example": "2021-02-19T14:07:04.000Z"
            },
            "updatedAt": {
              "type": "datetime",
              "example": "2021-02-19T14:07:04.000Z"
            },
            "createdBy": {
              "type": "string",
              "example": "native"
            },
            "updatedBy": {
              "type": "string",
              "example": "ana"
            }
          },
          "required": [
            "id",
            "name"
          ]
        },
        "Queues": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "example": "1"
            },
            "name": {
              "type": "string",
              "example": "Admin"
            },
            "description": {
              "type": "text",
              "example": "Fila Admin"
            },
            "strategy": {
              "type": "enum",
              "example": "rrmemory"
            },
            "ringTimeout": {
              "type": "integer",
              "example": "16"
            },
            "wrapUptime": {
              "type": "integer",
              "example": "12"
            },
            "ringTone": {
              "type": "enum",
              "example": "never"
            },
            "announceFrequency": {
              "type": "integer",
              "example": "10"
            },
            "announceHoldtime": {
              "type": "boolean",
              "example": "true"
            },
            "announcePosition": {
              "type": "boolean",
              "example": "true"
            },
            "ringInUse": {
              "type": "boolean",
              "example": "true"
            },
            "monitor": {
              "type": "boolean",
              "example": "false"
            },
            "monitorInherit": {
              "type": "boolean",
              "example": "false"
            },
            "extension": {
              "type": "string",
              "example": "200"
            },
            "joinEmpty": {
              "type": "boolean",
              "example": "false"
            },
            "overflowExtension": {
              "type": "string",
              "example": "201"
            },
            "queueTimeout": {
              "type": "interger",
              "example": "60"
            },
            "queueMaxSize": {
              "type": "integer",
              "example": "10"
            },
            "callcenter": {
              "type": "boolean",
              "example": "true"
            },
            "periodicAnnounce": {
              "type": "boolean",
              "example": "10"
            },
            "periodicAnnounceAudio": {
              "type": "string",
              "example": "queue-periodic-announce"
            },
            "periodicAnnounceFrequency": {
              "type": "integer",
              "example": "10"
            },
            "iFrameIncoming": {
              "type": "string",
              "example": "teste"
            },
            "iFrameOutgoing": {
              "type": "string",
              "example": "teste"
            },
            "callerId": {
              "type": "string",
              "example": "100"
            },
            "weight": {
              "type": "integer",
              "example": "10"
            },
            "peersOrder": {
              "type": "string",
              "example": "7,39"
            },
            "customRulesAfterOrder": {
              "type": "string",
              "example": "80"
            },
            "customRulesBeforeOrder": {
              "type": "string",
              "example": "78"
            },
            "enableCallDownload": {
              "type": "boolean",
              "example": "false"
            },
            "callbackLost": {
              "type": "boolean",
              "example": "true"
            },
            "callbackByDigit": {
              "type": "boolean",
              "example": "true"
            },
            "callbackProfile": {
              "type": "integer",
              "example": "10"
            },
            "callbackWaitTime": {
              "type": "integer",
              "example": "10"
            },
            "createdBy": {
              "type": "string",
              "example": "native"
            },
            "updatedBy": {
              "type": "string",
              "example": "native10"
            },
            "createdAt": {
              "type": "datetime",
              "example": "2020-09-23T16:30:26.000Z"
            },
            "updatedAt": {
              "type": "datetime",
              "example": "2021-10-07T12:37:02.000Z"
            },
            "monitoringFormId": {
              "type": "integer",
              "example": "1"
            },
            "mohId": {
              "type": "integer",
              "example": "5"
            }
          },
          "required": [
            "name",
            "extension",
            "ringTone"
          ]
        }
      },
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      }
    }
  },
  "customOptions": {
    "supportedSubmitMethods": []
  }
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}