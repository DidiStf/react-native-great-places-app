import * as SQLite from 'expo-sqlite';

// Opens or creates the database
const db = SQLite.openDatabase('places.db');

// Creates the table if it doesn't exist yet
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    /* This transaction  method takes as an argument a function that gives us acces to the transaction object it creates.
  Transactions guarantee that the query is always excecuted as a hole and that if some part of the query should fail,
  the entire query is rolled back so we can't end up with a corrupted data in ourdatabase. That's why we wrap our query in
  a transaction. */
    db.transaction((transaction) => {
      transaction.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'places (' +
          'id INTEGER PRIMARY KEY NOT NULL, ' +
          'title TEXT NOT NULL, ' +
          'imageUri TEXT NOT NULL, ' +
          'address TEXT NOT NULL, ' +
          'latitude REAL NOT NULL, ' +
          'longitude REAL NOT NULL);',
        // array of dynamic arguments we can inject into this query
        [],
        // success function that excecutes if the query succeeded
        () => {
          resolve();
        },
        // error function that excecutes if the query failed
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (placeData) => {
  const { title, imageUri, address, latitude, longitude } = placeData;
  const promise = new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        'INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
        [title, imageUri, address, latitude, longitude],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const deletePlace = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        'DELETE FROM places WHERE id=? ',
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        'SELECT * FROM places;',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
