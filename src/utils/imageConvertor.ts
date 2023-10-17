function convertImageToBlob(imgUrl: string) {
    fetch(imgUrl)
        .then((response) => {
            return response.blob();
        })
        .then((res) => {
            return URL.createObjectURL(res) 
        })
        .catch(err => {
            console.error(err)
        })
}


export default convertImageToBlob