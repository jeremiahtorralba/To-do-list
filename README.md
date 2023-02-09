# To-do-list
To-do-list

### To do and Note
![image](https://user-images.githubusercontent.com/28037427/217951086-1f137a2b-56ed-4ce7-8b13-c171e59773a8.png)

### Editing To do and Note
![image](https://user-images.githubusercontent.com/28037427/217951109-df875069-7aff-493a-87de-0c01fd3fd0b3.png)

### Firebase Configuration, can be found in:
	#### -> firebase project 
		#### -> settings
			#### -> general

#### index.html, lines 22-38
```
<!--Firebase to web app-->
        <script>
            // Initialize Firebase
            var config = {
                apiKey: "",
                authDomain: "",
                databaseURL: "",
                projectId: "",
                storageBucket: "",
                messagingSenderId: "",
                appId: "",
                measurementId: ""
            };
            firebase.initializeApp(config);
            const db = firebase.firestore();           
        </script>
        <!--Firebase to web app-->
```

### Dark mode

#### app.js, line 3
```
const darkBtn = document.querySelector('#lit'); // dark mode button
```
#### lines 97-117
```
// Toggle dark mode
const darkMode = () => {
    bodyEl.classList.toggle('darkMode');
}

darkBtn.addEventListener('click', () => { // get "darkMode" item value from localStorage on reload
    setDarkMode = localStorage.getItem('darkMode');
    if(setDarkMode !== "on") {
        darkMode();
        setDarkMode = localStorage.setItem('darkMode', 'on'); // set "darkMode" item value to "on" when dark mode is on
    } else {
        darkMode();
        setDarkMode = localStorage.setItem('darkMode', null); // set "darkMode" item value to "null" when dark mode is off
    }
});

let setDarkMode = localStorage.getItem('darkMode'); // get "dark" item value from localStorage

if(setDarkMode === 'on') { // check if dark mode is on or off on reload
    darkMode();
}
```

#### To use :root and .darkMode
body {
    color: var(--font-color);
    background-color: var(--background);
} 

#### :root, styles.css, lines 1-18
```
:root {
    --background: white;
    --foreg-col: white;
    --form-inp: white;
    --li: #F8F8F8;
    --todo: snow;
    --note: #FAF9F6;
    --li-even: #F0F0F0; 
    --font-color: black;
    --box-glow: 1px 3px 5px lightblue;
    --border-bot: 1px solid lightblue;
    --border-bot2: 2px solid lightskyblue;
    --border-bot-foc: 4px solid lightskyblue;
    --dark-btn: #1b31a1;
    --btns: black;
    --opacity: 70%;
    --opacity2: 75%;
}
```

#### .darkMode, styles.css, lines 27-43
```
.darkMode {
    --background: #202945;
    --foreg-col: #162780;
    --form-inp: #172a8a;
    --li: #192d94;
    --todo: #15257d;
    --note: #1b31a1;
    --li-even: #13216e;
    --font-color: white;
    --box-glow: 1px 3px 5px #99FFCC;
    --border-bot: 1px solid #99FFCC;
    --border-bot-foc: 4px solid #99FFCC;
    --dark-btn: #99FFCC;
    --btns: black;
    --opacity: 90%;
    --opacity2: 95%;
}
```
