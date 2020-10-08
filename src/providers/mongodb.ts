/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-use-before-define */
// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Provider, util, ProviderStore } from 'klasa';
import { MongoClient as Mongo } from 'mongodb';
import { DB_CONNECTION_STRING } from '@root/config';

module.exports = class extends Provider {

	public db;

	public constructor(store: ProviderStore, file: string[], directory: string) {
		super(store, file, directory);
		this.db = null;
	}

	public async init() {
		const connection = util.mergeDefault({
			options: {}
		}, this.client.options.providers.mongodb);

		const connectionString = DB_CONNECTION_STRING;

		const mongoClient = await Mongo.connect(
			connectionString,
			util.mergeObjects(connection.options, { useNewUrlParser: true, useUnifiedTopology: true })
		);

		// @ts-ignore 2339
		this.db = mongoClient.db(connection.db);
	}

	/* Table methods */

	public get exec() {
		return this.db;
	}

	public hasTable(table) {
		return this.db.listCollections().toArray().then(collections => collections.some(col => col.name === table));
	}

	public createTable(table) {
		return this.db.createCollection(table);
	}

	public deleteTable(table) {
		return this.db.dropCollection(table);
	}

	/* Document methods */

	public getAll(table, filter = []) {
		if (filter.length) return this.db.collection(table).find({ id: { $in: filter } }, { _id: 0 }).toArray();
		return this.db.collection(table).find({}, { _id: 0 }).toArray();
	}

	public getKeys(table) {
		return this.db.collection(table).find({}, { id: 1, _id: 0 }).toArray();
	}

	public get(table, id) {
		return this.db.collection(table).findOne(resolveQuery(id));
	}

	public has(table, id) {
		return this.get(table, id).then(Boolean);
	}

	public getRandom(table) {
		return this.db.collection(table).aggregate({ $sample: { size: 1 } });
	}

	public create(table, id, doc = {}) {
		return this.db.collection(table).insertOne(util.mergeObjects(this.parseUpdateInput(doc), resolveQuery(id)));
	}

	public delete(table, id) {
		return this.db.collection(table).deleteOne(resolveQuery(id));
	}

	public update(table, id, doc) {
		return this.db.collection(table).updateOne(resolveQuery(id), { $set: util.isObject(doc) ? flatten(doc) : parseEngineInput(doc) });
	}

	public replace(table, id, doc) {
		return this.db.collection(table).replaceOne(resolveQuery(id), this.parseUpdateInput(doc));
	}

};

const resolveQuery = query => util.isObject(query) ? query : { id: query };

function flatten(obj, path = '') {
	let output = {};
	for (const [key, value] of Object.entries(obj)) {
		if (util.isObject(value)) output = Object.assign(output, flatten(value, path ? `${path}.${key}` : key));
		else output[path ? `${path}.${key}` : key] = value;
	}
	return output;
}

function parseEngineInput(updated) {
	return Object.assign({}, ...updated.map(entry => ({ [entry.data[0]]: entry.data[1] })));
}
