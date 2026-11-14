import { fetchSnapshot } from "./snapshot-api";

// CMS data is materialized in the snapshot before the static build.
// No content request is made by the deployed site.
export async function fetchAPI(path: string, params = {}) {
  return fetchSnapshot(path, params);
}
