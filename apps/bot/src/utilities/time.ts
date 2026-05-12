import { ApplyOptions } from "@sapphire/decorators";
import { Duration } from "@sapphire/duration";
import { Utility } from "@sapphire/plugin-utilities-store";
import { Timestamp } from "@sapphire/timestamp";

@ApplyOptions<Utility.Options>({
	name: "time",
})
export class TimeUtility extends Utility {
	public defaultDateFormat = new Timestamp("YYYY MMM D");

	public parseDuration(input: string) {
		const duration = new Duration(input);

		return duration ? duration.offset : null;
	}
}

declare module "@sapphire/plugin-utilities-store" {
	export interface Utilities {
		time: TimeUtility;
	}
}
