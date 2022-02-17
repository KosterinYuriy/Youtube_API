export interface IGetVideoById {

  etag: string,
  items: [{
    id: {
      videoId: string,
      kind: string
    },
    snippet: {
      channelId: string,
      channelTitle: string,
      description: string,
      liveBroadcastContent: string,
      publishTime: string,
      publishedAt: string,
      title: string,
      thumbnails: {
        medium: {
          height: number,
          url: string,
          width: number
        }
      }
    }
    "localizations": {
      "es": {
        "title": string,
        "description": string,
      },
      "en": {
        "title": string,
        "description": string,
      }
      "ru": {
        title: string,
        description: string
      }
    }
  }],
}
