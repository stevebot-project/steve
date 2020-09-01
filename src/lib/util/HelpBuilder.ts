export class HelpBuilder {

	public examples: string | null = null;
	public explainedUsage: string | null = null;
	public reminder: string | null = null;

	public setExamples(text: string): HelpBuilder {
		this.examples = text;
		return this;
	}

	public setExplainedUsage(text: string): HelpBuilder {
		this.explainedUsage = text;
		return this;
	}

	public setReminder(text: string): HelpBuilder {
		this.reminder = text;
		return this;
	}

	public display(name: string, options: HelpBuilderDisplayOptions, multiline = false): string {
		const { extendedHelp, explainedUsage = [], examples = [], reminder } = options;
		const output: string[] = [];

		// Extended help
		if (extendedHelp) {
			output.push(HelpBuilder.resolveMultilineString(extendedHelp, multiline), '');
		}

		// Examples
		if (examples.length) {
			output.push(this.examples, ...examples.map(example => `→ Steve, ${name}${example ? ` *${example}*` : ''}`), '');
		} else {
			output.push(this.examples, `→ Steve, ${name}`, '');
		}

		// Explained usage
		if (explainedUsage.length) {
			output.push(this.explainedUsage, ...explainedUsage.map(([arg, desc]) => `→ **${arg}**: ${desc}`), '');
		}

		// Reminder
		if (reminder) {
			output.push(this.reminder, HelpBuilder.resolveMultilineString(reminder, multiline));
		}

		return output.join('\n');
	}

	public static resolveMultilineString(str: string | string[], multiline: boolean): string {
		return Array.isArray(str)
			? HelpBuilder.resolveMultilineString(str.join(multiline ? '\n' : ' '), multiline)
			: str.split('\n').map(line => line.trim()).join(multiline ? '\n' : ' ');
	}

}

interface HelpBuilderDisplayOptions {
	extendedHelp?: string[] | string;
	explainedUsage?: Array<[string, string]>;
	examples?: string[];
	reminder?: string[] | string;
}
