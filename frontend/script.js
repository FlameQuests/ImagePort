document.getElementById('uploadForm').addEventListener('submit', async function(e) {
       e.preventDefault();
       const formData = new FormData();
       formData.append('image', document.getElementById('imageInput').files[0]);

       try {
           const response = await fetch('/.netlify/functions/upload', {
               method: 'POST',
               body: formData
           });
           const data = await response.json();
           document.getElementById('shareLink').style.display = 'block';
           document.getElementById('linkInput').value = data.url;
       } catch (error) {
           console.error('Error:', error);
           alert('Upload failed. Please try again.');
       }
   });

   function copyLink() {
       var linkInput = document.getElementById('linkInput');
       linkInput.select();
       document.execCommand('copy');
       alert('Link copied to clipboard!');
   }