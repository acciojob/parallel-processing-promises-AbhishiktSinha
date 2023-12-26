
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },

];

function createImageLoadPromise(index) {
    const imagePromise = new Promise(function promCallback(resolve, reject) {

        // perform synchronous task of loading image
        const image = document.createElement('img');
        image.src = images[index++].url;
        image.alt = 'Image';

        image.addEventListener('load', () => {
            resolve(image);
        });

        image.addEventListener('error', () => {
            reject(`Failed to load image:${image.src}`);
        })


    });

    imagePromise
        .then((result) => {
            console.log('loaded: ', result.src);
        })
        .catch((reason) => {
            console.log(reason);
        });;

    return imagePromise;
}

btn.addEventListener('click', () => {

    output.innerHTML = '';

    const imagePromiseArray = [];
    images.forEach((element, index) => {
        imagePromiseArray.push(createImageLoadPromise(index));
    });

    const combinedImagePromise = Promise.all(imagePromiseArray);
    
    combinedImagePromise
        .then((resultArray) => {
            resultArray.forEach((imageElement) => {
                output.appendChild(imageElement);
            });
        })
        .catch((reason) => {
            console.info(reason);
        })
})
