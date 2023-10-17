import firebase from "firebase/compat/app";
import 'firebase/storage'

function uploadImage(file:File, collectionName:string) {
    const storageRef = firebase.storage().ref();
    const collectionRef = storageRef.child(collectionName); 
  
    if (file.size > 1024 * 1024) {
      console.log('Image size bigger 1MB limit');
      return;
    }
  
    const imageRef = collectionRef.child(file.name);
  
    imageRef.put(file).then(snapshot => {
      console.log('Image uploaded successfully.');
    }).catch(error => {
      console.error(error);
    });
  }

export default uploadImage


