export const allPostsQuery = () => {
  const query = `*[_type == "post" && !(_id in path("drafts.**"))] | order(_createdAt desc) {
    _id,
    caption,
    hashtags,
    video{
      asset->{
        _id,
        url
      }
    },
    userId,
    postedBy->{
      _id,
      userName,
      image
    },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;

  return query;
};

export const postDetailQuery = (postId: string | string[]) => {
  const query = `*[_type == "post" && _id == '${postId}' && !(_id in path("drafts.**"))]{
    _id,
    caption,
    hashtags,
    video{
      asset->{
        _id,
        url
      }
    },
    userId,
    postedBy->{
      _id,
      userName,
      image
    },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
  const query = `*[_type == "post" && !(_id in path("drafts.**")) && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
    _id,
    caption,
    hashtags,
    video{
      asset->{
        _id,
        url
      }
    },
    userId,
    postedBy->{
      _id,
      userName,
      image
    },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const allUsersQuery = () => {
  const query = `*[_type == "user"]`;

  return query;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
  const query = `*[ _type == "post" && userId == '${userId}' && !(_id in path("drafts.**"))] | order(_createdAt desc) {
    _id,
    caption,
    hashtags,
    video{
      asset->{
        _id,
        url
      }
    },
    userId,
    postedBy->{
      _id,
      userName,
      image
    },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;

  return query;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == "post" && '${userId}' in likes[]._ref && !(_id in path("drafts.**"))] | order(_createdAt desc) {
    _id,
    caption,
    hashtags,
    video{
      asset->{
        _id,
        url
      }
    },
    userId,
    postedBy->{
      _id,
      userName,
      image
    },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;

  return query;
};

export const topicPostsQuery = (topic: string | string[]) => {
  const query = `*[_type == "post" && topic match '${topic}*' && !(_id in path("drafts.**"))] {
    _id,
    caption,
    hashtags,
    video{
      asset->{
        _id,
        url
      }
    },
    userId,
    postedBy->{
      _id,
      userName,
      image
    },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;

  return query;
};