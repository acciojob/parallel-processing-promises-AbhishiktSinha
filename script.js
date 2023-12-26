
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
];

function createImageLoadPromise(index) {
    return new Promise(function promCallback(resolve, reject) {

        // perform synchronous task of loading image
        const image = document.createElement('img');
        image.src = images[index++].url;
        image.alt = 'Image';

        resolve(image);

    });
}

btn.addEventListener('click', () => {

    output.innerHTML = '';

    const imagePromiseArray = [];
    images.forEach((element, index) => {
        imagePromiseArray.push(createImageLoadPromise(index));
    });

    Promise.all(imagePromiseArray)
        .then((resultArray) => {
            resultArray.forEach((imageElement) => {
                output.appendChild(imageElement);
            });
        })
        .catch((reason) => {
            console.error('ERROR: Error in downloading image', reason)
        })
})
