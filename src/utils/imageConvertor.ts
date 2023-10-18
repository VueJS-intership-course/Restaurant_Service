import firebase from "firebase/compat/app";
import 'firebase/compat/storage'

function uploadImage(file: File, collectionName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        console.log(file);

        const storageRef = firebase.storage().ref();
       const collectionRef = storageRef.child('products/subdirectory/' + file.name);

        if (file.size > 1024 * 1024) {
            console.log('Image size bigger than 1MB limit');
            reject('Image size exceeded 1MB limit');
            return;
        }

        const imageRef = collectionRef.child(file.name);

        imageRef.put(file).then(snapshot => {
            console.log('Image uploaded successfully.');
            snapshot.ref.getDownloadURL().then(downloadURL => {
                resolve(downloadURL);
            }).catch(error => {
                reject(error);
            });
        }).catch(error => {
            console.error(error);
            reject(error);
        });
    });
}

export default uploadImage;
