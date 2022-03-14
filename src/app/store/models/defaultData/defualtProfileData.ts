import { IGetProfilePlaylists } from '../getProfilePlaylists.interface';
import { IGetProfileInfo } from '../getProfileInfo.interface';

export const defaultProfilePlaylists: IGetProfilePlaylists = {
  items: [
    {
      snippet: {
        title: 'default playlist title',
        description: 'default playlist description',
        thumbnails: {
          medium: {
            url: '#',
            width: 100,
            height: 100,
          },
        },
      },
    },
  ],
};

export const defaultProfileData: IGetProfileInfo = {
  items: [
    {
      snippet: {
        title: 'string',
        description: 'string',
        publishedAt: 'string',
        thumbnails: {
          default: {
            url: 'string',
            width: 300,
            height: 300,
          },
        },
      },
      statistics: {
        viewCount: '17',
        subscriberCount: '0',
        videoCount: '4',
      },
      brandingSettings: {
        channel: {
          title: 'Default title',
          description: ' Default Description',
          defaultLanguage: 'string',
        },
        image: {
          bannerExternalUrl: 'string',
        },
      },
    },
  ],
};
