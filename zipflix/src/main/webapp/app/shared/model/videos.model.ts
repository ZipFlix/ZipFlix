import { IReviews } from 'app/shared/model/reviews.model';
import { IUser } from 'app/shared/model/user.model';

export interface IVideos {
  id?: number;
  title?: string | null;
  description?: string | null;
  releaseDate?: string | null;
  movieArtURL?: string | null;
  videoURL?: string | null;
  genre?: string | null;
  reviews?: IReviews[] | null;
  createdBy?: IUser | null;
}

export const defaultValue: Readonly<IVideos> = {};
