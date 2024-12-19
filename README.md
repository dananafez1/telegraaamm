
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Take a Picture</title>
    <style>
        video, canvas { max-width: 100%; }
    </style>
</head>
<body>

<h2>Take a Picture</h2>
<video id="video" width="640" height="480" autoplay></video>
<button id="snap">Take a Photo</button>
<canvas id="canvas" style="display:none;"></canvas>

<script>
    // Get video stream
    const video = document.getElementById('video');
    const snapButton = document.getElementById('snap');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Start video stream
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            alert('Error accessing the camera: ' + err);
        });

    // Take a picture when the button is clicked
    snapButton.addEventListener('click', () => {
        // Draw the video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the image to a base64 string
        const imageData = canvas.toDataURL('image/jpeg');

        // Send the image data to the server
        fetch('https://yourserver.com/upload', {
            method: 'POST',
            body: JSON.stringify({ image: imageData }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => alert('Picture uploaded successfully!'))
        .catch(error => console.error('Error uploading image:', error));
    });
</script>

</body>
</html>
