# Ground Vibration Calculator

This project provides a web-based calculator for predicting ground vibration resulting from blasting operations, based on a neural network model trained on extensive data.  The calculator aims to help minimize the negative impacts of blasting, such as damage to nearby structures and disruption to communities.

## Introduction

Blasting is a crucial but potentially disruptive process in mining and construction.  While essential for excavation, blasting generates ground vibrations that can have detrimental effects on surrounding areas.  These vibrations, if not properly managed, can lead to:

* **Damage to structures:**  Homes, buildings, and other infrastructure can suffer damage from excessive ground vibrations.
* **Community disruption:**  High vibration levels can be disturbing and distressing for nearby residents.
* **Environmental damage:**  Ground vibrations can affect groundwater systems and local ecology.
* **Mining inefficiencies:**  Back breaks and oversized boulders caused by uncontrolled vibrations can complicate subsequent drilling and blasting operations.

This calculator utilizes a sophisticated neural network model to predict ground vibration levels, empowering users to optimize blast designs and mitigate potential risks.

## Neural Network Model

The core of this calculator is an Artificial Neural Network (ANN) built using TensorFlow and Keras. This model was trained on a comprehensive dataset incorporating various factors that influence ground vibration, including:

* **Spacing:** Distance between blast holes.
* **Burden:** Distance between the blast hole and the free face.
* **Powder Factor:**  The amount of explosive used per unit volume of rock.
* **MCPD (Maximum Charge per Delay):**  A critical parameter for controlling vibration levels.
* **Distance:**  Distance between the blast site and the point of interest (e.g., a structure).
* **Physico-mechanical properties of rock mass:** Although not directly inputted by the user, these properties were considered during model training and are implicitly captured by the model.
* **Explosive characteristics:** Similar to rock properties, these are also incorporated into the model's training data.

The ANN architecture consists of fully connected (dense) layers with a carefully chosen configuration (15-20-10-10-5-1) to capture the complex relationships within the data. The model was trained using the Adam optimizer and Mean Squared Error loss function, achieving a high R<sup>2</sup> score of 0.9777, indicating excellent predictive accuracy.

## Website Development

The web-based calculator was developed using:

* **HTML:**  Provides the structure and layout of the interface.
* **CSS:** Styles the interface for a clean and professional look.
* **JavaScript:** Implements the dynamic functionality, including input validation, calculation execution, history management, and chart rendering.
* **Chart.js:** Used for visualizing historical data in an interactive chart.
* **Papa Parse:**  Used for CSV download functionality.


## Website Features

* **Input Fields:**  User-friendly input fields for entering blast design parameters.
* **Unit Conversion:**  Supports both metric and imperial units (meters/feet, kg/lbs, kg/m³/lb/ft³).
* **Real-time Calculation:** Provides instant ground vibration predictions.
* **History Section:** Stores previous calculations for easy review.
* **CSV Download:** Allows users to download their history as a CSV file.
* **Clear History:**  Option to clear the saved history.
* **Interactive Chart:** Displays historical data trends using Chart.js.
* **Responsive Design:** Adapts to different screen sizes for optimal viewing.
* **Dark/Light Mode Toggle:** Offers user preference for visual comfort.
* **Drag and Drop:** Provides drag and drop functionality in the input area and the history section.
* **Error Handling:**  Handles invalid inputs gracefully and provides informative error messages.



## Accessing the Website
[https://sandeepjanapati.github.io/Ground-Vibration-Calculator/](https://sandeepjanapati.github.io/Ground-Vibration-Calculator/)



## Contributing

Contributions to this project are welcome! If you find any bugs, have suggestions for improvements, or want to add new features, please open an issue or submit a pull request.
