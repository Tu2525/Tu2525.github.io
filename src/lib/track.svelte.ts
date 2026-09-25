import { defaultTrack, getTrack, type TrackId } from '$lib/data/tracks';

// Shared across the page. The URL (?track=ml) is the source of truth on load;
// pages are prerendered, so it is read on the client only.
export const trackState = $state<{ id: TrackId }>({ id: defaultTrack });

export function readTrackFromUrl(url: URL) {
	trackState.id = getTrack(url.searchParams.get('track')).id;
}

export function currentTrack() {
	return getTrack(trackState.id);
}

/** Link back to the home page that keeps the visitor's track, e.g. `/?track=ml#projects`. */
export function homeHref(hash = '') {
	return (trackState.id === defaultTrack ? '/' : `/?track=${trackState.id}`) + hash;
}
