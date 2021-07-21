const validateSpotifyUrl = (urlToParse) => {
  if (urlToParse) {
      var regExp = /^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/;
      if (urlToParse.match(regExp)) {
          return true;
      }
  }
  return false;
}

const validateYouTubeUrl = (urlToParse) => {
  if (urlToParse) {
      var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (urlToParse.match(regExp)) {
          return true;
      }
  }
  return false;
}

const isValidURL = (string) => {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};


export {
  isValidURL,
  validateSpotifyUrl,
  validateYouTubeUrl
}