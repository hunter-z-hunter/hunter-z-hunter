import io
import numpy as np
from flask import Flask, request, jsonify
import json
from PIL import Image
import torch
import onnx
from scipy.spatial.distance import cosine
from onnx2torch import convert
import onnxruntime

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


def convert_image_local_v1():

    # Open the image using PIL
    pil_image = Image.open("testing/input_image_1.jpg")

    # Convert the image to grayscale and resize it to 28x28
    grayscale_image = pil_image.convert('L').resize((28, 28))
    grayscale_image.save("testing/output_image_1.jpg")

    # Convert the grayscale image to a NumPy array of floating point values
    grayscale_array = np.array(grayscale_image, dtype=np.float32) / 255.0

    # Reshape the array to 1x784
    grayscale_array = grayscale_array.reshape(1, 784)
    # print(json.dumps(grayscale_array.tolist()))

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

    model = convert("model/4l_relu_conv_fc.onnx")

    # Load the target image file
    target_image = Image.open("testing/output_image_1.jpg")

    # Convert the target image to a numpy array
    target_image_data = np.array(target_image)
    print("image shape: ", target_image_data.shape)
    # print("model:", model)


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

def convert_image_local():   

    model = convert("model/4l_relu_conv_fc.onnx")    

    # Load the target image file
    target_image = Image.open("testing/target_image_1.jpg")

    # Convert the target image to a numpy array
    target_image_data = np.array(target_image)

    # Create a PyTorch tensor from the target image data
    target_input_data = torch.from_numpy(target_image_data).float()
    
    # Load the current image file
    current_image = Image.open("testing/current_image_1.jpg")

    # Convert the current image to a numpy array
    current_image_data = np.array(current_image)

    # Create a PyTorch tensor from the current image data
    current_input_data = torch.from_numpy(current_image_data).float()    

    # Pass the current input tensor through the model to get the output
    target_output = model(target_input_data)
    current_output = model(current_input_data)

    print("output: ", target_output.shape, current_output.shape)

    # # Calculate the cosine similarity between the target output and current output
    # similarity = 1 - cosine(target_output, current_output)

    # # Alternatively, you can calculate the Euclidean distance between the two outputs
    distance = np.linalg.norm(target_output - current_output)
    print("distance: ", distance)

    # # Return the grayscale array as a JSON response
    # return json.dumps(grayscale_array.tolist())

def run_model():

#    # Load the input data from file
#     with open("testing/input.json", "r") as f:
#         input_data = json.load(f)

    # Convert the input data to a PyTorch tensor and reshape it
    # input_data = torch.tensor(input_data["input_data"])
    # print("input_data: ", input_data.shape)
    # input_data = input_data.reshape(1, 1, 28, 28)
    
    # Load the ONNX model
    session = onnxruntime.InferenceSession("model/4l_relu_conv_fc.onnx")

    # Open the original target image
    pil_image = Image.open("testing/original_target_image_1.jpg")
    # Convert the image to grayscale and resize it to 28x28
    modified_image = pil_image.convert('L').resize((28, 28))
    # Save the modified image
    modified_image.save("testing/target_image_1.jpg")
    # Load the target image file
    target_image = Image.open("testing/target_image_1.jpg")
    # Convert the target image to a numpy array
    target_image_data =  np.array(target_image, dtype=np.float32) / 255.0 # np.array(current_image)
    # Create a PyTorch tensor from the target image data
    target_input_data = torch.from_numpy(target_image_data).float()
    # Output the target input data
    # print("target_input_data: ", target_input_data)
    # Reshape
    target_input_data = target_input_data.reshape(1, 1, 28, 28)   
    # Load the input data as a PyTorch tensor
    target_input_data = torch.tensor(target_input_data)
    # Run the model and get the output
    target_output_data = session.run([], {"input": target_input_data.numpy()})[0]
    # Print the output
    # print("target_output_data: ", target_output_data)

    successes = 0
    for i in range (1, 11):     

        # Open the original current image
        pil_image = Image.open(f"testing/original_current_image_{i}.jpg")
        # Convert the image to grayscale and resize it to 28x28
        modified_image = pil_image.convert('L').resize((28, 28))
        # Save the modified image
        modified_image.save(f"testing/current_image_{i}.jpg")
        # Load the current image file
        current_image = Image.open(f"testing/current_image_{i}.jpg")
        # Convert the current image to a numpy array
        current_image_data = np.array(current_image, dtype=np.float32) / 255.0 # np.array(current_image)
        # Create a PyTorch tensor from the current image data
        current_input_data = torch.from_numpy(current_image_data).float()
        # Output the current input data
        # print("current_input_data: ", current_input_data)
        # Reshape
        current_input_data = current_input_data.reshape(1, 1, 28, 28)   
        # Load the input data as a PyTorch tensor
        current_input_data = torch.tensor(current_input_data)
        # Run the model and get the output
        current_output_data = session.run([], {"input": current_input_data.numpy()})[0]
        # Print the output
        # print("current_output_data: ", current_output_data)
        
        # Print the output
        # print(output_data)

        threshold = 0.0044
        distance = np.linalg.norm(target_output_data - current_output_data)
        print("=========================")
        print("Image: ", i)
        print("Distance: ", distance)
        print(f"MATCH? (should be {i < 6})", distance < threshold)
        if distance < threshold and i < 6 or distance > threshold and i > 5:
            successes += 1

    print("=========================")
    print("=========================")
    print("Accuracy: ", successes / 10)


if __name__ == '__main__':
    # convert_image_local()
    # app.run()
    run_model()