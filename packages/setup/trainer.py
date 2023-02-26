import torch
import torchbearer
import torch.nn.functional as F
import torchvision.transforms as transforms
import ezkl
from ezkl import export
from torch import nn
from torch import optim
from torch.utils.data import DataLoader
from torchvision.datasets import MNIST


# fix random seed for reproducibility
seed = 7
torch.manual_seed(seed)
torch.backends.cudnn.deterministic = True
torch.backends.cudnn.benchmark = False
import numpy as np
np.random.seed(seed)

# flatten 28*28 images to a 784 vector for each image
transform = transforms.Compose([
    transforms.ToTensor(),  # convert to tensor
    transforms.Lambda(lambda x: x.view(-1))  # flatten into vector
])

# load data
trainset = MNIST(".", train=True, download=True, transform=transform)
testset = MNIST(".", train=False, download=True, transform=transform)

# create data loaders
trainloader = DataLoader(trainset, batch_size=128, shuffle=True)
testloader = DataLoader(testset, batch_size=128, shuffle=True)

# define baseline model
class BaselineModel(nn.Module):
    def __init__(self, num_classes):
        super(BaselineModel, self).__init__()
        self.conv1 = nn.Conv2d(1, 4, kernel_size=5, stride=2)
        self.conv2 = nn.Conv2d(4, 4, kernel_size=5, stride=2)
        self.fc = nn.Linear(4 * 4 * 4, num_classes)

    def forward(self, x):
        x = x.view(-1, 1, 28, 28)
        print("x.shape: ", x.shape)
        x = F.relu(self.conv1(x))
        print("x.shape: ", x.shape)
        x = F.relu(self.conv2(x))
        print("x.shape: ", x.shape)
        x = x.view(-1, 4 * 4 * 4)
        print("x.shape: ", x.shape)
        x = self.fc(x)
        print("x.shape: ", x.shape)
        return x

# build the model
model = BaselineModel(num_classes=10)

# define the loss function and the optimiser
loss_function = nn.CrossEntropyLoss()
optimiser = optim.Adam(model.parameters())

# Construct a trial object with the model, optimiser and loss.
# Also specify metrics we wish to compute.
trial = torchbearer.Trial(model, optimiser, loss_function, metrics=['loss', 'accuracy'])

# Provide the data to the trial
trial.with_generators(trainloader, test_generator=testloader)

# Run 10 epochs of training
trial.run(epochs=10)

# code for testing the model
# test the performance
results = trial.evaluate(data_key=torchbearer.TEST_DATA)
print(results)

model = BaselineModel(784, 784, 10)

export(model, input_size = (1, 28, 28))

# code for testing the model