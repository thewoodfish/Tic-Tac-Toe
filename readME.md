# Tic-Tac-Toe: A Simple Game to Test SamaritanDB

## About

In this section, we delve into a comprehensive demonstration of an application built upon the robust infrastructure of SamaritanDB. This demonstration showcases the essential components that drive the platform's functionality.

SamaritanDB represents a pioneering database solution engineered to offer internet users unprecedented control and sovereignty over their data within applications hosted on this innovative platform. In this context, we explore a practical application, the Tic-Tac-Toe game, as an example of how SamaritanDB empowers users to take charge of their digital interactions.
For a detailed understanding of SamaritanDB, please visit [the wiki](https://algorealm.gitbook.io/samaritandb).

## How It Works

1. **Generate Your DID**: Start by creating your Decentralized Identifier (DID). This unique identifier is the key to your digital presence on the internet and interactions with applications like the game.

![Generate Your DID](https://github.com/thewoodfish/Tic-Tac-Toe/blob/main/public/img/screenshot-1.png)

![Generate Your DID](https://github.com/thewoodfish/Tic-Tac-Toe/blob/main/public/img/screen-2.png)

2. **Interact With The Game**: Send your DID and other necessary details to the game. All you scored and progress is stored in association to your DID. Your information will be stored in SamaritanDB, ready for action.

![Interact with the game](https://github.com/thewoodfish/Tic-Tac-Toe/blob/main/public/img/screen-3.png)

![Interact with the game](https://github.com/thewoodfish/Tic-Tac-Toe/blob/main/public/img/screen-4.png)

3. **Leaderboard**: After you've submitted your data and played the few game trials, you can keep an eye on your progress through the leaderboard.

![Leaderboards](https://github.com/thewoodfish/Tic-Tac-Toe/blob/main/public/img/screen-5.png)

4. **Deny Access**: Suppose you decide to deny the application access to your data. By submitting a transaction, you block access to your information.

![Deny Access](https://github.com/thewoodfish/Tic-Tac-Toe/blob/main/public/img/screen-6.png)

5. **Data Absence**: Check the leaderboard, and you'll see your data has disappeared. Access denial had an immediate impact.

![Data Absence](https://github.com/thewoodfish/Tic-Tac-Toe/blob/main/public/img/screen-7.png)

6. **Grant Access**: Change your mind and decide to allow access again. Submit a transaction to grant access once more.

![Deny Access](https://github.com/thewoodfish/Tic-Tac-Toe/blob/main/public/img/screen-8.png)

7. **Data Returns**: Visit the leaderboard, and your data is back in the game. It's all about user control and data ownership.

![Deny Access](https://github.com/thewoodfish/Tic-Tac-Toe/blob/main/public/img/screen-9.png)

## Significance

This project demonstrates the potential of user control and ownership over the content and information provided to internet applications and services.

## Talking to SamaritanDB

The application communicates with SamaritanDB through a dedicated library. This integration is vital for seamless data management.

## Database

Although experimental, SamaritanDB serves as a proof of concept for future development. The code provides a foundation for revolutionary ideas. View the code [here](https://github.com/algorealmInc/SamaritanDB).

## Testing

To test the application, follow these steps:

1. Clone the repository.
2. Clone the [SamaritanDB](https://github.com/algorealmInc/SamaritanDB) repository and follow the instructions to run it.
3. Run `npm install`.
4. Open `127.0.0.0.1:3000` in your web browser.
5. Enjoy!

You can view a demo of the game [here](https://algorealm.org/splash.html).

## Contract

SamaritanDB heavily utilizes the ink! smart contract. In Tic-Tac-Toe demonstration, the contract is referenced in specific instances:

1. **Generate DID**: User Decentralized Identifiers (DIDs) and private keys are generated, creating a user account on-chain. A transaction is submitted to the ink! contract to mutate storage.

```js
// JavaScript Code
...
await chain
  .createID(chainApi, contract, samDB, sam_did, "elixir", signature)
  .then(() =>
    res.status(200).send({
      error: false,
      data: {
        mnemonic,
        sam_did,
      },
    })
  );
...
```

2. **Check for DID existsence**: The game briefly references the contract storage to verify if a user account exists on-chain. This is achieved by indexing into its storage with the user's DID.

```js
// JavaScript Code
...
let user_exists = await chain.checkDidExistence(
  chainApi,
  contract,
  samDB,
  req.userDid
);
...
```

3. **Enabling Data Access Control**

A fundamental capability of this demonstration, powered by ink!, is the ability to control data access. Users can submit their unique Decentralized Identifiers (DID) and an application's DID to the contract, specifying access restrictions or allowances. The contract processes these requests, prompting the database nodes to swiftly adapt to the requested changes, ensuring robust data access control.


```js
// JavaScript Code
...
await chain
  .manageAccess(
    chainApi,
    contract,
    user,
    req.appDid,
    req.userDid,
    req.action == "allow" ? true : false
  )
  .then(() =>
    res.status(200).send({
      error: false,
      data: {
        msg: "operation successful",
      },
    })
  );
...
```

The ink! smart contract is the backbone of the network. To gain a deeper understanding of how the contract operates and empowers users, please review the full code [here](https://github.com/algorealmInc/SamaritanDB-Contract).

This project also exemplifies the potential of ink! and blockchain technology to empower users and revolutionize our interactions with digital applications and services.

🚀 _Together, we're shaping a future where users have full control of their data._ 🚀
