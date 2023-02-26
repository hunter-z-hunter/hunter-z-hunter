import io
import numpy as np
from flask import Flask, request, jsonify
import json
from PIL import Image
import torch
from torchbearer import Trial

app = Flask(__name__)

@app.route('/process_image', methods=['POST'])
def process_image():
    # Get the image from the request
    image_data = request.files['image'].read()

    # Open the image using PIL
    pil_image = Image.open(io.BytesIO(image_data))

    # Convert the image to grayscale and resize it to 28x28
    grayscale_image = pil_image.convert('L').resize((28, 28))

    # Convert the grayscale image to a NumPy array of floating point values
    grayscale_array = np.array(grayscale_image, dtype=np.float32) / 255.0

    # Reshape the array to 1x784
    grayscale_array = grayscale_array.reshape(1, 784)
    print(grayscale_array)

    # Return the grayscale array as a JSON response
    return json.dumps(grayscale_array.tolist())


def convert_image_local():
    # Get the image from the request
    # image_data = request.files['image'].read()

    # Open the image using PIL
    # pil_image = Image.open(io.BytesIO(image_data))
    pil_image = Image.open("packages/backend/image-service/hunt1.jpg")

    # Convert the image to grayscale and resize it to 28x28
    grayscale_image = pil_image.convert('L').resize((28, 28))
    grayscale_image.save('packages/backend/image-service/grayscale.png')

    # Convert the grayscale image to a NumPy array of floating point values
    grayscale_array = np.array(grayscale_image, dtype=np.float32) / 255.0

    # Reshape the array to 1x784
    grayscale_array = grayscale_array.reshape(1, 784)
    print(json.dumps(grayscale_array.tolist()))

    # Run the trial

    # Return the grayscale array as a JSON response
    return json.dumps(grayscale_array.tolist())


if __name__ == '__main__':
    # convert_image_local()
    app.run()