import { ComplexLanguageKeys, SimpleLanguageKeys } from '@lib/types/Augments';

import { Extendable, ExtendableStore, Language, LanguageKeys } from 'klasa';

export default class extends Extendable {

	public constructor(store: ExtendableStore, file: string[], directory: string) {
		super(store, file, directory, { appliesTo: [Language] });
	}

	public tget<T extends SimpleLanguageKeys>(term: T): LanguageKeys[T];

	public tget<T extends ComplexLanguageKeys>(term: T, ...args: Parameters<LanguageKeys[T]>): ReturnType<LanguageKeys[T]>

	public tget(this: Language, key: string, ...args: readonly unknown[]): unknown {
		return this.get(key, ...args);
	}

}
