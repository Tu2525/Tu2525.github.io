import github from './github.json';

export interface RepoInfo {
	readme?: string;
	version?: string;
	stars?: number;
	language?: string;
	pushed?: string;
}

/** Build-time GitHub data for a project, written by scripts/sync-github.mjs. */
export const repoInfo = (slug: string) => (github as Record<string, RepoInfo>)[slug];

/** "2026-10-09" -> "Oct 9, 2026" */
export const shortDate = (iso: string) =>
	new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC'
	});
