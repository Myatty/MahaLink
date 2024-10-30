
<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/One-Bit-Myanmar/mahar-link.git">
    <img src="mahar-link-logo.png" alt="Logo">
  </a>

<p align="center">
   A centralized platform for efficient flood relief coordination in Myanmar.

<a href="https://github.com/One-Bit-Myanmar/mahar-link/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/One-Bit-Myanmar/mahar-link/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
</p>


</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#main-features">Main Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Mahar Link improves communication and coordination among organizations, volunteers, and non-profits in Myanmar flood relief efforts. It prevents redundant supply deliveries to the same location and ensures underserved areas receive necessary resources, providing efficient and effective support.

## Mission

To enhance coordination among organizations, volunteers, and non-profits, preventing redundant supply deliveries and ensuring all affected areas receive the necessary support.

## Vision

To create a centralized communication platform that ensures efficient and equitable distribution of resources during Myanmar flood relief efforts.

### Documentation

For detailed documentation, please visit [Documentation](/doc/Maha-Link-Documentation.pdf).


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES -->
## Main Features

- **Real-time Communication**: Enables real-time communication among organizations, volunteers, and non-profits.
- **Centralized Database**: Maintains a centralized database of organizations, volunteers, and resources.
- **Location-based Services**: Provides location-based services to identify underserved areas.
- **User Authentication**: Secure user authentication and authorization.
- **Push Notifications**: Sends push notifications for important updates and alerts.
- **Mobile Accessibility**: Accessible via mobile devices for on-the-go coordination.
- **Resource Tracking**: Tracks the distribution of resources to prevent redundant deliveries.
- **Data Analytics**: Analyzes data to improve resource distribution efficiency.



<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* [![React][React.js]][React-url]
* [![Expo][Expo.dev]](https://expo.dev/)
* [![Firebase][Firebase.dev]](https://firebase.google.com/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14 or later)
- npm (v6 or later)
- Expo CLI (for React Native projects)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/One-Bit-Myanmar/mahar-link.git
    cd mahar-link
    ```

2. Install Dependencies

    ```sh
    npm install
    ```

3. Set up Firebase

    - Create a Firebase project at `Firebase Console`
    - Add a web app to your Firebase project.
    - Copy the Firebase configuration and create a `firebaseConfig.js` file in the `src` directory;

    ```javascript
    // src/firebaseConfig.js
    const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    };

    export default firebaseConfig;
    ```

4. Start the development server

    ```sh
    npm start
    # or
    npm run android
    # or
    npm run ios
    ```

- Additional Configuration

    - **Environment Variables**
    Create a `.env` file in the root directory and add any necessary environment variables.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

**Access the app**

 - Open the Expo Go app on your mobile device and scan the QR code displayed in the terminal.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

- [Hein Htet San](https://github.com/Hein-HtetSan)
- [Myint Myat Pyae Sone](https://github.com/Myatty)
- [Thin Han Soe](https://github.com/Yoinami)
- [Phyo Zaw Linn](https://github.com/farout101)
- [Lynn Myat Bhone](https://github.com/@Lynn-Myat-Bhone)

<br>

<p align="left">
<!-- contributor  -->
<a href="https://github.com/One-Bit-Myanmar/mahar-link/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=One-Bit-Myanmar/mahar-link" />
</a>

</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the Apache License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@onebitmyanmar](https://twitter.com/your_username) - onebitmyanmar@gmail.com

Project Link: [https://github.com/One-Bit-Myanmar/mahar-link](https://github.com/One-Bit-Myanmar/mahar-link)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/)
- [Best-ReadMe-Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Expo.dev]: https://img.shields.io/badge/expo-000000?style=for-the-badge&logo=expo&logoColor=white
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Firebase.dev]: https://img.shields.io/badge/Firebase-4A4A55?style=for-the-badge&logo=firebase&logoColor=FF3E00 
