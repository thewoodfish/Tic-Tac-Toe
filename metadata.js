// Copyright (c) 2023 Algorealm, Inc.

export function metadata() {
    return {
        "source": {
            "hash": "0x01e5c0cfe3e504beab4356e3b297e57d701533403b774754d8e89697f79726f0",
            "language": "ink! 4.2.1",
            "compiler": "rustc 1.69.0",
            "build_info": {
                "build_mode": "Debug",
                "cargo_contract_version": "2.0.0-rc",
                "rust_toolchain": "stable-aarch64-apple-darwin",
                "wasm_opt_settings": {
                    "keep_debug_symbols": false,
                    "optimization_passes": "Z"
                }
            }
        },
        "contract": {
            "name": "db_contract",
            "version": "0.1.0",
            "authors": [
                "Algorealm hello@algorealm.org"
            ]
        },
        "spec": {
            "constructors": [
                {
                    "args": [],
                    "default": false,
                    "docs": [
                        "Constructor that initializes the contract storage"
                    ],
                    "label": "new",
                    "payable": false,
                    "returnType": {
                        "displayName": [
                            "ink_primitives",
                            "ConstructorResult"
                        ],
                        "type": 3
                    },
                    "selector": "0x9bae9d5e"
                }
            ],
            "docs": [],
            "environment": {
                "accountId": {
                    "displayName": [
                        "AccountId"
                    ],
                    "type": 9
                },
                "balance": {
                    "displayName": [
                        "Balance"
                    ],
                    "type": 11
                },
                "blockNumber": {
                    "displayName": [
                        "BlockNumber"
                    ],
                    "type": 14
                },
                "chainExtension": {
                    "displayName": [
                        "ChainExtension"
                    ],
                    "type": 15
                },
                "hash": {
                    "displayName": [
                        "Hash"
                    ],
                    "type": 12
                },
                "maxEventTopics": 4,
                "timestamp": {
                    "displayName": [
                        "Timestamp"
                    ],
                    "type": 13
                }
            },
            "events": [],
            "lang_error": {
                "displayName": [
                    "ink",
                    "LangError"
                ],
                "type": 5
            },
            "messages": [
                {
                    "args": [
                        {
                            "label": "did",
                            "type": {
                                "displayName": [
                                    "DID"
                                ],
                                "type": 1
                            }
                        },
                        {
                            "label": "hashtable_cid",
                            "type": {
                                "displayName": [
                                    "CID"
                                ],
                                "type": 1
                            }
                        },
                        {
                            "label": "auth_material",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 1
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " Creates an account on Samaritan OS"
                    ],
                    "label": "new_account",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 3
                    },
                    "selector": "0x6030efe9"
                },
                {
                    "args": [
                        {
                            "label": "did",
                            "type": {
                                "displayName": [
                                    "DID"
                                ],
                                "type": 1
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " Checks if a DID exists"
                    ],
                    "label": "check_did_existence",
                    "mutates": false,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 6
                    },
                    "selector": "0x3c5089b2"
                },
                {
                    "args": [
                        {
                            "label": "addr",
                            "type": {
                                "displayName": [
                                    "Multiaddr"
                                ],
                                "type": 1
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " Adds your network address to the list of nodes using FIFO.",
                        " This helps us eventuallu remove nodes that may exit without the proper bookkeeping"
                    ],
                    "label": "add_address",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 3
                    },
                    "selector": "0x71cc798d"
                },
                {
                    "args": [
                        {
                            "label": "addr",
                            "type": {
                                "displayName": [
                                    "Multiaddr"
                                ],
                                "type": 1
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " Remove node address from bootnodes"
                    ],
                    "label": "remove_address",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 3
                    },
                    "selector": "0xdca7a60f"
                },
                {
                    "args": [],
                    "default": false,
                    "docs": [
                        " Retrieves the list of bootnodes available"
                    ],
                    "label": "get_node_addresses",
                    "mutates": false,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 8
                    },
                    "selector": "0x06d0512d"
                },
                {
                    "args": [
                        {
                            "label": "did",
                            "type": {
                                "displayName": [
                                    "DID"
                                ],
                                "type": 1
                            }
                        },
                        {
                            "label": "auth_material",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 1
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " Retrieves the hashtable CID of an account"
                    ],
                    "label": "get_account_ht_cid",
                    "mutates": false,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 8
                    },
                    "selector": "0x8264b180"
                },
                {
                    "args": [
                        {
                            "label": "did",
                            "type": {
                                "displayName": [
                                    "DID"
                                ],
                                "type": 1
                            }
                        },
                        {
                            "label": "ht_cid",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 1
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " Updates the hashtable CID of an account"
                    ],
                    "label": "update_account_ht_cid",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 3
                    },
                    "selector": "0x6410db25"
                },
                {
                    "args": [
                        {
                            "label": "did",
                            "type": {
                                "displayName": [
                                    "DID"
                                ],
                                "type": 1
                            }
                        },
                        {
                            "label": "addr",
                            "type": {
                                "displayName": [
                                    "Multiaddr"
                                ],
                                "type": 1
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " Subscribe to join nodes supporting application"
                    ],
                    "label": "subscribe_node",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 3
                    },
                    "selector": "0xbaa1d335"
                },
                {
                    "args": [
                        {
                            "label": "did",
                            "type": {
                                "displayName": [
                                    "DID"
                                ],
                                "type": 1
                            }
                        },
                        {
                            "label": "address",
                            "type": {
                                "displayName": [
                                    "Multiaddr"
                                ],
                                "type": 1
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " Stop supporting application"
                    ],
                    "label": "unsubscribe_node",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 3
                    },
                    "selector": "0x14e57a7d"
                },
                {
                    "args": [
                        {
                            "label": "did",
                            "type": {
                                "displayName": [
                                    "DID"
                                ],
                                "type": 1
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " Get all nodes supporting an application"
                    ],
                    "label": "get_subscribers",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 8
                    },
                    "selector": "0x16b7fe74"
                },
                {
                    "args": [
                        {
                            "label": "app_did",
                            "type": {
                                "displayName": [
                                    "DID"
                                ],
                                "type": 1
                            }
                        },
                        {
                            "label": "user_did",
                            "type": {
                                "displayName": [
                                    "DID"
                                ],
                                "type": 1
                            }
                        },
                        {
                            "label": "allow",
                            "type": {
                                "displayName": [
                                    "bool"
                                ],
                                "type": 7
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " Manage the access of an application to a users data space"
                    ],
                    "label": "manage_access",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 3
                    },
                    "selector": "0x9546841b"
                },
                {
                    "args": [
                        {
                            "label": "app_did",
                            "type": {
                                "displayName": [
                                    "DID"
                                ],
                                "type": 1
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " Get all the actors that have denied an application access to their data space"
                    ],
                    "label": "get_blockers",
                    "mutates": false,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 8
                    },
                    "selector": "0x846d3aa6"
                }
            ]
        },
        "storage": {
            "root": {
                "layout": {
                    "struct": {
                        "fields": [
                            {
                                "layout": {
                                    "leaf": {
                                        "key": "0x00000000",
                                        "ty": 0
                                    }
                                },
                                "name": "nodes"
                            },
                            {
                                "layout": {
                                    "root": {
                                        "layout": {
                                            "struct": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "leaf": {
                                                                "key": "0x83da4a4b",
                                                                "ty": 1
                                                            }
                                                        },
                                                        "name": "did_document_uri"
                                                    },
                                                    {
                                                        "layout": {
                                                            "leaf": {
                                                                "key": "0x83da4a4b",
                                                                "ty": 1
                                                            }
                                                        },
                                                        "name": "hashtable_cid"
                                                    },
                                                    {
                                                        "layout": {
                                                            "leaf": {
                                                                "key": "0x83da4a4b",
                                                                "ty": 1
                                                            }
                                                        },
                                                        "name": "auth_material"
                                                    }
                                                ],
                                                "name": "AccountInfo"
                                            }
                                        },
                                        "root_key": "0x83da4a4b"
                                    }
                                },
                                "name": "accounts"
                            },
                            {
                                "layout": {
                                    "root": {
                                        "layout": {
                                            "leaf": {
                                                "key": "0xd55fc865",
                                                "ty": 0
                                            }
                                        },
                                        "root_key": "0xd55fc865"
                                    }
                                },
                                "name": "subscribers"
                            },
                            {
                                "layout": {
                                    "root": {
                                        "layout": {
                                            "leaf": {
                                                "key": "0x9fab782e",
                                                "ty": 0
                                            }
                                        },
                                        "root_key": "0x9fab782e"
                                    }
                                },
                                "name": "restricted"
                            }
                        ],
                        "name": "DbContract"
                    }
                },
                "root_key": "0x00000000"
            }
        },
        "types": [
            {
                "id": 0,
                "type": {
                    "def": {
                        "sequence": {
                            "type": 1
                        }
                    }
                }
            },
            {
                "id": 1,
                "type": {
                    "def": {
                        "sequence": {
                            "type": 2
                        }
                    }
                }
            },
            {
                "id": 2,
                "type": {
                    "def": {
                        "primitive": "u8"
                    }
                }
            },
            {
                "id": 3,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 4
                                        }
                                    ],
                                    "index": 0,
                                    "name": "Ok"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 5
                                        }
                                    ],
                                    "index": 1,
                                    "name": "Err"
                                }
                            ]
                        }
                    },
                    "params": [
                        {
                            "name": "T",
                            "type": 4
                        },
                        {
                            "name": "E",
                            "type": 5
                        }
                    ],
                    "path": [
                        "Result"
                    ]
                }
            },
            {
                "id": 4,
                "type": {
                    "def": {
                        "tuple": []
                    }
                }
            },
            {
                "id": 5,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "index": 1,
                                    "name": "CouldNotReadInput"
                                }
                            ]
                        }
                    },
                    "path": [
                        "ink_primitives",
                        "LangError"
                    ]
                }
            },
            {
                "id": 6,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 7
                                        }
                                    ],
                                    "index": 0,
                                    "name": "Ok"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 5
                                        }
                                    ],
                                    "index": 1,
                                    "name": "Err"
                                }
                            ]
                        }
                    },
                    "params": [
                        {
                            "name": "T",
                            "type": 7
                        },
                        {
                            "name": "E",
                            "type": 5
                        }
                    ],
                    "path": [
                        "Result"
                    ]
                }
            },
            {
                "id": 7,
                "type": {
                    "def": {
                        "primitive": "bool"
                    }
                }
            },
            {
                "id": 8,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 1
                                        }
                                    ],
                                    "index": 0,
                                    "name": "Ok"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 5
                                        }
                                    ],
                                    "index": 1,
                                    "name": "Err"
                                }
                            ]
                        }
                    },
                    "params": [
                        {
                            "name": "T",
                            "type": 1
                        },
                        {
                            "name": "E",
                            "type": 5
                        }
                    ],
                    "path": [
                        "Result"
                    ]
                }
            },
            {
                "id": 9,
                "type": {
                    "def": {
                        "composite": {
                            "fields": [
                                {
                                    "type": 10,
                                    "typeName": "[u8; 32]"
                                }
                            ]
                        }
                    },
                    "path": [
                        "ink_primitives",
                        "types",
                        "AccountId"
                    ]
                }
            },
            {
                "id": 10,
                "type": {
                    "def": {
                        "array": {
                            "len": 32,
                            "type": 2
                        }
                    }
                }
            },
            {
                "id": 11,
                "type": {
                    "def": {
                        "primitive": "u128"
                    }
                }
            },
            {
                "id": 12,
                "type": {
                    "def": {
                        "composite": {
                            "fields": [
                                {
                                    "type": 10,
                                    "typeName": "[u8; 32]"
                                }
                            ]
                        }
                    },
                    "path": [
                        "ink_primitives",
                        "types",
                        "Hash"
                    ]
                }
            },
            {
                "id": 13,
                "type": {
                    "def": {
                        "primitive": "u64"
                    }
                }
            },
            {
                "id": 14,
                "type": {
                    "def": {
                        "primitive": "u32"
                    }
                }
            },
            {
                "id": 15,
                "type": {
                    "def": {
                        "variant": {}
                    },
                    "path": [
                        "ink_env",
                        "types",
                        "NoChainExtension"
                    ]
                }
            }
        ],
        "version": "4"
    }
}