export interface IGetProfilePlaylists {
  items: [
    {
      snippet: {
        title: string;
        description: string;

        thumbnails: {
          medium: {
            url: string;
            width: number;
            height: number;
          };
        };
      };
    }
  ];
}
