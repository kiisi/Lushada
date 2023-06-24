export function blobToJson(blob, callback) {
    var reader = new FileReader();
  
    reader.onload = function(event) {
      var jsonData = JSON.parse(event.target.result);
      callback(null, jsonData);
    };
  
    reader.onerror = function(event) {
      callback(event.target.error);
    };
  
    reader.readAsText(blob);
  }
  