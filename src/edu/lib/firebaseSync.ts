// No-op stubs (Firestore sync disabled in this deployment).
export async function seedCollectionToFirestore<T extends { id: string }>(_c: string, _i: T[]) {}
export function subscribeToCollection<T extends { id: string }>(_c: string, _o: (i: T[]) => void) {
  return () => {};
}
export async function saveItemToFirestore<T extends { id: string }>(_c: string, _i: T) {}
export async function bulkSyncToFirestore<T extends { id: string }>(_c: string, _i: T[]) {}
