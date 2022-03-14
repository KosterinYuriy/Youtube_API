export interface IGetProfileInfo {
  items: [
    {
      snippet: {
        title: string;
        description: string;
        publishedAt: string;
        thumbnails: {
          default: {
            url: string;
            width: number;
            height: number;
          };
        };
      };
      statistics: {
        viewCount: string;
        subscriberCount: string;
        videoCount: string;
      };
      brandingSettings: {
        channel: {
          title: string;
          description: string;
          defaultLanguage: string;
        };
        image: {
          bannerExternalUrl: string;
        };
      };
    }
  ];
}
