export interface IUpdateVideoDescription {
  "kind": string,
  "etag": string,
  "id": string,
  "snippet": {
    "publishedAt": string,
    "channelId": string,
    "title": string,
    "description": string,
    "thumbnails": {
      "default": {
        "url": string,
        "width": number,
        "height": number,
      },
      "medium": {
        "url":string,
        "width": 320,
        "height": 180
      },
      "high": {
        "url": string,
        "width": 480,
        "height": 360
      },
      "standard": {
        "url": string,
        "width": 640,
        "height": 480
      },
      "maxres": {
        "url": string,
        "width": 1280,
        "height": 720
      }
    },
    "channelTitle": string,
    "tags": [
      string,
    ],
    "categoryId": string,
    "liveBroadcastContent": string,
    "defaultLanguage": string,
    "localized": {
      "title": string,
      "description": string,
    },
    "defaultAudioLanguage":string,
  },
  "localizations": {
    "es": {
      "title": string,
      "description": string,
    },
    "en": {
      "title": string,
      "description": string,
    }
  }
}
