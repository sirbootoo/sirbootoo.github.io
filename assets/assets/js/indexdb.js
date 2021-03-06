import idb from 'idb';
let req, db, tx, index;

const dbPromise = idb.open('curverter', 1, upgradeDB => {
    upgradeDB.createObjectStore('currencies');
    upgradeDB.createObjectStore('convertion');
});


const idbKey = {
    getAll(store) {
        return dbPromise.then(db => {
            return db.transaction(store)
                .objectStore(store).getAll();
        });
    },
    get(store, key) {
        return dbPromise.then(db => {
            return db.transaction(store)
                .objectStore(store).get(key);
        });
    },
    set(store, key, val) {
        return dbPromise.then(db => {
            const tx = db.transaction(store, 'readwrite');
            tx.objectStore(store).put(val, key);
            return tx.complete;
        });
    },
    delete(store, key) {
        return dbPromise.then(db => {
            const tx = db.transaction(store, 'readwrite');
            tx.objectStore(store).delete(key);
            return tx.complete;
        });
    },
    clear(store) {
        return dbPromise.then(db => {
            const tx = db.transaction(store, 'readwrite');
            tx.objectStore(store).clear();
            return tx.complete;
        });
    },
    keys(store) {
        return dbPromise.then(db => {
            const tx = db.transaction(store);
            const keys = [];
            const store = tx.objectStore(store);

            // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
            // openKeyCursor isn't supported by Safari, so we fall back
            (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
                if (!cursor) return;
                keys.push(cursor.key);
                cursor.continue();
            });

            return tx.complete.then(() => keys);
        });
    }
};

export const setCurrencyList = (index, obj) => {
    idbKey.set('currencies', index, obj);
}

export const listCurrencies = () => {
    return idbKey.getAll('currencies');
}

export const setConvertion = (key, val) => {
    return idbKey.set('convertion', key, val);
}

export const getConvertion = (key) => {
    return idbKey.get('convertion', key);
}

