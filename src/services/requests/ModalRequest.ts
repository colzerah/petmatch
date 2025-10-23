import api from '../../services/api';

export interface ISlide {
  title: string;
  type: string;
}
export interface IJsonResponse {
  slideshow: {
    author: string;
    date: string;
    title: string;
    slides: ISlide[];
  };
}

export const requestJson = async (): Promise<IJsonResponse | undefined> => {
  const response = await api.get(`/json`);

  return response.data;
};
