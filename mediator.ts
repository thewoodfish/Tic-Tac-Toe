// Copyright (c) 2023 Algorealm, Inc.

import { BN, BN_ONE, BN_TWO } from "@polkadot/util";
import type { WeightV2 } from '@polkadot/types/interfaces'

const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
const PROOFSIZE = new BN(1_000_000);
const storageDepositLimit: BN = new BN(1000);

export async function createID(api: any, contract: any, account: any, did: string, ht_cid: string, signature: string) {
  const maxGas = 4793859072;
  const maxProof = 125952;
  const gl = api.registry.createType('WeightV2', {
    refTime: maxGas,
    proofSize: maxProof,
  }) as WeightV2

  // Wrap the entire logic in a Promise
  return new Promise(async (resolve, reject) => {
    try {
      // Query the contract message
      const { gasRequired, storageDeposit, result } = await contract.query.newAccount(
        account.address,
        {
          gasLimit: gl,
        }, did, ht_cid, signature
      )

      // Check for errors
      if (result.isErr) {
        let error = ''
        if (result.asErr.isModule) {
          const dispatchError = api.registry.findMetaError(result.asErr.asModule)
          error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name
        } else {
          error = result.asErr.toString()
        }

        console.error(error);
        reject(error); // Reject with the error message
      }

      // Even if the result is Ok, it could be a revert in the contract execution
      if (result.isOk) {
        const flags = result.asOk.flags.toHuman()
        // Check if the result is a revert via flags
        if (flags.includes('Revert')) {
          const type = contract.abi.messages[5].returnType; // here 5 is the index of the message in the ABI
          const typeName = type?.lookupName || type?.type || '';
          const error = contract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman();

          console.error(error ? (error as any).Err : 'Revert');
          reject(error || 'Revert'); // Reject with the error message
        }
      }

      const unsub = await contract.tx
        .newAccount({
          gasLimit: gl,
        }, did, ht_cid, signature)
        .signAndSend(account, (res: any) => {
          if (res.status.isInBlock) {
            console.log('in a block');
          }
          if (res.status.isFinalized) {
            console.log('Successfully sent the txn');
            unsub();
            resolve('Successfully sent the txn'); // Resolve when the transaction is finalized
          }
        });
    } catch (error) {
      console.error(error);
      reject(error); // Reject if there's an exception
    }
  });
}


export async function manageAccess(api: any, contract: any, account: any, appDid: string, userDid: string, allow: boolean) {
  const maxGas = 4793859072;
  const maxProof = 125952;
  const gl = api.registry.createType('WeightV2', {
    refTime: maxGas,
    proofSize: maxProof,
  }) as WeightV2

  // restrict application access to a users data
  if (!allow) {
    // Wrap the entire logic in a Promise
    return new Promise(async (resolve, reject) => {
      try {
        // Query the contract message
        const { gasRequired, storageDeposit, result } = await contract.query.restrict(
          account.address,
          {
            gasLimit: gl,
          }, userDid, appDid
        )

        // Check for errors
        if (result.isErr) {
          let error = ''
          if (result.asErr.isModule) {
            const dispatchError = api.registry.findMetaError(result.asErr.asModule)
            error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name
          } else {
            error = result.asErr.toString()
          }

          console.error(error);
          reject(error); // Reject with the error message
        }

        // Even if the result is Ok, it could be a revert in the contract execution
        if (result.isOk) {
          const flags = result.asOk.flags.toHuman()
          // Check if the result is a revert via flags
          if (flags.includes('Revert')) {
            const type = contract.abi.messages[5].returnType; // here 5 is the index of the message in the ABI
            const typeName = type?.lookupName || type?.type || '';
            const error = contract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman();

            console.error(error ? (error as any).Err : 'Revert');
            reject(error || 'Revert'); // Reject with the error message
          }
        }

        const unsub = await contract.tx
          .restrict({
            gasLimit: gl,
          }, userDid, appDid)
          .signAndSend(account, (res: any) => {
            if (res.status.isInBlock) {
              console.log('in a block');
            }
            if (res.status.isFinalized) {
              console.log('Successfully sent the txn');
              unsub();
              resolve('Successfully sent the txn'); // Resolve when the transaction is finalized
            }
          });
      } catch (error) {
        console.error(error);
        reject(error); // Reject if there's an exception
      }
    });

  } else {

    // Wrap the entire logic in a Promise
    return new Promise(async (resolve, reject) => {
      try {
        // Query the contract message
        const { gasRequired, storageDeposit, result } = await contract.query.unrestrict(
          account.address,
          {
            gasLimit: gl,
          }, userDid, appDid
        )

        // Check for errors
        if (result.isErr) {
          let error = ''
          if (result.asErr.isModule) {
            const dispatchError = api.registry.findMetaError(result.asErr.asModule)
            error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name
          } else {
            error = result.asErr.toString()
          }

          console.error(error);
          reject(error); // Reject with the error message
        }

        // Even if the result is Ok, it could be a revert in the contract execution
        if (result.isOk) {
          const flags = result.asOk.flags.toHuman()
          // Check if the result is a revert via flags
          if (flags.includes('Revert')) {
            const type = contract.abi.messages[5].returnType; // here 5 is the index of the message in the ABI
            const typeName = type?.lookupName || type?.type || '';
            const error = contract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman();

            console.error(error ? (error as any).Err : 'Revert');
            reject(error || 'Revert'); // Reject with the error message
          }
        }

        const unsub = await contract.tx
          .unrestrict({
            gasLimit: gl,
          }, userDid, appDid)
          .signAndSend(account, (res: any) => {
            if (res.status.isInBlock) {
              console.log('in a block');
            }
            if (res.status.isFinalized) {
              console.log('Successfully sent the txn');
              unsub();
              resolve('Successfully sent the txn'); // Resolve when the transaction is finalized
            }
          });
      } catch (error) {
        console.error(error);
        reject(error); // Reject if there's an exception
      }
    });
  }

}


export async function checkDidExistence(api: any, contract: any, account: any, did: string): Promise<any> {
  const { result, output } = await contract.query.checkDidExistence(
    account.address,
    {
      gasLimit: api?.registry.createType('WeightV2', {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    },
    did
  );

  return result.toHuman();
}