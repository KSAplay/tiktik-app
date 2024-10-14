const postedBySchema = {
  name: "postedBy",
  title: "Posted By",
  type: 'reference',
  to: [
    {
      type: 'user'
    }
  ]
};

export default postedBySchema;