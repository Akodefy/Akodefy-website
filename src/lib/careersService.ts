import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase'
import { type JobRole } from '@/content/site'

export interface ManagedJobRole extends JobRole {
  active?: boolean
  createdAt?: string | number | null
  updatedAt?: string | number | null
}

const COLLECTION_NAME = 'careers_roles'

/**
 * Subscribes to active roles in real-time.
 * Used on the public Careers page.
 */
export function subscribeToActiveRoles(
  callback: (roles: JobRole[]) => void,
  onError?: (error: unknown) => void
): () => void {
  if (!isFirebaseConfigured() || !db) {
    callback([])
    return () => {}
  }

  try {
    const rolesCol = collection(db, COLLECTION_NAME)
    const q = query(rolesCol, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          callback([])
          return
        }

        const roles: JobRole[] = []
        snapshot.forEach((docSnap) => {
          const data = docSnap.data()
          if (data.active !== false) {
            roles.push({
              id: docSnap.id,
              title: data.title || '',
              department: data.department || 'General',
              location: data.location || 'Remote',
              type: data.type || 'Full-time',
              experience: data.experience || 'Any',
              description: data.description || '',
              responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities : [],
              requirements: Array.isArray(data.requirements) ? data.requirements : [],
            })
          }
        })

        callback(roles)
      },
      (error) => {
        console.warn('[Firestore] Error subscribing to roles:', error)
        if (onError) onError(error)
        callback([])
      }
    )

    return unsubscribe
  } catch (err) {
    console.warn('[Firestore] Setup error:', err)
    callback([])
    return () => {}
  }
}

/**
 * Fetches all roles (including inactive ones) for the Admin Dashboard.
 */
export async function getAllRolesAdmin(): Promise<ManagedJobRole[]> {
  if (!isFirebaseConfigured() || !db) {
    return []
  }

  try {
    const rolesCol = collection(db, COLLECTION_NAME)
    const q = query(rolesCol, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return []
    }

    const list: ManagedJobRole[] = []
    snapshot.forEach((docSnap) => {
      const data = docSnap.data()
      list.push({
        id: docSnap.id,
        title: data.title || '',
        department: data.department || 'General',
        location: data.location || 'Remote',
        type: data.type || 'Full-time',
        experience: data.experience || 'Any',
        description: data.description || '',
        responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities : [],
        requirements: Array.isArray(data.requirements) ? data.requirements : [],
        active: data.active !== false,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
      })
    })

    return list
  } catch (error) {
    console.error('[Firestore] Failed to fetch admin roles:', error)
    return []
  }
}

/**
 * Creates a new role in Firestore.
 */
export async function createJobRole(
  roleData: Omit<ManagedJobRole, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  if (!isFirebaseConfigured() || !db) {
    throw new Error('Firebase is not configured')
  }

  const rolesCol = collection(db, COLLECTION_NAME)
  const docRef = await addDoc(rolesCol, {
    ...roleData,
    active: roleData.active !== false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return docRef.id
}

/**
 * Updates an existing role in Firestore.
 */
export async function updateJobRole(
  id: string,
  roleData: Partial<ManagedJobRole>
): Promise<void> {
  if (!isFirebaseConfigured() || !db) {
    throw new Error('Firebase is not configured')
  }

  const roleDoc = doc(db, COLLECTION_NAME, id)
  const cleanData = { ...roleData }
  delete (cleanData as Record<string, unknown>).id

  await updateDoc(roleDoc, {
    ...cleanData,
    updatedAt: serverTimestamp(),
  })
}

/**
 * Deletes a role from Firestore.
 */
export async function deleteJobRole(id: string): Promise<void> {
  if (!isFirebaseConfigured() || !db) {
    throw new Error('Firebase is not configured')
  }

  const roleDoc = doc(db, COLLECTION_NAME, id)
  await deleteDoc(roleDoc)
}
