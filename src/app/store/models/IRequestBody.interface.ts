export interface IRequestBodyInterface {
  id: string;
  brandingSettings: {
    channel: {
      description: string;
      defaultLanguage: string;
    };
  };
}
