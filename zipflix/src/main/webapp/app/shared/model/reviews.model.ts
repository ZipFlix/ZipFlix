import { IUser } from 'app/shared/model/user.model';
import { IVideos } from 'app/shared/model/videos.model';

export interface IReviews {
  id?: number;
  message?: string | null;
  createdBy?: IUser | null;
  videoName?: IVideos | null;
}

export const defaultValue: Readonly<IReviews> = {};
