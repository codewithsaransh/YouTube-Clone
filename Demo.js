
let SearchBar = document.getElementById("SearchBar");
function setupSpeechToText() {

  
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
  
      recognition.continuous = true;
      recognition.lang = 'en-US';
  
      recognition.onstart = () => {
        console.log("Listning....")
      };
  
      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
       console.log(transcript)
       SearchBar.value = transcript;
      };
  
      recognition.onend = () => {
        console.log("byee")
      };
  
      recognition.onerror = (event) => {
        output.textContent = 'Error occurred: ' + event.error;
      };
      recognition.start();
    
        
    
    } else {
      output.textContent = 'Speech recognition not supported in this browser.';
    }
    
  }
  



  
  function Video(id,thumbnailUrl, title, channelName, publishDate) 
  {
  
    let videoContainer = document.getElementById('Videos');
   
    
    let videoElement = document.createElement('div');
    videoElement.className = 'Video';

    videoElement.addEventListener("click",()=>{window.open(`https://www.youtube.com/watch?v=${id}`)})


    let thumbnailElement = document.createElement('div');
    thumbnailElement.className = 'Thumbnail';
    thumbnailElement.innerHTML = `<img src="${thumbnailUrl}" alt="Thumbnail">`;
    videoElement.appendChild(thumbnailElement);

    let contentElement = document.createElement('div');
    contentElement.className = 'Content';
    contentElement.innerHTML = `
    <img src="https://via.placeholder.com/40" alt="Channel Logo">
    <div>
            <p>${title}</p>
            <p>${channelName}</p>
            <p>${publishDate}</p>
        </div>`;
    videoElement.appendChild(contentElement);

    videoContainer.appendChild(videoElement);
}


async function  Get(SearchData)
{
 
  let Response =  await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${SearchData}&key=AIzaSyAX59rvuQqyOkPoRnLi_9vj1N6t4tHvqUE`)
  let Data = await Response.json();
  Data.items.map((item) =>
  {
    Video(item.id.videoId,item.snippet.thumbnails.high.url, item.snippet.title, item.snippet.channelTitle, item.snippet.publishTime);
  })

}

Get("India")

function GetDataFromSearch()
{
  
  let Search = document.getElementById("SearchBar");
  let SearchData= Search.value;
  let videoContainer = document.getElementById('Videos');
  videoContainer.innerHTML = '';
  Get(SearchData);
  
}
