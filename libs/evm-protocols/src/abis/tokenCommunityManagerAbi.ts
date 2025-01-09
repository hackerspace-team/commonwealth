export const tokenCommunityManagerAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_launchpad', type: 'address', internalType: 'address' },
      { name: '_owner', type: 'address', internalType: 'address' },
      { name: '_namespaceFactory', type: 'address', internalType: 'address' },
      { name: '_contestManager', type: 'address', internalType: 'address' },
      { name: '_presetShares', type: 'uint256[]', internalType: 'uint256[]' },
      { name: '_defaultQuorum', type: 'uint256', internalType: 'uint256' },
      { name: '_defaultVoteDelay', type: 'uint256', internalType: 'uint256' },
      { name: '_defaultVotePeriod', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'contestManager',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'executeLaunchAction',
    inputs: [
      { name: 'name', type: 'string', internalType: 'string' },
      { name: 'symbol', type: 'string', internalType: 'string' },
      { name: 'shares', type: 'uint256[]', internalType: 'uint256[]' },
      { name: 'holders', type: 'address[]', internalType: 'address[]' },
      { name: 'totalSupply', type: 'uint256', internalType: 'uint256' },
      { name: 'tokenAddress', type: 'address', internalType: 'address' },
      { name: 'sender', type: 'address', internalType: 'address' },
    ],
    outputs: [
      {
        name: 'result',
        type: 'tuple',
        internalType: 'struct ILaunchActionHook.LaunchActionResponse',
        components: [
          { name: 'shares', type: 'uint256[]', internalType: 'uint256[]' },
          { name: 'holders', type: 'address[]', internalType: 'address[]' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'launchpad',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'namespaceFactory',
    inputs: [],
    outputs: [
      { name: '', type: 'address', internalType: 'contract INamespaceFactory' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'namespaceForToken',
    inputs: [{ name: 'token', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'onERC1155BatchReceived',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256[]', internalType: 'uint256[]' },
      { name: '', type: 'uint256[]', internalType: 'uint256[]' },
      { name: '', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'onERC1155Received',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'presetShares',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'setDefaultQuorum',
    inputs: [
      { name: '_defaultQuorum', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setDefaultVoteDelay',
    inputs: [
      { name: '_defaultVoteDelay', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setDefaultVotePeriod',
    inputs: [
      { name: '_defaultVotePeriod', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setLaunchpad',
    inputs: [{ name: '_launchpad', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setNamespaceFactory',
    inputs: [
      {
        name: '_namespaceFactory',
        type: 'address',
        internalType: 'contract INamespaceFactory',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setPresetShares',
    inputs: [
      { name: '_presetShares', type: 'uint256[]', internalType: 'uint256[]' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [{ name: 'interfaceId', type: 'bytes4', internalType: 'bytes4' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'CommunityNamespaceCreated',
    inputs: [
      { name: 'name', type: 'string', indexed: true, internalType: 'string' },
      {
        name: 'token',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'namespaceAddress',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'governanceAddress',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
] as const;
