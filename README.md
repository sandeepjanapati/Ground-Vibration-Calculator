**INTRODUCTION**

There is an increasing trend towards surface excavation for exploitation of minerals and for infra-structural developmental projects in India. Drilling and blasting is one of the major economical operations to excavate a rock mass. Until now, explosives are a valuable source of energy required for breakage, excavation and displacement of rock mass. When an explosive detonates in a blast hole, a tremendous amount of energy, in terms of pressure (up to 50 GPa) and temperature (up to 5000 K) is released. Although, significant developments have taken place in explosive technology, the explosive energy utilization has not made much progress due to the complexity of the various rock parameters. Only a fraction of explosive energy (20–30%) is used in the actual breakage and displacement of the rock mass, and the rest of the energy is spent in undesirable effects like ground vibrations, fly rocks, noises, back breaks, over breaks, etc.

To meet the present day demand for coal and other economic minerals, large scale mechanized surface mines are being planned. In these mines, a huge quantity of explosive is consumed to break and displace the overburden of rock mass. These explosives used in a blasting round, create nuisances to the people residing in the close vicinity of the mining area. Sometimes, due to high ground vibration level, their dwellings may get damaged and there is always confrontation between mine management and the people residing in the surroundings of the mine area.

High ground vibrations, not only do they create problems to the nearby population, but also adversely affects the integrity of the surrounding structures in the mine area. Sometimes, it provokes the population and can put mines into closure. High intensity vibration also damages and chocks the existing ground water conduits and harms the ecology of the nearby area. It may be sometimes responsible for water logging and up-rooting of the plants/trees nearby the mining area. If ground vibration is not controlled or minimized, it may be one of the main causes for the deforestation in future. Ground vibration may damage the free face and generate a number of back breaks. These back breaks create problems while drilling the next round of blast and generate over-size boulders. This adversely affects the mine economics, hamper production and endanger the socio-economic development of the surrounding area.

The ground vibration is a wave motion, spreading outward from the blast like ripples spreading outwards due to impact of a stone dropped into a pond of water. As the vibration passes through the surface structures, it induces vibrations in those structures also. These vibrations induce a resonance in the structures if the frequency of ground vibration matches the natural frequency of the structure and due to this, amplitude of the vibration may further exceed the amplitude of the initial ground vibrations. Peak Particle Velocity is the most commonly used parameter for assessment of ground vibration and associated damage. Ground vibration is influenced by a number of parameters such as physico-mechanical properties of rock mass, explosive characteristics and blast design. It is essential to know the effect of these parameters on blasting for efficient utilization of explosive energy in a given rock mass vis-a-vis minimization of undesired blast-induced effects. The design parameters like maximum charge per delay, distance between blast face and monitoring point, burden, spacing, powder factor considerably alter dispersion of the seismic energy. Rock characteristics also often vary widely from place to place in a mine or even from one end to another of a single face.


**NEURAL NETWORK MODEL**

In this implementation, TensorFlow is utilized to implement an Artificial Neural Network, a versatile and powerful model capable of learning complex patterns in data. First, the necessary modules from TensorFlow are imported, including tensorflow.keras for building and training neural networks, and train_test_split from scikit-learn for splitting the dataset into training and testing sets. T hen, an instance of a Sequential model is created using tf.keras.Sequential(). This model serves as a container for the neural network layers. Subsequently, layers are added to the model. These layers are the type of dense (fully connected). The number of neurons and activation functions for each layer are specified (15-20-10-10-5-1) based on the dataset. After defining the architecture of the neural network, the model is compiled using the compile() method. During compilation, the optimizer, loss function, and evaluation metrics are specified. Common choices for optimizer is Adam optimizer. The loss function used is Mean Square Error Loss Function. Once the model is compiled, it is trained on the training data using the fit() method. Training involves feeding the input data through the network, computing the loss, and updating the network parameters (weights) using backpropagation. The number of epochs used is 35 and batch size is 110 and are typically specified during training. After training, the model's performance is evaluated on the testing data using the predict() method. After training and evaluating the Artificial Neural Network, the results are analyzed to understand its performance and the final R2 Score is obtained to be 0.9776852750791505

**WEBSITE DEVELOPMENT**

I made a website from the results of neural networks model by using Python, html, java script, pandas , numpy and replit. Users can easily access my website and can calculate ground vibration by entering the input values Spacing, Burden, Powder Factor, MCPD, Distance accordingly in the spaces provided for them. Users can also view their previously calculated values in the history section provided in the website.


![Website Image]([Website%20Image.png](https://github.com/sandeepjanapati/Ground-Vibration-Calculator/blob/main/Website%20Image))


