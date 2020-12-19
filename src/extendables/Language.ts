import { ComplexLanguageKeys, SimpleLanguageKeys } from '@lib/types/Augments';
import { ApplyOptions } from '@skyra/decorators';
import { Extendable, ExtendableOptions, Language, LanguageKeys } from 'klasa';

@ApplyOptions<ExtendableOptions>({
	appliesTo: [Language]
})
export default class extends Extendable {

	public tget<T extends SimpleLanguageKeys>(term: T): LanguageKeys[T];

	public tget<T extends ComplexLanguageKeys>(term: T, ...args: Parameters<LanguageKeys[T]>): ReturnType<LanguageKeys[T]>

	public tget(this: Language, key: string, ...args: readonly unknown[]): unknown {
		return this.get(key, ...args);
	}

}
