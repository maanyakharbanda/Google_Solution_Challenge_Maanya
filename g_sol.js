//Hide mic
        document.getElementById("mic-on").style.display = "none";

        var image = document.getElementById("play-pause");

        image.addEventListener("click", function() {
        if (image.getAttribute("src") == "play.svg") {
            image.src = "pause.svg";
        } else {
            image.src = "play.svg";
        }
        });

        var volume = document.getElementById("volume-high");
        var paused = false; // flag to indicate if the audio is paused

        volume.addEventListener("click", function() {
        if (synth.speaking) { // check if the speech synthesis is active
            if (!paused) { // if not paused, pause the audio and change the image
            synth.pause();
            volume.src = "no-volume.svg";
            paused = true;
            } else { // if paused, resume the audio and change the image
            synth.resume();
            volume.src = "volume-high.svg";
            paused = false;
            }
        }
        });



        var mic = document.getElementById("mic-on");

        mic.addEventListener("click", function() {
        if (mic.getAttribute("src") == "mic-on.svg") {
            mic.src = "mic-off.svg";
        } else {
            mic.src = "mic-on.svg";
        }
        });

        var button = document.getElementById("text-audio");
        button.addEventListener("click", function() {
        if (button.textContent == "Text to Audio") 
        {
            button.textContent = "Audio to Text";
            

            // Hide the icons when the button shows audio to text
            document.getElementById("volume-high").style.display = "none";
            document.getElementById("play-pause").style.display = "none";
            document.getElementById("download").style.display = "none";
            
            
            // Set the text-align of the parent div to left
            document.getElementsByClassName("play")[0].style.textAlign = "left";

            // Change the display property of the icons from block to inline-block
            document.getElementById("mic-on").style.display = "inline-block";
            // Set the text-align of the parent div to center
            document.getElementById("mic-on").style.textAlign = "center";
        } 
        else 
        {
            button.textContent = "Text to Audio";
            // Show the icons when the button shows text to audio
            // Change the display property of the icons from block to inline-block
            document.getElementById("volume-high").style.display = "inline-block";
            document.getElementById("play-pause").style.display = "inline-block";
            document.getElementById("download").style.display = "inline-block";
            // Set the text-align of the parent div to center
            document.getElementsByClassName("play")[0].style.textAlign = "right";

            // Hide the icons when the button shows audio to text
            document.getElementById("mic-on").style.display = "none";
            // Set the text-align of the parent div to left
            document.getElementById("mic-on").style.textAlign = "left";
        }
        });

        const messageTextarea = document.getElementById("message");
        const textAudioButton = document.getElementById("play-pause");
        const audioTextButton = document.getElementById("mic-on");

        // Initialize speech synthesis
        const synth = window.speechSynthesis;

        textAudioButton.addEventListener("click", () => {
            if (image.getAttribute("src") == "pause.svg") {
            const textToSpeak = messageTextarea.value;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            // Add an event listener for the end of speech
            utterance.onend = () => {
            // Change the icon back to play
            image.src = "play.svg";
        };

            synth.speak(utterance);
        }
        });

        // Initialize speech recognition
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US"; // Set the language

        audioTextButton.addEventListener("click", () => {
            recognition.start();
        });

        recognition.onresult = (event) => {
            const result = event.results[0][0].transcript;
            messageTextarea.value = result;
        };

        // Other play-related logic here (play/pause functionality, etc.)
        
        function uploadTextFile() {
        // Get the file input element
        const fileInput = document.getElementById("file");
        // Get the selected file or files
        const files = fileInput.files;
        // Check if any file is selected
        if (files.length == 0) {
            alert("Please select a file to upload.");
            return;
        }
        // Get the first file
        const file = files[0];
        // Check if the file type is text/plain
        if (file.type != "text/plain") {
            alert("Please select a valid text file.");
            return;
        }
        // Create a FileReader object
        const reader = new FileReader();
        // Set the onload event handler
        reader.onload = function(e) {
            // Get the file content as a text string
            const text = e.target.result;
            // Assign it to the messageTextarea.value property
            messageTextarea.value = text;
        };
        // Read the file as text
        reader.readAsText(file);
        }

        const downloadButton = document.getElementById("download");
        const fileInput = document.getElementById("file");
        downloadButton.addEventListener("click", function() {
        // Trigger a click event on the file input element
        fileInput.click();
        });
        fileInput.addEventListener("change", uploadTextFile);