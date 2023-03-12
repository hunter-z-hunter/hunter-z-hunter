import { SimpleAccountAPI } from "@account-abstraction/sdk";
import { Signer } from "@ethersproject/abstract-signer";
import { Group } from "@semaphore-protocol/group";
import { Identity } from "@semaphore-protocol/identity";
import { generateProof } from "@semaphore-protocol/proof";
import { ethers } from "ethers";

export interface SemaphoreAccountApiParams {
  owner: Signer;
  provider: ethers.providers.Provider;
  entryPointAddress: string;
  factoryAddress?: string;
  index?: number;
}

// implementation of the BaseAccountAPI using the SemaphoreAccount contract
export class SemaphoreAccountApi extends SimpleAccountAPI {
  constructor(baseAccountParams: SemaphoreAccountApiParams, readonly userIdentity?: string) {
    super(baseAccountParams);
  }

  async signUserOp(userOp: any): Promise<any> {
    // 1. connect identity
    const identity = new Identity("identity"); // new Identity(identity.toString())
    const identityCommitment = identity.getCommitment();

    // 2. add member to group
    const group = new Group(16);
    group.addMember(identityCommitment);

    // 3. generate proof to be used as signature
    const externalNullifier = userOp.uoHash; // we're not concerned about double signaling here, we just need a unique value
    const signal = 1;
    const fullProof = await generateProof(identity, group, externalNullifier, signal, {
      zkeyFilePath: "https://www.trusted-setup-pse.org/semaphore/16/semaphore.zkey",
      wasmFilePath: "https://www.trusted-setup-pse.org/semaphore/16/semaphore.wasm",
    });

    // 4. encode proof
    const signature = ethers.utils.defaultAbiCoder.encode(
      ["unit256", "uint256", "uint256", "uint256", "uint256", "uint256[8]"],
      [group.id, group.root, signal, fullProof.nullifierHash, externalNullifier, fullProof]
    );

    return { ...userOp, signature };
  }
}
