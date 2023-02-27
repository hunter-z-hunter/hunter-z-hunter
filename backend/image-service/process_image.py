import io
import numpy as np
from flask import Flask, request, jsonify
import json
from PIL import Image
import torch
import onnx
from scipy.spatial.distance import cosine
from onnx2torch import convert

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
    pil_image = Image.open("testing/input_image_1.jpg")

    # Convert the image to grayscale and resize it to 28x28
    grayscale_image = pil_image.convert('L').resize((28, 28))
    grayscale_image.save("testing/output_image_1.jpg")

    # Convert the grayscale image to a NumPy array of floating point values
    grayscale_array = np.array(grayscale_image, dtype=np.float32) / 255.0

    # Reshape the array to 1x784
    grayscale_array = grayscale_array.reshape(1, 784)
    print(json.dumps(grayscale_array.tolist()))

    ### Run the test
    # # Load the ONNX model as a PyTorch model
    # model = onnx.load("model/model.onnx")

    # # Convert the ONNX model to a PyTorch model
    # model = onnx.helper.make_model(model)

    # # Create a PyTorch module from the PyTorch model
    # module = torch.nn.Sequential(
    #     torch.nn.BatchNorm2d(3),
    #     model
    # )

    model = convert("model/model.onnx")

    # Load the target image file
    target_image = Image.open("testing/output_image_1.jpg")

    # Convert the target image to a numpy array
    target_image_data = np.array(target_image)
    print("image shape: ", target_image_data.shape)
    print("model:", model)


    # Create a PyTorch tensor from the target image data
    # target_input_data = torch.from_numpy(target_image_data).float()

    # Pass the target input tensor through the model to get the output
    # target_output = model(grayscale_array)

    # Load the target image file
    target_image = Image.open("testing/input_image_1.jpg")

    # Convert the target image to a numpy array
    target_image_data = np.array(target_image)

    # Create a PyTorch tensor from the target image data
    target_input_data = torch.from_numpy(target_image_data).float()
    
    # Load the current image file
    current_image = Image.open("testing/test_image_1.jpg")

    # Convert the current image to a numpy array
    current_image_data = np.array(current_image)

    # Create a PyTorch tensor from the current image data
    current_input_data = torch.from_numpy(current_image_data).float()
    

    # Pass the current input tensor through the model to get the output
    output = model(target_input_data, current_input_data)

    print("output: ", output)

    # # Calculate the cosine similarity between the target output and current output
    # similarity = 1 - cosine(target_output, current_output)

    # # Alternatively, you can calculate the Euclidean distance between the two outputs
    # distance = np.linalg.norm(target_output - current_output)


    # # Return the grayscale array as a JSON response
    # return json.dumps(grayscale_array.tolist())


if __name__ == '__main__':
    convert_image_local()
    # app.run()