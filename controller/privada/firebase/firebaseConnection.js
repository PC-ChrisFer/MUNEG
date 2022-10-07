//@ts-check
// Import the functions you need from the SDKs you need

export async function sendImageToFirebase(inputID) {
  const firebaseConfig = {
    apiKey: "AIzaSyAS79XnYzQCfUxdoAMWINSAECZdtJvX290",
    authDomain: "muneg-f0e26.firebaseapp.com",
    projectId: "muneg-f0e26",
    storageBucket: "muneg-f0e26.appspot.com",
    messagingSenderId: "650769497596",
    appId: "1:650769497596:web:caa143a1498c21a8c60679",
    measurementId: "G-0V9ZLX6MLF",
  };

  try {
    // Initialize Firebase
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    var file = document.getElementById(inputID).files[0];

    // SAVING FILE IN STORAGE
    let storageRef = await firebase
      .storage()
      .ref("munegImages/" + file.name)
      .put(file);

    // GETTING URL
    let url = await firebase
      .storage()
      .ref("munegImages/" + file.name)
      .getDownloadURL();

    console.log(url);

    return url;
  } catch (e) {
    return null;
  }
}
