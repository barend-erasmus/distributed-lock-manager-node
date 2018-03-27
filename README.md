# Distributed Lock Manager Node.js

Node.js Client for [Distributed Lock Manager Server](https://github.com/barend-erasmus/distributed-lock-manager)

## Installation

### Prerequisites

* [Node.js (9.9.0)](https://nodejs.org/en/download/current)
* [Distributed Lock Manager Server](https://github.com/barend-erasmus/distributed-lock-manager)

**Node Package Manager (NPM)**

`npm install --save distributed-lock-manager-node`

## Usage

```typescript
const distributedLockManagerClient: DistributedLockManagerClient = new DistributedLockManagerClient('127.0.0.1', 5001);

if (await distributedLockManagerClient.waitAcquire('mylock')) {

    // TODO

    distributedLockManagerClient.release('mylock');
}

distributedLockManagerClient.dispose();
```