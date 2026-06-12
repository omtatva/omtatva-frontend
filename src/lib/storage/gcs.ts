import { Storage } from "@google-cloud/storage";

let storageClient: Storage | null = null;

function isValidPrivateKey(key: string): boolean {
  return (
    key.includes("-----BEGIN") &&
    key.includes("PRIVATE KEY-----") &&
    key.includes("-----END")
  );
}

function getStorage(): Storage {
  if (storageClient) return storageClient;

  const projectId = process.env.GCP_PROJECT_ID;
  const clientEmail = process.env.GCS_CLIENT_EMAIL;
  // Private keys in env vars usually have literal "\n" sequences that must be
  // turned back into real newlines.
  const privateKey = process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (clientEmail && privateKey) {
    if (!isValidPrivateKey(privateKey)) {
      throw new Error(
        "GCS_PRIVATE_KEY is not a valid service-account private key. It must be the " +
          'PEM "private_key" field from your service-account JSON key (a multi-line ' +
          "block starting with -----BEGIN PRIVATE KEY-----). Copy it exactly, keeping " +
          "the surrounding quotes and literal \\n sequences."
      );
    }
    storageClient = new Storage({
      projectId,
      credentials: { client_email: clientEmail, private_key: privateKey },
    });
  } else {
    // Falls back to Application Default Credentials: the attached service
    // account on Cloud Run / GCE / GKE, or `gcloud auth application-default
    // login` locally. No private key needed.
    storageClient = new Storage(projectId ? { projectId } : {});
  }

  return storageClient;
}

export function getBucketName(): string {
  const name = process.env.GCS_BUCKET_NAME;
  if (!name) {
    throw new Error("GCS_BUCKET_NAME is not set.");
  }
  return name;
}

export function publicUrl(objectName: string): string {
  const bucket = getBucketName();
  const encoded = objectName.split("/").map(encodeURIComponent).join("/");
  return `https://storage.googleapis.com/${bucket}/${encoded}`;
}

export async function uploadBuffer(
  objectName: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  const file = getStorage().bucket(getBucketName()).file(objectName);
  await file.save(buffer, {
    contentType,
    resumable: false,
    metadata: { cacheControl: "private, max-age=0" },
  });
  return publicUrl(objectName);
}

export async function downloadBuffer(objectName: string): Promise<Buffer> {
  const [contents] = await getStorage()
    .bucket(getBucketName())
    .file(objectName)
    .download();
  return contents;
}

export async function deleteObject(objectName: string): Promise<void> {
  await getStorage()
    .bucket(getBucketName())
    .file(objectName)
    .delete({ ignoreNotFound: true });
}
