import { InvalidInput } from '@hicommonwealth/core';
import { ChainBase, addressSwapper, bech32ToHex } from '@hicommonwealth/shared';
import { bech32 } from 'bech32';
import { models } from 'model/src/database';
import { mustExist } from 'model/src/middleware/guards';
import { Op } from 'sequelize';

export type VerifiedAddress = {
  base: ChainBase;
  encodedAddress: string;
  ss58Prefix?: number | null;
  hex?: string;
  existingHexUserId?: number | null;
};

export const VerifyAddressErrors = {
  InvalidAddress: 'Invalid address',
};

/**
 * Verifies that address is compatible with community and has a valid signature
 */
export async function verifyAddress(
  community_id: string,
  address: string,
): Promise<VerifiedAddress> {
  // Injective special validation
  if (community_id === 'injective') {
    if (address.slice(0, 3) !== 'inj')
      throw new InvalidInput('Must join with Injective address');
  } else if (address.slice(0, 3) === 'inj')
    throw new InvalidInput('Cannot join with an injective address');

  const community = await models.Community.findOne({
    where: { id: community_id },
  });
  mustExist('Community', community);

  if (community.base === ChainBase.Ethereum) {
    const { isAddress } = await import('web3-validator');
    if (!isAddress(address)) throw new InvalidInput('Eth address is not valid');
    return { base: community.base, encodedAddress: address };
  }

  if (community.base === ChainBase.Substrate)
    return {
      base: community.base,
      encodedAddress: addressSwapper({
        address,
        currentPrefix: community.ss58_prefix!,
      }),
      ss58Prefix: community.ss58_prefix!,
    };

  if (community.base === ChainBase.NEAR)
    throw new InvalidInput('NEAR login not supported');

  if (community.base === ChainBase.Solana) {
    const { PublicKey } = await import('@solana/web3.js');
    const key = new PublicKey(address);
    if (key.toBase58() !== address)
      throw new InvalidInput(`Solana address is not valid: ${key.toBase58()}`);
    return { base: community.base, encodedAddress: address };
  }

  try {
    // cosmos or injective
    if (community.bech32_prefix) {
      const { words } = bech32.decode(address, 50);
      const encodedAddress = bech32.encode(community.bech32_prefix, words);
      const addressHex = bech32ToHex(address);
      // check all addresses for matching hex
      const existingHexes = await models.Address.scope(
        'withPrivateData',
      ).findAll({ where: { hex: addressHex, verified: { [Op.ne]: null } } });
      const existingHexesSorted = existingHexes.sort((a, b) => {
        // sort by latest last_active
        return +b.dataValues.last_active! - +a.dataValues.last_active!;
      });
      // use the latest active user with this hex to assign profile
      return {
        base: community.base,
        encodedAddress,
        hex: addressHex,
        existingHexUserId: existingHexesSorted.at(0)?.user_id,
      };
    }
    throw new InvalidInput(VerifyAddressErrors.InvalidAddress);
  } catch (e) {
    throw new InvalidInput(VerifyAddressErrors.InvalidAddress);
  }
}
