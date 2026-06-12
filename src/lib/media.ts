/** Default hero background video in `public/`. Override via CMS `hero.video`. */
export const HERO_VIDEO = "/hero3.mp4";

export function videoMimeType(src: string): string {
  if (src.endsWith(".webm")) return "video/webm";
  if (src.endsWith(".ogg") || src.endsWith(".ogv")) return "video/ogg";
  return "video/mp4";
}

export interface StorageRef {
  bucket: string;
  /** Object path within the bucket (no leading slash). */
  path: string;
}

/**
 * Detect whether a stored media value points at a Google Cloud Storage object
 * and, if so, extract its `{ bucket, path }`.
 *
 * Recognised shapes:
 *  - `gs://bucket/path/to/file.mp4`                         (gsutil URI)
 *  - `https://storage.googleapis.com/bucket/path`           (path style)
 *  - `https://storage.cloud.google.com/bucket/path`         (console links)
 *  - `https://bucket.storage.googleapis.com/path`           (virtual-hosted)
 *
 * Everything else (local `/public` paths, plain external URLs, etc.) returns
 * `null` and is served untouched.
 */
export function parseStorageRef(value: string | undefined | null): StorageRef | null {
  if (!value) return null;
  const raw = value.trim();
  if (!raw) return null;

  if (raw.startsWith("gs://")) {
    return splitBucketPath(raw.slice("gs://".length));
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  const pathname = url.pathname.replace(/^\/+/, "");

  // Path style: storage.googleapis.com/<bucket>/<object>
  if (host === "storage.googleapis.com" || host === "storage.cloud.google.com") {
    return splitBucketPath(pathname);
  }

  // Virtual-hosted style: <bucket>.storage.googleapis.com/<object>
  if (host.endsWith(".storage.googleapis.com")) {
    const bucket = host.slice(0, -".storage.googleapis.com".length);
    const path = decodeURIComponent(pathname);
    if (!bucket || !path) return null;
    return { bucket, path };
  }

  return null;
}

function splitBucketPath(value: string): StorageRef | null {
  const cleaned = value.replace(/^\/+/, "");
  const slash = cleaned.indexOf("/");
  if (slash <= 0) return null;
  const bucket = cleaned.slice(0, slash);
  const path = decodeURIComponent(cleaned.slice(slash + 1));
  if (!bucket || !path) return null;
  return { bucket, path };
}

/**
 * Turn a stored media value into a URL safe to drop straight into `src`.
 *
 * The bucket is public, so storage objects resolve directly to their public
 * `https://storage.googleapis.com/<bucket>/<path>` URL. Non-storage values
 * (local `/public` paths, plain external URLs, etc.) pass through unchanged.
 */
export function mediaProxyUrl(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const ref = parseStorageRef(value);
  if (!ref) return value;
  return publicStorageUrl(ref);
}

/** Build the public URL for a Google Cloud Storage object. */
export function publicStorageUrl(ref: StorageRef): string {
  const encodedPath = ref.path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `https://storage.googleapis.com/${ref.bucket}/${encodedPath}`;
}
