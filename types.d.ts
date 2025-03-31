export interface IVideo {
  _id: string;
  userId: string;
  caption: string;
  hashtags: string[];
  topic: string;
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
  postedBy: {
    _id: string;
    _ref: string;
    userName: string;
    image: string;
  };
  likes: {
    postedBy: {
      _id: string;
      _ref: string;
    };
  }[];
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _ref: string;
      _id: string;
    };
  }[];
}

export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}