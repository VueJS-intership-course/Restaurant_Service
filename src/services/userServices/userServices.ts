import fireStore from "../firebaseConfig"

export default {
    getAll() {
        fireStore.collection('user-profiles').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.data());
            })
        })
    },

    
}