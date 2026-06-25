// idb.js - IndexedDB utility for offline queue and drug cache
// Provides async functions to interact with IndexedDB for large data sets.
// Database name and version
const DB_NAME = 'CherryPharmacyDB';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      // Object store for offline sales queue (key auto-increment)
      if (!db.objectStoreNames.contains('offline_sales')) {
        const salesStore = db.createObjectStore('offline_sales', { keyPath: 'id', autoIncrement: true });
        salesStore.createIndex('branchId', 'branchId', { unique: false });
      }
      // Object store for drug cache per branch
      if (!db.objectStoreNames.contains('drug_cache')) {
        db.createObjectStore('drug_cache', { keyPath: 'branchId' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// -------------------- Offline Sales Queue --------------------
export async function addOfflineSale(branchId, payload) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('offline_sales', 'readwrite');
    const store = tx.objectStore('offline_sales');
    const entry = { branchId, payload, createdAt: new Date().toISOString() };
    const req = store.add(entry);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getAllOfflineSales(branchId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('offline_sales', 'readonly');
    const store = tx.objectStore('offline_sales');
    const index = store.index('branchId');
    const range = IDBKeyRange.only(branchId);
    const req = index.getAll(range);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteOfflineSale(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('offline_sales', 'readwrite');
    const store = tx.objectStore('offline_sales');
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// -------------------- Drug Cache --------------------
export async function cacheDrugs(branchId, drugs) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('drug_cache', 'readwrite');
    const store = tx.objectStore('drug_cache');
    const entry = { branchId, drugs, cachedAt: new Date().toISOString() };
    const req = store.put(entry);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getCachedDrugs(branchId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('drug_cache', 'readonly');
    const store = tx.objectStore('drug_cache');
    const req = store.get(branchId);
    req.onsuccess = () => resolve(req.result ? req.result.drugs : null);
    req.onerror = () => reject(req.error);
  });
}

// Utility to clear all offline sales for a branch (e.g., after successful sync)
export async function clearOfflineSales(branchId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('offline_sales', 'readwrite');
    const store = tx.objectStore('offline_sales');
    const index = store.index('branchId');
    const range = IDBKeyRange.only(branchId);
    const cursorRequest = index.openCursor(range);
    cursorRequest.onsuccess = function(event) {
      const cursor = event.target.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      } else {
        resolve();
      }
    };
    cursorRequest.onerror = () => reject(cursorRequest.error);
  });
}

// Utility to clear cached drugs for a branch
export async function clearDrugCache(branchId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('drug_cache', 'readwrite');
    const store = tx.objectStore('drug_cache');
    const req = store.delete(branchId);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}


export { openDB };
