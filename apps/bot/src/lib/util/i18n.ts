import { TFunction } from "@sapphire/plugin-i18next";

export type TypedT = string & { __type__: string };
export type TypedFT<TArgs extends object> = string & { __args__: TArgs };
export type SteveT = ReturnType<typeof useT>;

export function FT<TArgs extends object>(k: string): TypedFT<TArgs> {
	return k as TypedFT<TArgs>;
}

export function T(k: string): TypedT {
	return k as TypedT;
}

export function useT(fn: TFunction) {
	function t(key: TypedT): string;
	function t<TArgs extends object>(key: TypedFT<TArgs>, options: TArgs): string;
	function t(key: string, options?: object): string {
		return fn(key, options as any) as string;
	}
	return t;
}
