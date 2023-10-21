// Copyright (c) 2023 Algorealm, Inc.

// imports
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import path, { parse } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cors = require("cors");

// static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

// blockchain essentials
import { ApiPromise, WsProvider } from '@polkadot/api';
import { mnemonicGenerate, cryptoWaitReady, blake2AsHex } from '@polkadot/util-crypto';
const { Keyring } = require('@polkadot/keyring');
import { ContractPromise } from '@polkadot/api-contract';

// import SamaritanDB
import { api as client } from 'samaritan-js-sdk';

// local imports
import * as util from "./utility.js";
import * as meta from "./metadata.js";
import * as chain from "./mediator.cjs";

// blockchain config
const wsProvider = new WsProvider('wss://rococo-contracts-rpc.polkadot.io');
const chainApi = await ApiPromise.create({ provider: wsProvider });
const keyring = new Keyring({ type: 'sr25519' });
const contract_addr = "5GpVUDUCJtMcXtwocMuD89JXZ94BNdxhdn3MaqBRXmo5BZFH";
const contract = new ContractPromise(chainApi, meta.metadata(), contract_addr);

// Funded account (ROC)
const MNEMONICS = "dilemma quarter decrease simple climb boring liberty tobacco upper axis neutral suit";
const samDB = keyring.createFromUri(MNEMONICS, 'sr25519');

// Game properties
const gameConfig = {
    keys: "sport final trick plunge wife october indoor spell beach afford valid clarify",
    did: "did:sam:apps:5GWH4sLKB3NB3iKB8e4zcQmouoCbjwF9372Kgo7qgSYbwAGq"
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('', (req, res) => {
    res.render('index', { text: 'This is sparta' });
});

app.get('/generate-id', async (req, res) => {
    // res.status(200).send({
    //     error: false, data: {
    //         mnemonic: "purse any gun express dash rice decide habit capable ticket solid crush",
    //         sam_did: "did:sam:apps:5FbtCYxn7n1ZBcNeg5cZJBYgTHkt8vF8P6VGr79N47ZCuE9W"
    //     }
    // })
    await generateID(res);
});

app.get('/tiktak-auth', (req, res) => {
    res.render('tiktak-auth');
});

app.post('/save-statistics', async (req, res) => {
    await savePlayerStats(req.body, res);
});

app.post('/save-player-details', async (req, res) => {
    await saveGameDetails(req.body, res);
});

app.get('/game', async (req, res) => {
    res.render('game');
});

app.get('/leaderboard', async (req, res) => {
    res.render('leaderboard');
});

app.post('/load-player-score', (req, res) => {
    loadPlayerScore(req.body, res);
});

app.get('/mutate', async (req, res) => {
    res.render('mutate');
});

app.post('/notify-network', (req, res) => {
    makeAccessChange(req.body, res);
});

app.get('/leaderboard2', async (req, res) => {
    res.render('leaderboard2');
});

app.get('/mutate2', async (req, res) => {
    res.render('mutate2');
});

app.get('/leaderboard3', async (req, res) => {
    res.render('leaderboard3');
});

app.get('/thanks', async (req, res) => {
    res.render('thanks');
});

async function makeAccessChange(req, res) {
    // try {
        const user = keyring.createFromUri(req.keys, 'sr25519');

        // check for existence of user and application onchain
        let user_exists = await chain.checkDidExistence(chainApi, contract, samDB, req.userDid);
        let app_exists = await chain.checkDidExistence(chainApi, contract, samDB, req.appDid);

        if (isTrue(user_exists) && isTrue(app_exists)) {
            try {
                await chain.manageAccess(chainApi, contract, user, req.appDid, req.userDid, req.action == "allow" ? true : false)
                    .then(() => res.status(200).send({
                        error: false, data: {
                            msg: "operation successful"
                        }
                    }));
            } catch (error) {
                console.error("Transaction failed:", error);
                res.status(500).send({
                    error: false, data: {
                        msg: error
                    }
                })
            }
        } else {
            // return error
            res.status(500).send({
                error: false,
                data: {
                    msg: "User or application not recognized by the network"
                },
            });
        }
    // } catch (error) {
    //     // catch error 
    //     res.status(500).send({
    //         error: false,
    //         data: {
    //             msg: "An internal error occured. Please try again"
    //         },
    //     });
    // }
}

// load the score of a single user
async function loadPlayerScore(req, res) {
    let dbConn;
    try {
        // Connect to database
        dbConn = await client.connect(gameConfig.did);
        console.log('Connected to SamaritanDB');

        // Fetch player details in parallel
        client.db.get(
            dbConn,
            gameConfig,
            {
                sam_did: req.player_did,
                keys: ["name", "country", "win", "loss", "draw"],
            },
            (result) => {
                let data = {
                    name: result[0],
                    country: result[1],
                    win: result[2],
                    loss: result[3],
                    draw: result[4],
                };

                res.status(200).send({
                    error: false,
                    data,
                });
            },
            () => {
                res.status(500).send({
                    error: true,
                    data: {
                        msg: "Could not complete operation",
                    },
                });
            }
        );
    } catch (error) {
        res.status(500).send({
            error: true,
            data: {
                msg: "Could not complete operation",
            },
        });
    } finally {
        // Close the database connection if it's open
        // if (dbConn) {
        //     dbConn.close();
        // }
    }
}

// save player statistics to database
async function savePlayerStats(req, res) {
    try {
        let dbConn;
        // Connect to database
        dbConn = await client.connect(gameConfig.did);
        console.log('Connected to SamaritanDB');

        // try to write data
        await client.db.get(
            dbConn,
            gameConfig,
            {
                sam_did: req.did,
                keys: [req.status],
            },
            async (result) => {
                console.log(result);
                let value = parseInt(result[0]) + 1;  // the first result value

                // let insert the new stat
                await client.db.insert(
                    dbConn,
                    gameConfig,
                    {
                        sam_did: req.did,
                        keys: [req.status],
                        values: [value]
                    },
                    () => {
                        res.status(200).send({
                            error: false,
                            data: {
                                msg: "write successful"
                            }
                        });
                    },
                    async (dbError) => {
                        res.status(dbError.status).send({
                            error: true,
                            data: {
                                msg: dbError.error
                            }
                        });
                    });
            },
            () => {
                res.status(500).send({
                    error: true,
                    data: {
                        msg: "could not complete operation"
                    }
                });
            }
        );
    } catch (error) {
        // catch error 
        res.status(500).send({
            error: false,
            data: {
                msg: "An internal error occured. Please try again"
            },
        });
    }
}

async function saveGameDetails(req, res) {
    try {
        let dbConn;
        // Connect to database
        dbConn = await client.connect(gameConfig.did);
        console.log('Connected to SamaritanDB');

        // first insert player into list of players in the database
        await client.db.get(
            dbConn,
            gameConfig,
            {
                sam_did: null,
                keys: ["players"],
            },
            async (result) => {
                let players = result[0].split("$$");
                // add new
                if (!players.includes(req.did)) {
                    players.push(req.did);
                }

                await client.db.insert(
                    dbConn,
                    gameConfig,
                    {
                        sam_did: null,
                        keys: ["players"],
                        values: [players.join("$$")]
                    },
                    async () => {
                        // try to write data
                        await client.db.insert(
                            dbConn,
                            gameConfig,
                            {
                                sam_did: req.did,
                                keys: ["name", "country", "win", "loss", "draw"],
                                values: [req.name, req.country, "0", "0", "0"]
                            },
                            () => {
                                res.status(200).send({
                                    error: false,
                                    data: {
                                        msg: "write successful"
                                    }
                                })
                            },
                            async (dbError) => {
                                res.status(dbError.status).send({
                                    error: true,
                                    data: {
                                        msg: dbError.error
                                    }
                                });
                            });
                    },
                    async (dbError) => {
                        res.status(dbError.status).send({
                            error: true,
                            data: {
                                msg: dbError.error
                            }
                        });
                    }
                );

            },
            async (dbError) => {
                console.log(dbError);
                dbError = JSON.parse(dbError);
                if (dbError.status == 404) {
                    // insert the new entry
                    await client.db.insert(
                        dbConn,
                        gameConfig,
                        {
                            sam_did: null,
                            keys: ["players"],
                            values: [req.did]
                        },
                        async () => {
                            // try to get the data first, if it doesn't exist, create new
                            await client.db.get(
                                dbConn,
                                gameConfig,
                                {
                                    sam_did: req.did,      // writing to the games own data-space
                                    keys: ["win", "loss", "draw"],
                                },
                                () => { },
                                async (_) => {
                                    // try to write data
                                    await client.db.insert(
                                        dbConn,
                                        gameConfig,
                                        {
                                            sam_did: req.did,
                                            keys: ["name", "country", "win", "loss", "draw"],
                                            values: [req.name, req.country, "0", "0", "0"]
                                        },
                                        () => {
                                            res.status(200).send({
                                                error: false,
                                                data: {
                                                    msg: "write successful"
                                                }
                                            })
                                        },
                                        async (dbError) => {
                                            res.status(dbError.status).send({
                                                error: true,
                                                data: {
                                                    msg: dbError.error
                                                }
                                            });
                                        });
                                });
                        },
                        async (dbError) => {
                            res.status(dbError.status).send({
                                error: true,
                                data: {
                                    msg: dbError.error
                                }
                            });
                        }
                    );
                } else {
                    res.status(500).send({
                        error: true,
                        data: {
                            msg: dbError.error
                        }
                    });
                }
            }
        );
    } catch (error) {
        // catch error 
        res.status(500).send({
            error: false,
            data: {
                msg: "An internal error occured. Please try again"
            },
        });
    }
}

async function generateID(res) {
    // first generate the mnemonics
    const mnemonic = mnemonicGenerate();
    const user = keyring.createFromUri(mnemonic, 'sr25519');
    const type = "person";  // who we're creating a DID for

    // generate the samaritan DID
    const sam_did = util.generateDID(type, user.address);

    // generate the auth material from the hashed keys
    const signature = blake2AsHex(mnemonic.replaceAll(" ", "_"));
    console.log(signature);

    try {
        await chain.createID(chainApi, contract, samDB, sam_did, "elixir", signature)
            .then(() => res.status(200).send({
                error: false, data: {
                    mnemonic, sam_did
                }
            }));
    } catch (error) {
        console.error("Transaction failed:", error);
        res.status(500).send({
            error: false, data: {
                msg: error
            }
        })
    }
}


// check the boolean that is returned from the contract
function isTrue(jsonResponse) {
    // Check if the JSON object has the structure { Ok: { flags: [], data: '0x0001' } }
    if (
        jsonResponse &&
        jsonResponse.Ok &&
        jsonResponse.Ok.data &&
        jsonResponse.Ok.data === '0x0001'
    ) {
        return true;
    }
    return false;
}

// listen on port 3000
app.listen(port, () => console.info(`listening on port ${port}`));