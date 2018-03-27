import * as net from 'net';

export class DistributedLockManagerClient {

    private client: net.Socket = null;

    constructor(
        private host: string,
        private port: number,
    ) {
        this.client = new net.Socket();
    }

    public async acquire(name: string): Promise<boolean> {
        await this.connect();

        const result: string = await this.execute(`acquire ${name}\r\n`);

        if (result === 'TRUE\r\n') {
            return true;
        }

        return false;
    }

    public dispose(): void {
        this.client.destroy();
    }

    public async release(name: string): Promise<boolean> {
        await this.connect();

        const result: string = await this.execute(`release ${name}\r\n`);

        if (result === 'OK\r\n') {
            return true;
        }

        return false;
    }

    public async waitAcquire(name: string): Promise<boolean> {
        await this.connect();

        const result: string = await this.execute(`waitAcquire  ${name}\r\n`);

        if (result === 'TRUE\r\n') {
            return true;
        }

        return false;
    }

    private connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.client || !this.client.remoteAddress) {
                this.client.connect(this.port, this.host, () => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    private execute(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const dataListener = (data: Buffer) => {
                this.client.removeListener('data', dataListener);

                resolve(data.toString());
            };

            this.client.on('data', dataListener);

            this.client.write(command);
        });
    }

}
