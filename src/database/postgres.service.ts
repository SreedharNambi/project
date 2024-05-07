import { Inject, Injectable } from '@nestjs/common';
import {  ConfigType } from '@nestjs/config';
import { Client, Pool } from 'pg';
import postgresConfig from './postgres.config';

@Injectable()
export class PostgresService {
    public pool: Pool;

    constructor(
        @Inject(postgresConfig.KEY)
        private dbConfig: ConfigType<typeof postgresConfig>
    ) { this.connect(); }

    async connect() {
        this.pool = new Pool(this.dbConfig);
    }
    async reconnect() {
        this.reconnect();
    }
    async getClient(): Promise<Client> {
        return await new Client(this.dbConfig);
    }
}  