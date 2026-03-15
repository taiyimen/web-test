const API_URL = "http://8.136.205.235:8000"; 


function addMessage(text, sender){

    const chatBox = document.getElementById("chat-box");

    const msg = document.createElement("div");
    msg.className = "message " + sender;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerText = text;

    msg.appendChild(bubble);
    chatBox.appendChild(msg);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKey(event){
    if(event.key === "Enter"){
        sendMessage();
    }
}

async function sendMessage(){

    const input = document.getElementById("user-input");
    const text = input.value.trim();

    if(text === "") return;

    addMessage(text, "user");

    input.value = "";

    const loading = addLoading();

    try{

        const response = await fetch(API_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message:text
            })
        });

        const data = await response.json();

        removeLoading(loading);

        if(data.type === "image"){

            addImage(data.response);

        }else{

            addMessage(data.response,"bot");

        }

    }catch(err){

        removeLoading(loading);

        addMessage("服务器连接失败","bot");

    }

}

function addLoading(){

    const chatBox = document.getElementById("chat-box");

    const msg = document.createElement("div");
    msg.className = "message bot";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerText = "思考中...";

    msg.appendChild(bubble);
    chatBox.appendChild(msg);

    return msg;
}

function removeLoading(element){
    element.remove();
}

function addImage(src){

    const chatBox = document.getElementById("chat-box");

    const msg = document.createElement("div");
    msg.className = "message bot";

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const img = document.createElement("img");
    img.src = src;
    img.style.maxWidth = "400px";

    bubble.appendChild(img);

    msg.appendChild(bubble);
    chatBox.appendChild(msg);

    chatBox.scrollTop = chatBox.scrollHeight;
}
