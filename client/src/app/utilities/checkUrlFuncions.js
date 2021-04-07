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

export {
  validateSpotifyUrl,
  validateYouTubeUrl
}