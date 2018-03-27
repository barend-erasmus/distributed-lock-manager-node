import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as uuid from 'uuid';

import { DistributedLockManagerClient } from './distributed-lock-manager-client';

describe('DistributedLockManagerClient', () => {

    let distributedLockManagerClient: DistributedLockManagerClient = null;

    beforeEach(async () => {
        distributedLockManagerClient = new DistributedLockManagerClient('127.0.0.1', 5001);
    });

    afterEach(async () => {
        distributedLockManagerClient.dispose();
    });

    describe('acquire', () => {

        it('should return true', async () => {
            const id: string = uuid.v4();

            const result: boolean = await distributedLockManagerClient.acquire(`mylock-${id}`);

            expect(result).to.be.true;
        });

        it('should return false given already acquired', async () => {
            const id: string = uuid.v4();

            await distributedLockManagerClient.acquire(`mylock-${id}`);

            const result: boolean = await distributedLockManagerClient.acquire(`mylock-${id}`);

            expect(result).to.be.false;
        });

        it('should return true given released', async () => {
            const id: string = uuid.v4();

            await distributedLockManagerClient.acquire(`mylock-${id}`);
            await distributedLockManagerClient.release(`mylock-${id}`);

            const result: boolean = await distributedLockManagerClient.acquire(`mylock-${id}`);

            expect(result).to.be.true;
        });

    });

});
